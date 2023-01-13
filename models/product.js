const mongoose = require("mongoose");


//Le schema
const productSchema = mongoose.Schema({
           code : String,
           description : String,
           price :Number
        }
);
//Definir la collection
const Product = mongoose.model('Product', productSchema);
//Exporter le schema
module.exports = Product;