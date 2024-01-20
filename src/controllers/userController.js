const UserModel = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {validname,validEmail,validMobile,validPass} = require("../validation/valid");


let creatUser = async function (req, res) {
    try {
      let data = req.body;
      if (Object.keys(data).length == 0) {return res.status(400).send({ status: false, message: "Body is empty can't craeate data" })}
     
  
      if (!data.name.trim() || validname.test(data.name)) {return res.status(400).send({ status: false, message: "enter a valid name" })}
  
      if (!data.email.trim() || !validEmail.test(data.email.trim())) {return res.status(400).send({ status: false, message: "enter a valid email" })}
  
      if (!data.phone.trim() || !validMobile.test(data.phone.trim())) {return res.status(400).send({ status: false, message: "enter a valid phone No" })}
  
      if (!data.password.trim() || !validPass.test(data.password)) { return res.status(400).send({status: false,message:"Password should be in-between 8-15 characters and must contain one of 0-9,A-Z,a-z and special character"})}
  
      let oldUser = await UserModel.findOne({$or: [{ phone: data.phone }, { email: data.email }]})
      if (oldUser) {return res.status(400).send({status: false,message: "User already exist with this phone no or email Id"})}

      data.password = await bcrypt.hash(data.password, 10)

      let user = await UserModel.create(data);
      
      res.status(201).send({ status: true, msg: "User created successfully",data:user })} 
      catch (err) {
      res.status(500).send({ status: false, msg: err.message });
     }
  };


  //<--------------This API used for Log in Author------------------>// 
  let login = async (req, res) => {
  try {

      let author = req.body;

      let { email, password } = author;

      if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).send({ status: false, msg: "please provide login details" });

      if (!email) return res.status(400).send({ msg: " email is required " })
      if (!password) return res.status(400).send({ msg: "  password is required " })

      let loggedAuthor = await UserModel.findOne({ email: email })
      if (!loggedAuthor) return res.status(400).send({ msg: "Email is Incorrect!" })


      const checkpasword = await bcrypt.compare(password.trim(), loggedAuthor.password);
      if (!checkpasword) return res.status(400).send({ msg: "password is Incorrect!" });

      let token = jwt.sign(
          {
              authorId: loggedAuthor._id.toString(),
              batch: "Asyscraft Technologies Pvt Ltd",
              project: "FirstProject"
          },
          "firstProjectSecrectCode", { expiresIn: '12h' }
      )

      const UserId = loggedAuthor['_id'];

      return res.status(201).send({ msg: "User logged in successfully!", loggedAuthor, token, UserId })
  } catch (error) {
      return res.status(500).send({ msg: error.message })
  }
}

module.exports = { creatUser, login };