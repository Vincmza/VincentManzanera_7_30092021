const jwt = require("jsonwebtoken");
require("dotenv").config();

/*Check if user is authentified because of the token*/
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.secretToken);
        req.userId = decodedToken.userId
        req.roleId = decodedToken.roleId
        next();
    } catch (error) {
        res.status(401).json({ message: "Requête non authentifiée !" });
    }
};