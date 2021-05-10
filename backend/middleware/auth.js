
//****************** Middleware perfom validation check on the token, whether token is valid or not & whether user is logged in *************************** */
const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if(!token){
      return (
        res.status(401).json({msg: "No authentication token, access denied"})
      );
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
      return (
        res.status(401).json({msg: "Token verification failed, authentication denied"})
      );
    }

    req.user = verified.id;

    next();

  } catch (error) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = auth;