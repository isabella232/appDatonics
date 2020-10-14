import getIdDatonics from "../../utils/getIdDatonics";


export default async (req,res) => {
    
    if(req.method === 'POST') {
      const { name, domian } = req.body;
      await getIdDatonics({ name, domian });
      return res.status(200).end();
    }
    return res.status(404).json({
        error: {
            code: 'not_found',
            messgae: "The requested endpoint was not found or doesn't support this method."
        }
    });
}
