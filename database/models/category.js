import mongoose from "mongoose";

const categorySchema=mongoose.Schema({
    name:{
        type:String,
        unique:[true,'category name is required'],
        trim:true,
        require:true,
        minLength:[2,'too short category name']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    image:String

},{timestamps:true})
categorySchema.post('init',(doc)=>{ 
    doc.image=process.env.BASE_URL+'categories/'+doc.image
})

export const CategoryModel=new mongoose.model('category',categorySchema)