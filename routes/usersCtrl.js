var bcrypt = require('bcrypt');
var jwt = require('../utils/jwt.utils');
var models = require('../models');

//Routes
module.exports = {
    register: function(req, res) {
        //params
        const email = req.body.email;
        const userName = req.body.userName;
        const password = req.body.password;
        const roleId = req.body.roleId;
        const login = req.body.email;

        if(email == null || userName == null || password == null || roleId == null || login == null) {
            return res.status(400).json("{'error': 'Parametres manquant'}");
        }
        if(userName >= 16 || userName <= 3) {
            return res.status(400).json({'error': 'taille utilisateur incorrect'});
        }
        
        // A faire: verifier la validite des donnees entrees
        models.User.findOne({ attributes : ['email'], where : {email : email}})
        .then((userFound) => {
            if(!userFound) {
               bcrypt.hash(password, 5, (err, hashedPass) => {
                let newUser = models.User.create({
                   email: email,
                   login: login,
                   password: hashedPass,
                   roleId: roleId,
                   userName : userName
                })
                .then((newUser) => {
                    
                    return res.status(201).json({
                        'userId' : newUser.id});
                }) 
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json({'error': "probleme a la creation" });
                });
               });
            }
            else {
                return res.status(409).json({'error' : "utilisateur existant"});
            }
        })
        .catch((err) => {
            return res.status(500).json({'error': "erreur serveur" });
        });

         
    },
    login: function(req, res) {
        let login = req.body.login;
        let password = req.body.password;
        if(login == null || password == null) {
            return res.status(400).json("{'error': 'Parametres manquant'}");
        }

        models.User.findOne({  where : {login : login}})
        .then((userFound) => {
            if( userFound) {
                
               bcrypt.compare(password, userFound.password, function(err, resBcrypt) {
                   
                   if(resBcrypt) {
                        return res.status(200).json({
                            'userId': userFound.id,
                            'token': jwt.generateTokenForUser(userFound)
                        });
                   }else {
                        return res.status(403).json({'error': 'mot de passe non conforme'});
                   }
               });
               
            }
            else {
                return res.status(404).json({'error' : "utilisateur inexistant"});
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({'error': "impossible d'enregistrer un utilisateur" });
        });
    },
    getUserProfil: function(req, res) {
        let headerAuth = req.headers['authorization'];
        let userId = jwt.getUserId(headerAuth);
        if(userId < 1) {
            return res.status(400, `Probleme d'authentification`);
        }
        models.User.findOne({ attributes: ['id', 'userName', 'email', 'createdAt', 'roleId'],
                         where: {id: userId}
        })
        .then((user) => {
            if(user) {
                models.Role.findOne({where: {id : user.roleId}})
                .then((role) => {
                    return res.status(200).json({
                        id: user.id,
                        userName: user.userName,
                        email: user.email,
                        createdAt: user.createdAt,
                        role: role.name
                    });
                })
                .catch((error) => {
                    return res.status(404).json({'error': 'utilisateur non trouve'});
                })
            }
        })
        .catch((error) => {
            return res.status(404).json({'error': 'utilisateur non trouve'});
        }) ;
    },
    getAllUsers: function(req, res) {
        let headerAuth = req.headers['authorization'];
        let userId = jwt.getUserId(headerAuth);
        if(userId < 1) {
            return res.status(400, `Probleme d'authentification`);
        }
        /**
         * TO DO
         * verifier s'il est admin */
        models.User.findAll({ include: models.Role })
        .then((users) => {
            let userList = [];
            for (let i = 0; i < users.length; i++) {
                const element = users[i];
                let item = {
                    id: element.dataValues.id,
                    userName: element.dataValues.userName,
                    email: element.dataValues.email,
                    role: element.dataValues.Role.dataValues.name
                }
                userList.push(item);
               
            }
            userList.reverse();
            return res.status(200).json(userList);
               
        })
        .catch((error)=> {
            return res.status(404).json({'error': 'utilisateur non trouve'});
        });
    },
    addNewUser: function(req, res) {
        let headerAuth = req.headers['authorization'];
        let userId = jwt.getUserId(headerAuth);
        if(userId < 1) {
            return res.status(400, `Probleme d'authentification`);
        }
        models.Role.find({attributes: [`id`, `name`]})
        .then((result) => {
            
        })
        .catch((error) => {

        })
    },
    deleteUsers: (req, res) => {
        let headerAuth = req.headers['authorization'];
        let userId = jwt.getUserId(headerAuth);
        console.log(userId);
        if(userId < 1) {
            return res.status(400, `Probleme d'authentification`);
        }
        models.User.findAll({ include: models.Role })
        .then((user) => {
            console.log(user);
        })
        .catch((error) => {
            console.log(error)
        })
    }
}