import db from "../config/dbconfig.mjs";

const ModelAdmin = {

    log : (mail,mdp) => db.query("SELECT * FROM admin WHERE mail=? && mdp=?",[mail,mdp]),
    register : (centre,mail,mdp) => db.query("INSERT INTO admin (centre,mail,mdp) VALUES (?,?,?)",[centre,mail,mdp])

}
export default ModelAdmin;
