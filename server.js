process.on('uncaughtException', (err) => {
    console.log('uncaughtException', err);
})

import express from 'express'
import { DBconnect } from './database/DBconnection.js'
import * as dotenv from "dotenv"
import cors from "cors"
import init from './src/modules/index.routes.js';
import { webhook } from './src/modules/order/order.controller.js';
dotenv.config()

const app = express()

app.post('/webhook', express.raw({type: 'application/json'}), webhook);
app.use(express.json())
app.use(cors())
app.use(express.static('uploads'))
const port = process.env.PORT || 3000

  


init(app)
DBconnect()

app.listen(port, () => console.log(`runing...`))



process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err)
})