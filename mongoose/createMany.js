const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product-db', {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

const sortingHat = new Product({
    name: 'Sorting Hat',
    rating: 10,
    price: 100000000
});

const bertieBotts = new Product({
    name: `Bertie Botts's`,
    rating: 8,
    price: 10000
})

const goldenSnitch = new Product({
    name: 'Golden Snitch',
    rating: 9.5,
    price: 30000000
})

Product.insertMany([sortingHat, bertieBotts, goldenSnitch], function(error) {
    if(error) {
        console.log(`gagal insertmany`);
    } else {
        console.log(`success insertmany`);
    }
})