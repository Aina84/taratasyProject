import JWT from "jsonwebtoken";
import process from "node:process";

export default {
  signaccesstoken: (mail) => {
    return new Promise((resolve, reject) => {
      const payload = {
        aud: mail,
      };
      const secret = process.env.ACCESS_TOKEN_KEY;

      const options = {
        issuer: "lifejohn",
        expiresIn: "30m",
      };
      JWT.sign(payload, secret, options, (err, accesstoken) => {
        if (err) reject(err);
        resolve({ accesstoken });
      });
    });
  },

  verifyaccesstoken: async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!req.headers["authorization"]) return next("not authorized");
    JWT.verify(token, process.env.ACCESS_TOKEN_KEY, (err, payload) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          res.send(err.name);
          return next("Token is expired");
        } else if (err.name === "JsonWebTokenError") {
          res.send(err.name);
          return next("Token is Invalid");
        }
        res.send(err.name);
        return next(err.message);
      }
      req.payload = payload;
      next();
    });
  },
  signrefreshtoken: (mail) => {
    return new Promise((resolve, reject) => {
      const payload = {
        usermail: mail,
      };
      const secret = process.env.REFRESH_TOKEN_KEY;
      const options = {
        issuer: "lifejohn",
        expiresIn: "1d",
      };
      JWT.sign(payload, secret, options, async (err, refreshtoken) => {
        if (err) reject(err);
        resolve({ refreshtoken });
      });
    });
  },
  verifyrefreshtoken: async (refreshtoken, mail) => {
    const refreshtokenkey = process.env.REFRESH_TOKEN_KEY;
    return new Promise((resolve, reject) => {
      JWT.verify(refreshtoken, refreshtokenkey, (err, payload) => {
        if (err) return reject("unauthorized");
        const usermail = payload.usermail;
        resolve(usermail);
      });
    });
  },
};
