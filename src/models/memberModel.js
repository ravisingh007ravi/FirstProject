const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const memberSchema = new mongoose.Schema({

    user_id: {type: ObjectId, required: true, trim:true, ref: 'userSchema'},
    membered: {type:Number, required:true,trim:true},
    sponsored: {type:String, required:true,trim:true}, 
    total_earning: {type:String, required:true,trim:true},
  },{timestamps:true})
  module.exports=mongoose.model('Member',memberSchema)