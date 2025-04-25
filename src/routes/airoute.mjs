import { Router } from "express";
import messageFilter from "../middlewares/messageFilter.mjs";
import aiController from "../controllers/aiController.mjs";
import token from "../middlewares/jwt.mjs";

const router = Router();

router.get(
  "/help/askAi/:message/:mail",
  token.verifyaccesstoken,
  messageFilter,
  aiController
);

export default router;
