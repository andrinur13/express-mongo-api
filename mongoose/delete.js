const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product-db', {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

const sortingHat = Product.deleteOne({_id: '608718e5f825d1209fad55f3'}, function(error) {
    if(error) {
        console.log('error delete product');
    } else {
        console.log('success delete product');
    }
})