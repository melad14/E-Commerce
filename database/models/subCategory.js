import mongoose from "mongoose";

const subCategorySchema=mongoose.Schema({
    name: {
        type: String,
        required: [true, 'subCategory is unique'],
        minLength: [3, 'subcategory name is too short'],
        unique: [true,'this name is already taken'],
        trim: true,
    },
    slug: {
        type: String ,
        lowercase:true,
        required:true
    },
   category:{
    type:mongoose.Types.ObjectId,
    ref:"category"
   },
   image:String

   
},{timestamps:true})

subCategorySchema.post('init',(doc)=>{ 
    doc.image=process.env.BASE_URL+'subcategories/'+doc.image
})

export const subCategoryModel=mongoose.model('subCategory',subCategorySchema)