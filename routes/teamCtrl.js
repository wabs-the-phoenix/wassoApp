var models = require('../models');

module.exports = {
    getAllTeam : (req, res) => {
        let headerAuth = req.headers['authorization'];
        let userId = jwt.getUserId(headerAuth);
        if(userId < 1) {
            return res.status(400, `Probleme d'authentification`);
        }
        models.Team.findAll()
        .then((teams) => {
            let teamsList = [];
            for (let i = 0; i < teamsList.length; i++) {
                const element = teamsList[i];
                let item = {
                    id: element.id,
                    userName: element.name,
                    createdAt: element.dataValues.createdAt
                }
                teamsList.push(item);
                teamsList.reverse();
                return res.status(200).json(teamsList);
            }
        })
        .catch((error)=> {
            return res.status(404).json({'error': 'equipes non trouvee'});
        });

    }
}