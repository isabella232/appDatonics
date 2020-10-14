import fetch from 'node-fetch';

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';
const SENDGRID_API_KEY = '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';

const sendEmail = async ({ name, phoneNumber, email, message, toemail }) => {
    await fetch(SENDGRID_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SENDGRID_API_KEY}`
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [
                {
                  email
                }
              ],
              subject: 'Shopify Audience Insights Support Request'
            }
          ],
          from: {
            email: 'wli@datonics.com',
            name: 'Datonics'
          },
          content: [
            {
              type: 'text/html',
              value: `
              Shop: <b>${name}</b><br/>
              Email: ${toemail} <br/>
              Message: <p>${message}</p>`
            }
          ]
        })
    });
}

export default sendEmail;
