import ModelAdmin from "../models/admin.model.mjs";
import jwt from "../middlewares/jwt.mjs";
import SaveJWT from "../services/savenjwToken.mjs";

async function logging(req, res) {
  try {
    const { mail, mdp } = req.body;
    if (!mail || !mdp) throw Error("please, enter valid data");
    const data = await ModelAdmin.log(mail, mdp);
    if (!data[0][0]) throw Error("user not found");
    const { centre } = data[0][0];

    if (data.length > 0) {
      const { accesstoken, accesstokenkey } = await jwt.signaccesstoken(mail);
      const { refreshtoken, refreshtokenkey } = await jwt.signrefreshtoken(mail);
      await SaveJWT(mail, accesstokenkey, refreshtokenkey);
      res.send({
        success: true,
        Email: mail,
        Centre: centre,
        accesstoken,
        refreshtoken,
      });
    } else {
      res.send({ success: false });
    }
  } catch (error) {
    res.send({
      error: {
        status: error.status,
        message: error.message,
      },
    });
  }
}

async function register(req, res) {
  try {
    const { centre, mail, mdp } = req.body;
    const dbresponse = await ModelAdmin.register(centre, mail, mdp);
    if (dbresponse.length == 0) {
      res.send({
        success: false,
        message: "request failed",
      });
    } else {
      res.send({
        success: true,
        message: "user registered",
      });
    }
  } catch (error) {
    res.send({
      erreur: {
        status: error.status,
        message: error.message,
      },
    });
  }
}

async function refreshtoken(req, res) {
  const { refreshtoken, usermail } = req.body;
  const mail = await jwt.verifyrefreshtoken(refreshtoken, usermail);
  const newaccesstoken = await jwt.signaccesstoken(mail);
  const newrefreshtoken = await jwt.signrefreshtoken(mail);
  await SaveJWT(mail,newaccesstoken.accesstokenkey,newrefreshtoken.refreshtokenkey);
  res.send([newaccesstoken.accesstoken,newrefreshtoken.refreshtoken]);
}

export default { logging, register, refreshtoken };