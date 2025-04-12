import {glob} from 'glob'
import path from 'path'


export default async function listin(){
        let list = await glob.glob("src/uploads/**/*.png")
        return list
}
