import { Router } from "express";
import adminController from "../controllers/adminController.mjs"

const router = Router();

router.post('/auth/login',adminController.logging)
router.post('/auth/register',adminController.register)

export default router
