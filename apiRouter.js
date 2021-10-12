//imports
var express = require('express');
var usersCtrl = require('./routes/usersCtrl');
var teamCtrl = require('./routes/teamCtrl');

//routes
exports.router = ( function() {
    var apiRouter = express.Router();

    //user routes
    apiRouter.route('/users/register/').post(usersCtrl.register);
    apiRouter.route('/users/login/').post(usersCtrl.login);
    apiRouter.route('/users/me/').get(usersCtrl.getUserProfil);
    apiRouter.route('/users/').get(usersCtrl.getAllUsers);
    apiRouter.route('/users/delete/').delete(usersCtrl.deleteUsers)
    //Team routes
    apiRouter.route('/teams/').get(teamCtrl.getAllTeam);
    return apiRouter;
}
)();