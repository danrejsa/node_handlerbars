
const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    created_on: {type:Date, default: Date.now},
    customerId: {type:String},
    transactionId: {type:String},   
    fullNames: {type:String},
    address: {type:String},
    //gender: {type:String},
    idCard: {type:String},   
    phone: {type:Number},
    idNumber:{type:Number}
})
 module.exports = mongoose.model("Orders", orderSchema)






















