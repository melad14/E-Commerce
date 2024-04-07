import mongoose from "mongoose";
mongoose.set('strictQuery', true);
export function DBconnect(){
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('database connected...');
    }).catch((err)=>{
        console.log(err);
        console.log('database error...');
    })
}