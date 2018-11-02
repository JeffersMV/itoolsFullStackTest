const mongoose = require('mongoose');

const Book = new mongoose.Schema({
    name: {type:String, required: true, trim:true, default:''},
    author: {type:Array, required: true, default:0},
    publishing: {type:String, required: true, trim:true, default:''},
    ebook: {type:Boolean, required: true, trim:true, default:false},
    year: {type:Number, required: true, default:0},
    isbn: {type:String, required: true, trim:true, default:''},
    pages: {type:Number, required: true, default:0},
    _id: {type:Object, required: true}
    }
);

module.exports = mongoose.model('Book', Book);