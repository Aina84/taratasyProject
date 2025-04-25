import db from "../config/dbconfig.mjs";

const ModelAdmin = {
  log: async (mail, mdp) =>
    await db.query("SELECT * FROM admin WHERE mail=? && mdp=?", [mail, mdp]),

  register: async (nom, type, mail, mdp, fokotany, commune, district) => {
    const [fokotanyrow] = await db.query(
      "SELECT id FROM fokotany WHERE name=? AND commune=?",
      [fokotany, commune]
    );
    const [communerow] = await db.query("SELECT id FROM commune WHERE name=?", [
      commune,
    ]);
    const [districtrow] = await db.query(
      "SELECT id FROM district WHERE name=?",
      [district]
    );
    return await db.query(
      "INSERT INTO admin (nom, type, mail, mdp, fokotany, commune, district) VALUES (?,?,?,?,?,?,?)",
      [
        nom,
        type,
        mail,
        mdp,
        fokotanyrow[0].id,
        communerow[0].id,
        districtrow[0].id,
      ]
    );
  },
  getlocation: async (locationid, table) => {
    const [nameme] = await db.query(`SELECT name FROM ${table} WHERE id=?`, [
      locationid,
    ]);
    return nameme[0].name;
  },
  getlocationID: async (locationname, table) => {
    const [nameme] = await db.query(`SELECT id FROM ${table} WHERE name=?`, [
      locationname,
    ]);
    return nameme[0].name;
  },
};
export default ModelAdmin;
