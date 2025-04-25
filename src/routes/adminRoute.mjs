import { Router } from "express";
import adminController from "../controllers/adminController.mjs";
import token from '../middlewares/jwt.mjs'
const router = Router();

router.post("/auth/login", adminController.logging);
router.post("/auth/register", adminController.register);
router.post("/auth/refreshToken",adminController.refreshtoken);
router.post("/client/list",token.verifyaccesstoken, adminController.getClientList);
router.post("/client/delete",token.verifyaccesstoken, adminController.deleteClientbyID);
router.post("/client/bestcon",token.verifyaccesstoken, adminController.getBestcontributor);
router.post("/client/totalclient",token.verifyaccesstoken, adminController.getTotaluser);
router.post("/client/giftClient",token.verifyaccesstoken, adminController.giftUser);
router.post("/auth/logout",token.verifyaccesstoken, adminController.logout);
router.get("/getAuthorization",adminController.giveAuthorization)
export default router;
