import {Router} from "express";
import messageFilter from "../middlewares/messageFilter.mjs";
import aiController from "../controllers/aiController.mjs";

const router = Router();

router.get('/help/askAi/:message',messageFilter,aiController);

export default router;