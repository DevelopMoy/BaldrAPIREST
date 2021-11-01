const jwt = require('jsonwebtoken');
const databaseHlprs = require('../helpers/database.helper');

const login = async (req,res)=>{
    const {username,pass} = req.body;
    const connection = databaseHlprs.getConnectionDB();
    connection.query(
        "SELECT uid, status FROM analista WHERE nombreUsuario = ? AND clave = sha(?)",
        [username,pass],
        (error,results,fields)=>{
            if (error||!results[0]||results[0].status===0){
                return res.status(401).json({
                    ok: false,
                    msg: "Unauthorized"
                });
            }else{
                if (results[0].status===1){
                    return res.status(200).json({
                        ok: true,
                        msg: "Succesfully logged in",
                        jswt: jwt.sign({uid: results[0].uid},process.env.MASTER_KEY,{expiresIn: '5h'})
                    });
                }
            }
        }
    )
}

const checkUserToken = async (req,res)=>{
    return res.status(200).json({
        ok: true,
        msg: "Valid user"
    });
}

module.exports = {
    login,
    checkUserToken
}
