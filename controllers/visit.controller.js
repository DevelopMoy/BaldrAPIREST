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

const saveExitTime = async (req,res)=>{
    const {exitTime,visitUID} = req.body;
    const toleranceHours = 14; // Maximum hours that a user can be in a place
    const errorMsg = {
        msg: "Error at updating visit, check if arguments are properly provided, if error persists please notiffy to our team, error code #53334c. ",
        ok:false
    };
    try {
        const connection = databaseHlprs.getConnectionDB();
        connection.query("UPDATE visita SET salida = ? WHERE uid = ? AND entrada < ? AND DATE(?) < ADDTIME (entrada,'14:00:00')",
            [
                exitTime,visitUID,exitTime,exitTime
            ],
            (error,results,fields)=>{
                if (error){
                    return res.status(500).json({
                        msg: "Error at executing query, please check provided values",
                        ok: false
                    });
                }else {
                    if (results.affectedRows>0){
                        return res.status(200).json({
                            ok: true,
                            msg: "Exit time Succesfully Updated"
                        })
                    }else{
                        return res.status(400).json({
                          ok: false,
                          msg: "Bad arguments provided, exit time exceeds entrance time or exit time is not greater than entrance time."
                        })
                    }
                }
            }
        )
        connection.end();
    }catch (exception){
        return res.status(500).json(errorMsg);
    }
}

module.exports = {
    createVisit,
    saveExitTime
}
