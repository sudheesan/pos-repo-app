const user = require('../util/const.util')
const secret =  require('../util/jwt.util')

exports.login = (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;
    if (userName === user.userName  && password === user.password) {
        res.status(200).send({
            message:  "successfull login",
            auth:{userName:userName,authToken:secret.xAuthToken}
        });
    }else {
        res.status(401).send({
            message: "Incorrect credentials"
        });
    }

}