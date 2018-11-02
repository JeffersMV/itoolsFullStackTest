const mongoose = require('mongoose');

const Author = new mongoose.Schema({
        email: {type:String, required: true, trim:true, default:''},
        firstName: {type:String, required: true, trim:true, default:''},
        secondName: {type:String, required: true, trim:true, default:''},
        book: {type:Array, required: true, trim:true, default:0},
        birthDate: {type:Number, required: true, default:''},
        _id: {type:Object, required: true}
    }
);

module.exports = mongoose.model('Author', Author);