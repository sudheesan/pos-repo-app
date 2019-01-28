module.exports = (app) => {
    const auth = require('../contrtollers/login.contrtoller');

    // login to app
    app.post('/login', auth.login);
}