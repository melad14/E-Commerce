import multer from 'multer';
import {v4 as uuidv4} from 'uuid'
import { AppError } from './AppErr.js';

let options=(folder)=>{
  const storage = multer.diskStorage({
    destination:  (req, file, cb)=>  {
      cb(null, `uploads/${folder}`)
    },
    filename:  (req, file, cb)=> {
  
      cb(null, uuidv4()+ "-" + file.originalname)
    }
  })
 function fileFilter(req,file,cb){
    if(file.mimetype.startsWith('image')){
      cb(null,true)
    }else{
           cb(new AppError('imges only',400),false)
    }

  }
  return multer({  storage,fileFilter })

}


export const fileup=(field,folder)=>  options(folder).single(field)

  

export const Mixfileup=(arrOfFields,folder)=> options(folder).fields(arrOfFields)