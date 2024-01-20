const mongoose = require("mongoose");


//================================================================valid-name==================================================
const validName=function(name){
  const regexName=/^[a-zA-Z ]+$/;
  return regexName.test(name)
}

//=========================================================user -validation ====================================================
let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

let validMobile=/^[0]?[6789]\d{9}$/

let validPass=/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

let validname = /[0-9]+/

module.exports = { validName,validname,validEmail,validMobile, validPass}