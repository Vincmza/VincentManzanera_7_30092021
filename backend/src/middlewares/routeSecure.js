const connection = require('../service/database');

function routeSecure (table){
        return function (req, res, next){
            const id = req.params["postId"] || req.params["commentId"]
            connection
                .query(`SELECT count(*) as Result from ${table} WHERE user_id = ? AND id = ?`, [req.userId, id ])
                .then((userVerified)=>{
                    const verification = {...userVerified[0]}
                    console.log(verification)
                    if(verification.Result == 1){
                        res.status(200).json("Permission accordée")
                    }
                    else {
                        throw "Permission refusée"
                    }
                    next()
                })
                .catch((error)=>{
                    res.status(400).json(error)
                })
    }

}
module.exports = {routeSecure}