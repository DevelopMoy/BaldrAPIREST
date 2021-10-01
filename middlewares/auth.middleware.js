const jsonwebtoken = require('jsonwebtoken');
const mysql = require('mysql');
const databaseHlprs = require('../helpers/database.helper');

const isAnalyst = async (req,res,next)=>{
    const {jwt} = req.body;
    let databaseConnection;

    if (!jwt){
        return res.status(401).json({
            ok: false,
            msg: "Not token provided"
        });
    }else {
        jsonwebtoken.verify(jwt,process.env.MASTER_KEY,(err,decoded)=>{
            if (err){
                return res.status(401).json({
                    ok: false,
                    msg: "Not authorized"
                });
            }else {
                const uid=decoded.uid
                databaseConnection = databaseHlprs.getConnectionDB();
                databaseConnection.query(
                    'SELECT status FROM analista WHERE uid = ?',
                    [uid],
                    (error,results,fields)=>{
                        if (error){
                            return res.status(500).json({
                                ok:false,
                                msg: "Error at database"
                            });
                        }else{
                            if (results[0]&&results[0].status===1){ // VALID USER
                                next();
                            }else {
                                return res.status(401).json({
                                    ok: false,
                                    msg: "Not authorized"
                                });
                            }
                        }
                    }
                );
            }
        });
    }
}

module.exports = {
    isAnalyst
}
