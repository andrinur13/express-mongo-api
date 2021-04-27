const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product-db', {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

Product.find(function(error, product) {
    if(error) {
        console.log(error)
    } else {
        product.forEach((p) => {
            console.log(p.name);
        });
    }
})