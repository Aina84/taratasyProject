import { Router } from "express";
import requestDocController from "../controllers/requestDocController.mjs";

const router = Router();

router.get("/document/:id", requestDocController);

export default router;
