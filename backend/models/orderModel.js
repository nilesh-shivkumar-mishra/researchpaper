import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
   userId:{type:mongoose.Schema.Types.ObjectId , required : true , ref:'User'},
   items:{type:Array , required : true},
   amount:{type:Number , required : true},
   address:{type:Object , required : true},
   status:{type:String , required : true , default:'Order Placed'},
   paymentMethod:{type:String , required : true},
   payment:{type:Boolean , required : true , default:false},
   date:{type:Date , required : true}

})


const orderModel = mongoose.models.order || mongoose.model('order',orderSchema)
export default orderModel;


// other logic

// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
//   // other fields
// });

// module.exports = mongoose.model('Order', orderSchema);
