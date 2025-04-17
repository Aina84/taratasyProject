import ModelAdmin from "../models/admin.model.mjs";


async function logging(req,res) {

    const { mail , mdp } = req.body;
    const data = await ModelAdmin.log(mail,mdp);
    const {centre} = data[0][0] ;

    if(data.length>0) {
        res.send({success: true, Email: mail , Centre : centre});
    }else {
        res.send({success:false});
    }

}

async function register(req,res) {

    const { centre, mail, mdp } = req.body;
    const dbresponse = await ModelAdmin.register(centre,mail,mdp);
    if(dbresponse.length==0){
        res.send({
        success : false ,
        message : 'request failed'
    })
    }else {
        res.send({
            success : true , 
            message : 'user registered'
        })
    }

}

export default { logging, register }