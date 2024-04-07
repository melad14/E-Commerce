import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: [3, 'name too short'],
        maxLength: [20, 'name too long'],
        required: [true, 'name required'],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'email is required'],
        unique: [true, 'this email is already taken']
    },
    password: {
        type: String,
        minLength: [6, 'password minLength is 6 characters'],
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profilePic: {
        type: String
    },
    confirm: {
        type: Boolean,
        default: false
    },
    changePassAt: Date,
    code: { type: String },

    wishlist: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'product'
    }],
    adresses: [{
        city: String,
        street: String,
        phone: String
    }]
}, { timestamps: true })

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 7)
})
userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 7)
})

export const userModel = mongoose.model('user', userSchema)