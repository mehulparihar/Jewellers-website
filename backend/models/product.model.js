import mongoose from "mongoose";
const Basic_Details = new mongoose.Schema({
    Item_Code : {
        type : String
    },
    Design_Number : {
        type : String
    },
    Item_Type : {
        type : String
    },
    Gross_Weight : {
        type : Number
    },
    Net_Weight : {
        type : Number
    }
});

const Metal_Detail = new mongoose.Schema({
    Metal_Type : {
        type : String
    },
    Metal_Colour : {
        type : String
    },
    Metal_Purity : {
        type : String
    },
    Stone_Weight : {
        type : Number
    }
});

const Price_Breakup = new mongoose.Schema({
    Metal : {
        type : Number
    },
    Making_Charges : {
        type : Number
    },
    Gst : {
        type : Number
    },
    Discount : {
        type : Number
    },
    Other_Charges : {
        type : Number
    }
})

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        min : 0,
        required : true     
    },
    image:{
        type : String,
        required : [true, "Image is Required"]
    },
    category : {
        type : String,
        required : true
    },
    subCategory : {
        type : String, 
        // required : true
    },
    isFeatured :{
        type : Boolean,
        default : false
    },
    Basic_Details : Basic_Details,
    Metal_Detail : Metal_Detail,
    Price_Breakup : Price_Breakup
}, {timestamps : true});

const Product = mongoose.model("Product", productSchema);

export default Product;