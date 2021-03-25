const jwt = require('jsonwebtoken')
const db = require('../models');
/* Récupération du header bearer */
const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
    // Récupération du token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)

    // Présence d'un token
    if (!token) {
        return res.status(401).json({ message: 'Error. Need a token' })
    }

    // Véracité du token
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({ message: 'Error. Bad token' })
        } else {
            return next()
        }
    })
}
function generateAccessToken(username) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign({username:username}, process.env.TOKEN_SECRET,  { expiresIn: '3 hours' });
  }

function decodeToken(token){
    const decoded = jwt.verify(token,process.env.TOKEN_SECRET);
    
    return decoded;
}
const isAdminUser = async (req, res, next) => {
    var token = req.headers.authorization.split(' ')[1];
    const decodedToken = decodeToken(token);
    const user = await db.User.findOne({ where: { username: decodedToken.username } });
    if(user.role === 'ADMIN'){
        next();
    }else{
        res.status(401).json({ message: 'Error. You dont have permission to do this' });
    }
}
exports.checkTokenMiddleware = checkTokenMiddleware;
exports.generateAccessToken = generateAccessToken;
exports.decodeToken = decodeToken;
exports.isAdminUser = isAdminUser;