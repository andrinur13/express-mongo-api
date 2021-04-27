const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product-db', {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `The name must be filled`]
    },
    rating: Number,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

const magicWand = new Product({
    name: 'Magic Wand',
    rating: 9,
    price: 100000
});

magicWand.save(function(error) {
    if(error) {
        console.log(`ada error`);
    } else {
        console.log(`tidak ada error`);
    }
})