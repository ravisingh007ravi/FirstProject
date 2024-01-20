// const { Timestamp } = require('bson');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({

    Id: {type:String, trim:true},
    name: {type:String, required:true,trim:true},
    email: {type:String, required:true, unique:true,trim:true}, 
    password: {type:String, required:true,trim:true},
    phone: {type:String, required:true, unique:true,trim:true},
  },{timestamps:true})
  module.exports=mongoose.model('User',userSchema)