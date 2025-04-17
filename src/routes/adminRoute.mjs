import { Router } from "express";
import { logging } from "../controllers/adminController.mjs";
const router = Router();

router.post('/login',logging)

export default router
