const jwt = require("jsonwebtoken");
require("dotenv").config();

/*Check if user is authentified because of the token*/
module.exports = (req, res, next) => {
    console.log("voilà :", req.body)
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.secretToken);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            return res.status(401).json({ message: "Utilisateur inconnu" });
        }
        next();
    } catch (error) {
        res.status(401).json({ message: "Requête non authentifiée !" });
    }
};