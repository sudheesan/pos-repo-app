const jwt = require('jsonwebtoken');
const credentils = require('../util/const.util');
const config = require('../../config/sectret.config')

module.exports = {
    xAuthToken : jwt.sign({id:credentils.userId},config.secret,{expiresIn: 86400})
}