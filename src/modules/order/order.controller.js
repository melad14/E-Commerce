import { cartModel } from "../../../database/models/cart.js"
import { productModel } from "../../../database/models/products.js";
import { catchAsyncErr } from "../../middleware/catchErr.js"
import { AppError } from "../../utils/AppErr.js";
import { orderModel } from './../../../database/models/order.js';
import Stripe from 'stripe';
import * as dotenv from "dotenv"
dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SKRT)


const ctreateCashOrder = catchAsyncErr(async (req, res, next) => {

    const cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', 404))
    const totalOrderPrice = cart.totalPriceAfterDiscount ?
        cart.totalPriceAfterDiscount : cart.totalPrice

    const order = new orderModel({
        user: req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice,
        shippingAdress: req.body.shippingAdress,
    })
    await order.save()

    if (order) {
        let options = cart.cartItems.map(item => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: item.quantity } }

            }
        }))
        await productModel.bulkWrite(options)
        await cartModel.findByIdAndDelete(req.params.id)
    }
    return res.status(201).json({ "message": " success", order })

})

const getSpecificorders = catchAsyncErr(async (req, res, next) => {

    let order = await orderModel.findOne({ user: req.user._id }).populate('cartItems.product')
    if (!order) return next(new AppError('order not found', 404))
    res.status(201).json({ "message": " success", order })


})
const getAllorders = catchAsyncErr(async (req, res, next) => {

    let orders = await orderModel.find({}).populate('cartItems.product')
    if (!orders) return next(new AppError('orders not found', 404))
    res.status(201).json({ "message": " success", orders })

})

const createCheckOut = catchAsyncErr(async (req, res, next) => {
    const cart = await cartModel.findById(req.params.id)
    if (!cart) return next(new AppError('cart not found', 404))

    const totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1

            }
        ],
        mode: 'payment',
        success_url: process.env.BASE_URL,
        cancel_url: process.env.BASE_URL + '/cart',
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAdress
    })
    res.status(201).json({ "message": " success", session })

})

export {
    ctreateCashOrder,
    getSpecificorders,
    getAllorders,
    createCheckOut
}