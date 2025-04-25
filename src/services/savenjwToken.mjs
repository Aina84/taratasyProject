import fs from "fs/promises";
import { resolve, normalize } from "path";

export default async function SaveJWT(mail, accesstoken, refreshtoken) {
  const cachetokenpath = normalize(
    resolve(
      "D:/DEV ESSAIS PROJETS/Taratasy_Backend_V1/src/cache",
      `${mail.split("@")[0]}.txt`
    )
  );
  let test = false;
  try {
    await fs.stat(cachetokenpath);
    test = true;
  } catch (err) {
    test = false;
  }
  if (test) {
    await fs.writeFile(cachetokenpath, `${refreshtoken}`, "utf8");
  } else {
    await fs.appendFile(cachetokenpath, `${refreshtoken}`, "utf8");
  }
}

export const DeleteJWT = async (mail) => {
  const cachetokenpath = normalize(
    resolve(
      "D:/DEV ESSAIS PROJETS/Taratasy_Backend_V1/src/cache",
      `${mail.split("@")[0]}.txt`
    )
  );
  await fs.writeFile(cachetokenpath, "  ", "utf8");
};
