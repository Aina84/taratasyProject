import { Router } from "express";
import listingDoc from "../services/listingDoc.mjs";
import path from 'path'

const router = Router()

router.get('/document/:id',async (rq,rs)=>{
        const { id } = rq.params ;
        let list = await listingDoc();
        let exist = false
        list.forEach(doc => {
            let reg = RegExp(`${id}`);
            if(reg.test(doc)){
                let pathlist = path.normalize(doc)
                rs.download(pathlist)
                exist = true
            }
        })
        if(!exist){
            rs.send({error : 'not in our data base'})
        }
})

export default router