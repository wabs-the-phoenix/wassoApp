let jwt = require('jsonwebtoken');

const JWT_TOKEN = "mADARAh4SHIRMAN@aruto8945Pjc@@@@5842211$$$$%";
module.exports = {
    generateTokenForUser: (userData) => {
        return jwt.sign({
            userId: userData.id,
            roleId: userData.roleId
        },
        JWT_TOKEN,
        {
            expiresIn: '1h'
        })
    
    },
    parseAuthorization: (auth) => {
        return (auth != null) ? auth.replace('Bearer ', '') : null;
    },
    getUserId : (auth) => {
        var userId = -1;
        let token = module.exports.parseAuthorization(auth);
        if(token != null) {
            try {
                let jwtToken = jwt.verify(token, JWT_TOKEN);
                if(jwtToken != null) {
                    userId = jwtToken.userId;
                }
            } catch (error) {
                console.log(error);
            }
            return userId;
        }
    }
}