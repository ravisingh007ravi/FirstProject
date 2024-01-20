const memberModel = require("../models/memberModel.js");
const mongoose = require("mongoose");

const CreateMember = async function (req, res) {
    try {
  
        data = req.body;
  
        
      
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please Provide Details" })
        
        const MemberCreated = await memberModel.create(data)
        res.status(201).send({ status: true, message: "Book Member Successfully", data: MemberCreated })
  
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
  }
  module.exports = {CreateMember}