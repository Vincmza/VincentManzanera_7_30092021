const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createConnection } = require('mysql');

const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

/*User create an account using an email and a password*/
exports.signup = ((req, res, next)=>{
    const data = {...req.body};
    if(schema.validate(req.body.password)){
        bcrypt.hash(req.body.password, 10)
            .then((hash) => {
                data.password = hash;
                connection
                .query("INSERT INTO users SET ?", [data])
                .then((user) => {res.json(user)})
                .catch((error) => {console.log(error)})                
            })
            .catch(error=>(res.status(500).json({error})))
    }else {
        return res.json({message: 'Votre mot de passe ne contient pas les caractères attendus'})
    } 
});