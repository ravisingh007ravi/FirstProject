const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const earningSchema = new mongoose.Schema({

    member_id: {type: ObjectId, required: true, trim:true, ref: 'memberSchema'},
    amount: {type:Number, required:true,trim:true},
    earning_type: {type:String, required:true,trim:true}, 
    
  },{timestamps:true})
  module.exports=mongoose.model('Earninig',earningSchema)