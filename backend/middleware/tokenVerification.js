const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({ message: 'Unauthorized: no token provided '});
    }

    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        console.log(decoded)
        if(err){
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;
        next();
    });
};
module.exports = { verifyToken };