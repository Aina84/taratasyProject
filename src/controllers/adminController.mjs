import ModelAdmin from "../models/admin.model.mjs";

export async function logging(err,req,res) {
    if(err){
        res.send({
            error : {
                status : err.status,
                message : err.message
            }
        })
    }
    
    const { mail , mdp } = req.body;
    const data = await ModelAdmin.log(mail,mdp);
    const {centre} = data[0][0] ;

    if(data.length>0) {
        res.send({success: true, Email: mail , Centre : centre});
    }else {
        res.send({success:false});
    }

}
