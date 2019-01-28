

exports.login = (req, res) => {

    const userName = req.body.userName;
    const password = req.body.password;
    if (userName === 'admin' && password === 'admin') {
        res.status(200).send({
            message:  "successfull login",
            auth:{userName:userName,authToken:'abc'}
        });
    }else {
        res.status(401).send({
            message: "Unoatherized access"
        });
    }

}