import sendEmail from "../../utils/sendMail";


export default async (req,res) => {
    console.log(req);
    
    if(req.method === 'POST') {
      const { name, phoneNumber, email, message, toemail} = req.body;
      await sendEmail({ name, phoneNumber, email, message, toemail });
      return res.status(200).end();
    }
    return res.status(404).json({
        error: {
            code: 'not_found',
            messgae: "The requested endpoint was not found or doesn't support this method."
        }
    });
}
