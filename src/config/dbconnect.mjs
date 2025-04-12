import db from "./dbconfig.mjs";
export default function dbconnect(){
    db.connect((err)=>{
        if(err) console.log('error lors de la connexion au db')}
      )
}