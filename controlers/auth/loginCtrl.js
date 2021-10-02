let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let session = require('express-session');

app.set('view engine', 'ejs');
app.use(session({
    secret: "ma session",
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
 }));
let User = require('../../models/User');
let user = new User("User");
module.exports = (req, res) => {
    //params
    let login = req.body.login.trim();
    let password = req.body.password.trim();
    if(login === "" || password === "") {
        return res.status = 400;
    }
    user.findBy({login, password}, (result) => {
        if(result.length === 1) {
            user.hydrate(result[0]);
            if(user.roleId == 1)
                res.render('admin/home');
            else {
                res.render('director/home');
            }
        }
        else {
            res.redirect('/');
        }
    });


}