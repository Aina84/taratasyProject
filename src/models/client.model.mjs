import db from "../config/dbconfig.mjs";

const Modelclient = {
  list: async (type, adminLocation) => {
    let client = undefined;
    switch (type) {
      case "fokontany":
        client = await db.query(`SELECT * FROM client WHERE fokotany=?`, [
          adminLocation,
        ]);
        return client[0];
      case "commune":
        client = await db.query(`SELECT * FROM client WHERE commune=?`, [
          adminLocation,
        ]);
        return client[0];
      case "district":
        client = await db.query(`SELECT * FROM client WHERE district=?`, [
          adminLocation,
        ]);
        return client[0];
    }
  },
  delete: async (id) => {
    db.query("DELETE FROM client WHERE id=?", [id], (response) => {
      return response;
    });
  },
  getBestcontributor: async (type, adminLocation) => {
    let clientname = undefined;
    const [contributionvalue] = await db.query(
      "SELECT MAX(contribution) AS bestcon FROM client"
    );
    switch (type) {
      case "fokontany":
        [clientname] = await db.query(
          `SELECT nom,prenom,id FROM client WHERE fokotany=? AND contribution=?`,
          [adminLocation, contributionvalue[0].bestcon]
        );
        return { name: clientname[0], numbercon: contributionvalue[0].bestcon };
      case "commune":
        [clientname] = await db.query(
          `SELECT nom,prenom,id FROM client WHERE commune=? AND contribution=?`,
          [adminLocation, contributionvalue[0].bestcon]
        );
        return { name: clientname[0], numbercon: contributionvalue[0].bestcon };
      case "district":
        [clientname] = await db.query(
          `SELECT nom,prenom,id FROM client WHERE district=? AND contribution=?`,
          [adminLocation, contributionvalue[0].bestcon]
        );
        return { name: clientname[0], numbercon: contributionvalue[0].bestcon };
    }
  },
  getTotaluser: async (type, adminLocation) => {
    let total = undefined;
    switch (type) {
      case "fokontany":
        [total] = await db.query(
          `SELECT COUNT(id) as total FROM client WHERE fokotany=?`,
          [adminLocation]
        );
        return total[0];
      case "commune":
        [total] = await db.query(
          `SELECT COUNT(id) as total FROM client WHERE commune=?`,
          [adminLocation]
        );
        return total[0];
      case "district":
        [total] = await db.query(
          `SELECT COUNT(id) as total FROM client WHERE district=?`,
          [adminLocation]
        );
        return total[0];
    }
  },
  giftClient: async (id, value) => {
    const [result] = await db.query(
      `UPDATE client SET solde=solde+? WHERE id=?`,
      [value,id]
    );
    return result[0];
  },
};

export default Modelclient;
