import db from "../config/dbconfig.mjs";

export default function userLogin(req,res,err){
    const { mail , mdp } = req.body;
    db.query('SELECT * FROM admin WHERE mail=? && mdp=?',[mail,mdp],(err,reponse)=>{
        if(err){
            res.send({error :err})
        }
        else if(reponse.length>0){
            const {centre} = reponse[0]
            res.send({success: true, Email: mail , centre});
        }
        else{
            res.send({success:false});
        }
    })
}