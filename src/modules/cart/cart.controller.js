import { cartModel } from "../../../database/models/cart.js";
import { coponModel } from "../../../database/models/coupon.js";
import { catchAsyncErr } from "../../middleware/catchErr.js";
import { AppError } from "../../utils/AppErr.js";
import { productModel } from './../../../database/models/products.js';



function calctotalPrice(cart) {
    let totalPrice = 0;
    cart.cartItems.forEach(elm => {
        totalPrice += elm.quantity * elm.price
    });
    cart.totalPrice = totalPrice

}


const addTocart = catchAsyncErr(async (req, res, next) => {
    let product = await productModel.findById(req.body.product)
    if (!product) return next(new AppError(`product not found`, 404))
    req.body.price = product.price

    let cartExist = await cartModel.findOne({ user: req.user._id })
    if (!cartExist) {
        let newcart = new cartModel({
            user: req.user._id,
            cartItems: [req.body]

        })

        calctotalPrice(newcart)
        await newcart.save()
        return res.status(201).json({ "message": " success", newcart })
    }
    let item = cartExist.cartItems.find((elm) => elm.product == req.body.product)
    if (item) {
        item.quantity += 1
    } else {
        cartExist.cartItems.push(req.body)
    }
    calctotalPrice(cartExist)
    if (cartExist.discount) {
        cartExist.totalPriceAfterDiscount = cartExist.totalPrice - (cartExist.totalPrice * cartExist.discount) / 100
    }
    await cartExist.save()
    res.status(201).json({ "message": " success", cart: cartExist })

})


const removeFromCart = catchAsyncErr(async (req, res, next) => {
    const result = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { _id: req.params.id } } }, { new: true })
    if (!result) return next(new AppError(`not found`, 404))
    calctotalPrice(result)
    if (result.discount) {
        result.totalPriceAfterDiscount = result.totalPrice - (result.totalPrice * result.discount) / 100
    }
    res.status(200).json({ "message": " success", result })
})

const updateQuantity = catchAsyncErr(async (req, res, next) => {
    let product = await productModel.findById(req.params.id)
    if (!product) return next(new AppError(`product not found`, 404))
    req.body.price = product.price

    let cartExist = await cartModel.findOne({ user: req.user._id })

    let item = cartExist.cartItems.find((elm) => elm.product == req.params.id)
    if (item) {
        item.quantity = req.body.quantity
    }
    calctotalPrice(cartExist)
    if (cartExist.discount) {
        cartExist.totalPriceAfterDiscount = cartExist.totalPrice - (cartExist.totalPrice * cartExist.discount) / 100
    }
    await cartExist.save()
    res.status(201).json({ "message": " success", cartExist })
})

const applyCoupon = catchAsyncErr(async (req, res, next) => {
    let coupon = await coponModel.findOne({ code: req.body.code, expire: { $gt: Date.now() } })
    if (!coupon) return next(new AppError(`coupon not available`, 404))

    let cart = await cartModel.findOne({ user: req.user._id })
    cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.discount = coupon.discount
    await cart.save()
    res.status(201).json({ "message": " success", cart })
})

const getLoggedUserCart = catchAsyncErr(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id }).populate('cartItems.product')
    if (!cart) return next(new AppError(`cart not found`, 404))

    res.status(201).json({ "message": " success", cart })


})

export {
    addTocart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    getLoggedUserCart
}