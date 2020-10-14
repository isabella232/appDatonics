import getAnswerTypeForm from "../../utils/typeformData";

export default async (req,res) => {
     let data;   
    if(req.method === 'GET') {
      data = await getAnswerTypeForm();
      return res.status(200).send();
    }
    return res.status(404).json({
        error: {
            code: 'not_found',
            messgae: "The requested endpoint was not found or doesn't support this method."
        }
    });
}
