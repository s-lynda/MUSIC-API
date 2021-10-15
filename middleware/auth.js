const User = require("../models/user"),
    jwt = require("jsonwebtoken");
module.exports = {
isLoggedIn: async (req, res, next) => {
        if (!req.headers.authorization) return res.status(400).send(" Sorry !!! You don't have the authorization");
        const token = req.headers.authorization.replace("Bearer ", "");
        try {
            let payload = jwt.verify(token, process.env.SECRET_KEY);
            //select({ password: 0 }) =====bach ki n'afficher maybaynche le password 
            //Payload==DATA 
            req.user = await User.findById(payload.id).select({ password: 0 });
           next();
        } catch (e) {
            switch (e.constructor) {
                case jwt.TokenExpiredError:
                    return res.status(401).send("this token has been expired");
                case jwt.JsonWebTokenError:
                    return res.status(401).send("unvalid token ");
            }
        }        	

    },
 isArtist: async function (req, res, next) {
    if (!req.user.isArtist) return res.status(403).send("user is not an Artist");
    next();
},
};