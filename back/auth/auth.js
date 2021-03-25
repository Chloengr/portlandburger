const jwt = require('jsonwebtoken')

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

exports.checkTokenMiddleware = checkTokenMiddleware;
exports.generateAccessToken = generateAccessToken;
exports.decodeToken = decodeToken;