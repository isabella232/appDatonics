import Cors from 'cors'
import { insertDataShop } from '../../../utils/pgDatabase'

const cors = Cors({
  methods: ['GET', 'HEAD'],
})

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '5mb',
      },
    },
  }

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Rest of the API logic
  switch (req.method) {
      case 'POST':
        if (req.body.length != undefined) {
          res.statusCode = 400;
          res.json({status:'error'});
          return;
        }
        res.statusCode = 200;
        res.json(await insertDataShop(req.body.data));
        break;
  
    default:
      res.json([]);
      break;
  }
}

export default handler