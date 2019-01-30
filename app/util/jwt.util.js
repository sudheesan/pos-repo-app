const jwt = require('jsonwebtoken');
const credentils = require('../util/const.util');
const config = require('../../config/sectret.config')

const token = jwt.sign({id:credentils.userId},config.secret,{expiresIn: 86400});

module.exports = {
    xAuthToken :token
}