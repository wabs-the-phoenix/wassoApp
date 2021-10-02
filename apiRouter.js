//imports
var express = require('express');
var userCtrl = require('./routes/usersCtrl');
var teamCtrl = require('./routes/teamCtrl');

//routes
exports.router = ( function() {
    var apiRouter = express.Router();

    //user routes
    apiRouter.route('/users/register/').post(userCtrl.register);
    apiRouter.route('/users/login/').post(userCtrl.login);
    apiRouter.route('/users/me/').get(userCtrl.getUserProfil);
    apiRouter.route('/users/').get(userCtrl.getAllUsers);
    //Team routes
    apiRouter.route('/teams/').get(teamCtrl.getAllTeam);
    return apiRouter;
}
)();