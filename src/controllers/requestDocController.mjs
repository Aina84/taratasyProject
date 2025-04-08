import listingDoc from "../services/listingDoc.mjs";
import path from 'path'
import QrGenerator from "../services/addQrCode.mjs";

export default async function requestDocController(req,res){
    const { id } = req.params ;
    let list = await listingDoc();
    let exist = false
    list.forEach(async (doc) => {
        let reg = RegExp(`${id}`);
        if(reg.test(doc)){
            exist = true;
            let pathdoc = path.normalize(doc);
            let outpathname = path.resolve('src/uploads/.cache/Qr_'+path.basename(pathdoc));
            await QrGenerator(pathdoc,outpathname,'12/2/2124');
            res.download(outpathname);
            return;
        }
    })
    if(exist==false){
        res.send({error : 'not in our data base'})
    }
}