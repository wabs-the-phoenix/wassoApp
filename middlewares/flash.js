module.exports = (req, res, next) => {
    

    req.flash = function (type, content)  {
        if(req.session.flash === undefined) {
            req.session.flash = {};
            console.log(req.session);  
        }
        req.session.flash[type] = content;
    }
    next();
}