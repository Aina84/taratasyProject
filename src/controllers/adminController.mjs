import ModelAdmin from "../models/admin.model.mjs";
import jwt from "../middlewares/jwt.mjs";
import SaveJWT, { DeleteJWT } from "../services/savenjwToken.mjs";
import { readFile } from "fs/promises";
import Modelclient from "../models/client.model.mjs";
import { normalize, resolve } from "path";
import JWT from 'jsonwebtoken'

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
      const { accesstoken } = await jwt.signaccesstoken(mail);
      const { refreshtoken } = await jwt.signrefreshtoken(mail);
      await SaveJWT(mail, accesstoken, refreshtoken);
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
  try {
    const { refreshtoken, usermail } = req.body;
    const mail = await jwt.verifyrefreshtoken(refreshtoken, usermail);
    const newaccesstoken = await jwt.signaccesstoken(mail);
    const cachetokenpath = normalize(
      resolve(
        "D:/DEV ESSAIS PROJETS/Taratasy_Backend_V1/src/cache",
        `${mail.split("@")[0]}.txt`
      )
    );
    const localRefreshtoken = await readFile(cachetokenpath, "utf8");
    if (localRefreshtoken.length > 0) {
      if (localRefreshtoken.trim() === refreshtoken) {
        res.send({newaccesstoken, refreshtoken});
        await SaveJWT(mail, newaccesstoken, refreshtoken);
      } else {
        throw Error("unauthorized");
      }
    } else {
      throw Error("unauthorized");
    }
  } catch (error) {
    res.send(error.message);
  }
}

async function getClientList(req, res) {
  const { type, adminLocationID } = req.body;
  const clientList = await Modelclient.list(type, adminLocationID);

  for (let client of clientList) {
    client.fokotany = await ModelAdmin.getlocation(client.fokotany, "fokotany");
    client.commune = await ModelAdmin.getlocation(client.commune, "commune");
    client.district = await ModelAdmin.getlocation(client.district, "district");
  }

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
  const dbresponse = await Modelclient.giftClient(id, gift);
  res.send({ success: true, message: "client gifted avec succes" });
}

async function logout(req, res) {
  const { mail } = req.body;
  await DeleteJWT(mail);
  res.send("logout success");
  console.log(mail,'logout success')
}

const giveAuthorization = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  JWT.verify(token, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.send({message:err.name});
      } else if (err.name === "JsonWebTokenError") {
        return res.send({message:err.name});
      }
      res.send({message:err.name});
    }
    res.send({ok:true})
  });
}

export default {
  logout,
  logging,
  register,
  refreshtoken,
  getClientList,
  deleteClientbyID,
  getBestcontributor,
  getTotaluser,
  giftUser,
  giveAuthorization
};
