import mongoose from "mongoose";

const brandSchema=mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'brand name is already taken'],
        required: [true, 'brand name is required'],
        trim: true,
    },
    slug: {
        type: String,
        lowercase:true,
        required:true
    },
    logo:String
   
},{timestamps:true})

brandSchema.post('init',(doc)=>{ 
    doc.logo=process.env.BASE_URL+'brands/'+doc.logo
})
export const brandModel=mongoose.model('brand',brandSchema)