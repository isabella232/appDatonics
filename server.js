require('isomorphic-fetch');
const Koa = require('koa');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const dotenv = require('dotenv');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

dotenv.config();
const Router = require('koa-router');
const {receiveWebhook, registerWebhook} = require('@shopify/koa-shopify-webhooks');
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { HOST, SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  server.use(session({ sameSite: 'none', secure: true }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];
  const router = new Router();

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_script_tags', 'write_script_tags'],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
        const registration = await registerWebhook({
          address: `${HOST}/webhooks/app/uninstalled`,
          topic: 'APP_UNINSTALLED',
          accessToken,
          shop,
          apiVersion: ApiVersion.July20
        },
        {
          address: `${HOST}/webhooks/shop/redact`,
          topic: 'SHOP_REDACT',
          accessToken,
          shop,
          apiVersion: ApiVersion.July20
        },
        {
          address: `${HOST}/webhooks/customers/redact`,
          topic: 'COSTUMERS_REDACT',
          accessToken,
          shop,
          apiVersion: ApiVersion.July20
        },{
          address: `${HOST}/webhooks/customers/data_request`,
          topic: 'COSTUMERS_DATA_REQUEST',
          accessToken,
          shop,
          apiVersion: ApiVersion.July20
        });
     
        if (registration.success) {
          console.log('Successfully registered webhook!');
        } else {
          console.log('Failed to register webhook', registration.result.data.webhookSubscriptionCreate.userErrors);
        }
        ctx.redirect('/');
      },
    }),
  );
  const webhook = receiveWebhook({secret: SHOPIFY_API_SECRET_KEY});

  router.post('/webhooks/app/uninstalled', webhook, (ctx) => {
    session = null;
  })

  server.use(graphQLProxy({version: ApiVersion.July20}))

  router.all('/(.*)', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
   });
   server.use(router.allowedMethods());
   server.use(router.routes());
  /*server.use(verifyRequest());
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;

  });*/
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});