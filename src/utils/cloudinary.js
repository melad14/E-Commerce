import * as dotenv from "dotenv"
import { v2 as cloudinary } from 'cloudinary';

dotenv.config()
cloudinary.config({
    cloud_name: process.env.MY_CLOUD_NAME,
    api_key: process.env.MY_CLOUD_KEY,
    api_secret: process.env.MY_CLOUD_SECRETKEY,
    secure: true
});


export default cloudinary;