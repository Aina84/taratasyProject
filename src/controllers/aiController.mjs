import ask from "../services/askAi.mjs";

const aiController =async (req,res)=>{
    const message = req.params.message;
    const Airesponse = await ask(message);
    if(Airesponse.state){
        res.send({error : Airesponse.err})
        return
    }
    res.send({ ai : Airesponse.text});
}
export default aiController