const jwt = require('jsonwebtoken');
const { isValidObjectId } = require("mongoose")


const authentication = (req, res, next) => {
  try {
    let token = req.headers['x-api-key']
  
    if (!token) return res.status(400).send({ status: false, message: "Token is missing" })

    let decodedToken = jwt.verify(token, "firstProjectSecrectCode");
    if (!decodedToken) return res.status(401).send({ status: false, message: "Token is not valid" })
    req.decodedToken = decodedToken;
    next();
  } catch (err) {
    if(err.message == "jwt expired") return res.status(401).send({ status: false, message: "JWT expired, login again" })
    if(err.message == "invalid signature") return res.status(401).send({ status: false, message: "Token is incorrect authentication failed" })
    res.status(500).send({ status: false, error: err.message })
  }
}

const authorization = async (req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
    
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
    
        let decodedToken = jwt.verify(token, "firstProjectSecrectCode");
    
        if (!decodedToken)
          return res.status(401).send({ status: false, msg: "token is invalid" });
    
        if (req.body.authorId == decodedToken.authorId) return next();
        else return res.status(403).send({ status: false, msg: "you are not authorised !" });
    
      } catch (error) {
        return res.status(500).send({ msg: error.message })
      }
}
module.exports = { authentication, authorization }