
import Cors from 'cors';
import { findShop } from '../../../utils/pgDatabase';

const cors = Cors({
    methods: ['GET', 'HEAD','POST'],
  })

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

export default async (req, res) => {
    await runMiddleware(req, res, cors);
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const shop = await findShop(id);

                if (!shop) {
                    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");  
                    res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS");
                    return res.status(400).json({ success: false });
                }
                res.status(200).json(shop);
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}