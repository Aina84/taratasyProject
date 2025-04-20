import mysql from "mysql2/promise";
import { readFile } from "fs/promises";
import path, { dirname } from "path";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "taratasy_db",
});

async function createfokotanytable() {
  await db.query(
    "CREATE TABLE IF NOT EXISTS fokotany (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), commune VARCHAR(255), district VARCHAR(255))"
  );
  const fokotanyarray = JSON.parse(
    await readFile(
      path.resolve(
        "D:/DEV ESSAIS PROJETS/Taratasy_Backend_V1/src/data_fokotany/fokotanyBira.json"
      ),
      "utf8"
    )
  );
  fokotanyarray.forEach(async (data) => {
    await db.query(
      "INSERT INTO fokotany (name,commune,district,region) VALUES (?,?,?,?)",
      [data.fokontany, data.commune, data.district, data.region]
    );
  });
}

export default db;
