import {Router} from "express";
import { messageFilter } from "../middlewares/messageFilter.mjs";
import ask from "../services/askAi.mjs";
const router = Router();

router.get('/:message',messageFilter,async (req,res)=>{
    const message = req.params.message;
    const Airesponse = await ask(message);
    res.send({ ai : Airesponse.text});
});

export default router;