const jwt = require('jsonwebtoken')

let sessionName = 'sessionStorage'
let secret = 'asdkamsioj321hj01jpdomasdx]c[;zc-3-='

const authMiddleware = async(token) => {
    if (token) {
        try {
            let decodedToken = jwt.verify(token, secret)

            return decodedToken
        } catch (error) {
            return {message: "Invalid access token!"}
        }
    }
}

function authMiddlewareCheck(req, res, next) {
    let token = req.headers.authorization

    if(!token || token === '') {
        return res.status(401).send('Unauthorized request')
    }
    
    let payload = jwt.verify(token, secret)
    if(!payload) {
        return res.status(401).send('Unauthorized request')
    }

    next()
}

module.exports = {
    authMiddleware,
    authMiddlewareCheck
}