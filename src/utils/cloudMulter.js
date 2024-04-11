import multer from 'multer';
import { AppError } from './AppErr.js';




let options=()=>{
  const storage = multer.diskStorage({})
 function fileFilter(req,file,cb){
    if(file.mimetype.startsWith('image')){
      cb(null,true)
    }else{
           cb(new AppError('imges only',400),false)
    }

  }
  return multer({  storage,fileFilter })

}


export const fileup=(field)=>  options().single(field)

  

export const Mixfileup=(arrOfFields)=> options().fields(arrOfFields)