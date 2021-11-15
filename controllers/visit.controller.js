const databaseHlprs = require('../helpers/database.helper');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const {verify} = require("jsonwebtoken");
const {use} = require("express/lib/router");

const createVisit = async (req,res)=>{
    const {userJWT,entrada,lugarUID} = req.body;
    const errorMsg = {
        msg: "Error at creating visit, check if arguments are properly provided, if error persists please notiffy to our team, error code #2334c. ",
        ok:false
    };

    try{
        let visitanteUID;
        const connection = databaseHlprs.getConnectionDB();
        const uid= uuid.v4();
        const payload = jwt.verify(userJWT,process.env.MASTER_KEY);
        visitanteUID = payload.uid;
        connection.query("INSERT INTO visita (uid,visitante_uid,entrada,salida,lugar_uid) VALUES (?,?,?,?,?)",[
            uid,visitanteUID,entrada,entrada,lugarUID
        ],(error,result,fields)=>{
            if (error){
                return res.status(500).json(errorMsg);
            }else{
                return res.status(200).json({
                    msg:"Visit saved in database",
                    time: entrada,
                    visitUID: uid,
                    ok: true
                });
            }
        });
        connection.end();
    }catch (exc){
        return res.status(500).json(errorMsg);
    }
}

const saveExitTime = ()=>{

}

module.exports = {
    createVisit,
    saveExitTime
}
