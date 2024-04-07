import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'product name too short'],
        unique: [true, 'product name is already taken'],
        required:  [true, 'product name is required'],
        trim: true,
    },
    slug: {
        type: String,
        lowercase:true,
        required:true
    },
    price:{
        type:Number,
        required: [true, 'product price is required'],
        min:0

    },
    priceAfterDiscount:{
        type:Number,
        min:0
    },
    ratingAvg:{
        type:Number,
        min:0,
        max:5,
        default:0
    },
    ratingCount:{
        type:Number,
        min:0,
        default:0

    },
    description: {
        type: String,
        minLength: [5, 'description is too short'],
        maxLength: [300, 'description is too long'],
        required: [true, 'description is required'],
        trim: true,
    },
    quantity:{
        type:Number,
        min:0,
        default:0,
        required: [true, 'product quantity is required'],
    },   
    sold:{
        type:Number,
        min:0,
        default:0,
    },  
    imgCover:String,
    images:[String],

    category:{
        type:mongoose.Types.ObjectId,
        ref:"category",
        required: [true, 'product Category is required'],
       },
    subcategory:{
        type:mongoose.Types.ObjectId,
        ref:"subCategory",
        required: [true, 'product subCategory is required'],

       },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:"brand",
        required: [true, 'product brand is required'],
       },
       
   
},{timestamps:true,toJSON:{virtuals:true}})

productSchema.post('init',(doc)=>{ 
    doc.imgCover=process.env.BASE_URL+'products/'+doc.imgCover
    doc.images= doc.images.map(path=>process.env.BASE_URL+'products/'+path)

})

productSchema.virtual('myReviews',{
    ref:'review',
    localField:'_id',
    foreignField :'product'
 })
 
 productSchema.pre(/^find/,function(){
     this.populate('myReviews')
 })
export const productModel=mongoose.model('product',productSchema)