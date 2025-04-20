import ModelAdmin from "../models/admin.model.mjs";
import jwt from "../middlewares/jwt.mjs";
import SaveJWT from "../services/savenjwToken.mjs";
import Modelclient from "../models/client.model.mjs";
async function logging(req, res) {
  try {
    const { mail, mdp } = req.body;
    if (!mail || !mdp) return res.send("please, enter valid data");
    const data = await ModelAdmin.log(mail, mdp);
    if (!data[0][0]) return res.send("user not found");
    const { nom, type, fokotany, commune, district } = data[0][0];
    const fokotanyString = await ModelAdmin.getlocation(fokotany, "fokotany");
    const communeString = await ModelAdmin.getlocation(commune, "commune");
    const districtString = await ModelAdmin.getlocation(district, "district");
    if (data.length > 0) {
      const { accesstoken, accesstokenkey } = await jwt.signaccesstoken(mail);
      const { refreshtoken, refreshtokenkey } = await jwt.signrefreshtoken(
        mail
      );
      await SaveJWT(mail, accesstokenkey, refreshtokenkey);
      res.send({
        success: true,
        nom,
        type,
        mail,
        fokotanyString,
        fokotanyID: fokotany,
        communeString,
        communeID: commune,
        districtString,
        districtID: district,
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
    const { nom, type, mail, mdp, fokotany, commune, district } = req.body;

    const dbresponse = await ModelAdmin.register(
      nom,
      type,
      mail,
      mdp,
      fokotany,
      commune,
      district
    );
    if (dbresponse.length > 0) {
      res.send({
        success: true,
        message: "user registered",
      });
    } else {
      res.send({
        success: false,
        message: "request failed",
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
  await SaveJWT(
    mail,
    newaccesstoken.accesstokenkey,
    newrefreshtoken.refreshtokenkey
  );
  res.send([newaccesstoken.accesstoken, newrefreshtoken.refreshtoken]);
}

async function getClientList(req, res) {
  const { type, adminLocationID } = req.body;
  console.log(type, adminLocationID);
  const clientList = await Modelclient.list(type, adminLocationID);

  for (let client of clientList) {
    client.fokotany = await ModelAdmin.getlocation(client.fokotany, "fokotany");
    client.commune = await ModelAdmin.getlocation(client.commune, "commune");
    client.district = await ModelAdmin.getlocation(client.district, "district");
  }

  console.log(clientList);
  res.send(clientList);
}

async function deleteClientbyID(req, res) {
  try {
    const { id } = req.body;
    const response = await Modelclient.delete(id);
    res.send({ success: true });
  } catch (err) {
    res.send({ success: false });
  }
}

async function getBestcontributor(req, res) {
  try {
    const { type, adminLocationID } = req.body;
    const response = await Modelclient.getBestcontributor(
      type,
      adminLocationID
    );
    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
}

async function getTotaluser(req, res) {
  try {
    const { type, adminLocationID } = req.body;
    const response = await Modelclient.getTotaluser(type, adminLocationID);
    res.send(response);
  } catch (error) {
    res.send(error.message);
  }
}

async function giftUser(req, res) {
  const { id, gift } = req.body;
  const dbresponse = await Modelclient.giftClient(id,gift)
  res.send({success:true,message:'client gifted avec succes'})
}

export default {
  logging,
  register,
  refreshtoken,
  getClientList,
  deleteClientbyID,
  getBestcontributor,
  getTotaluser,
  giftUser
};
