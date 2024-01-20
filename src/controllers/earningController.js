const earningModel = require("../models/EarningModel.js");
const mongoose = require("mongoose");

const EarningMember = async function (req, res) {
    try {
  
        data = req.body;
      
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Please Provide Details" })
        
        const earningCreated = await earningModel.create(data)
        res.status(201).send({ status: true, message: "Earniing Data Successfully", data: earningCreated })
  
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }
  }
  module.exports = {EarningMember}