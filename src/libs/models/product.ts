import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    imgSrc: {
        type: String,
        require: true,
    },
    filekey: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
})

const Product = models.Product || model("product", productSchema);

export default Product;