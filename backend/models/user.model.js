import bcrypt from "bcryptjs"
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        unique : true,
        trim : true,
        lowercase : true
    },
    password : {
        type : String,
        minlength : [6, "Password must be at least 6 character long"],
        required : [true, "Password is required"]
    },
    cartItems : [
        {
            quantity : {
                type : Number,
                default : 1
            },
            product : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Product"
            }
        }
    ],
    role : {
        type : String,
        enum : ["customer", "admin"],
        default : "customer"
    }
}, {
    timestamps : true
})

// hashing the password after creating model
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;