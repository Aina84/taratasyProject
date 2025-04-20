import { Router } from "express";
import adminController from "../controllers/adminController.mjs"

const router = Router();

router.post('/auth/login',adminController.logging)
router.post('/auth/register',adminController.register)
router.post('/auth/refreshToken',adminController.refreshtoken)
router.post('/client/list',adminController.getClientList)
router.post('/client/delete',adminController.deleteClientbyID)
router.post('/client/bestcon',adminController.getBestcontributor)
router.post('/client/totalclient',adminController.getTotaluser)
router.post('/client/giftClient',adminController.giftUser)

export default router
