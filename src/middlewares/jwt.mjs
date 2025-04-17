import JWT from 'jsonwebtoken';
import { readFile } from 'node:fs/promises';
import crypto from 'node:crypto';
import path,{ normalize,resolve } from 'node:path';

export default {

    signaccesstoken : (mail) => {
        return new Promise((resolve,reject)=>{
            const payload = {
                aud : mail
            };
            const secret = crypto.randomBytes(32).toString('hex');
            
            const options = {
                issuer : 'lifejohn',
                expiresIn : '30s'
            };
            JWT.sign(payload,secret,options,(err,accesstoken)=>{
                if(err) reject(err);
                resolve({accesstoken,accesstokenkey:secret});
            })
        })
    },
    
    verifyaccesstoken : async (req,res,next) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!req.headers['authorization']) return next('not authorized');
        const mail = req.params.mail;
        const readaccesstokenkey = await readFile(normalize(resolve(`D:/DEV ESSAIS PROJETS/Taratasy_Backend_V1/src/cache/${mail.split('@')[0]}.txt`),'utf8'));
        const accesstokenkey = String(readaccesstokenkey).split('avec')[0].trim();
        JWT.verify(token,accesstokenkey,(err,payload)=>{
            if(err){
                if (err.name === "TokenExpiredError") {
                    return next("Token is expired");
                } else if (err.name === "JsonWebTokenError") {
                  return next("Token is Invalid");
                }
                return next(err.message)
            }
            req.payload = payload;
            console.log('success')
            next();
        })
    }
    ,signrefreshtoken : (mail) => {
        return new Promise((resolve,reject)=>{
            const payload = {
            usermail : mail
            };
            const secret = crypto.randomBytes(32).toString('hex');
            const options = {
                issuer : 'lifejohn',
                expiresIn : '30y'
            };
            JWT.sign(payload,secret,options,async (err,refreshtoken)=>{
                if(err) reject(err);
                resolve({refreshtoken,refreshtokenkey:secret});
            })
        })
    },
    verifyrefreshtoken : async (refreshtoken,mail) => {
        
        const readrefreshtokenkey = await readFile(normalize(path.resolve(`D:/DEV ESSAIS PROJETS/Taratasy_Backend_V1/src/cache/${mail.split('@')[0]}.txt`),'utf8'));
        
        return new Promise((resolve,reject)=>{
            const refreshtokenkey = String(readrefreshtokenkey).split('avec')[1].trim();
            JWT.verify(refreshtoken,refreshtokenkey,(err,payload)=>{
                if (err) return reject('not authorized');
                const usermail = payload.usermail;
                resolve(usermail);
            })
        })
    }

}