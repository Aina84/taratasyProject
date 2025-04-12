import userLogin from "../models/login.mjs";
import { Router } from "express";

const router = Router();

router.post('/login',userLogin)

export default router
