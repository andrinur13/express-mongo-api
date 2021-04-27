const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/product-db', {useNewUrlParser: true, useUnifiedTopology: true});

const productSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

const magicWand = Product.updateOne({_id: '6087171106c3d31ed41e156c'}, {name: 'Magic Wand Harry Potter'}, function(error) {
    if(error) {
        console.log('terjadi error, gagal mengupdate');
    } else {
        console.log('berhasil mengupdate');
    }
})