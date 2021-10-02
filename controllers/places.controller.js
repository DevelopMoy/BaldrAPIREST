const mysql = require('mysql');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const databaseHlprs = require('../helpers/database.helper');


const createPlace = async (req,res)=>{
    const {longitud,latitud,descripcion,centroUUID} = req.body;
    const connection = databaseHlprs.getConnectionDB();
    const uid= uuid.v4();
    connection.query("INSERT INTO lugar (uid,latitud,longitud,descripcion,centro_uid) VALUES (?,?,?,?,?)",
        [uid,latitud,longitud,descripcion,centroUUID],
        (error,results,fields)=>{
            if (error){
                return res.status(400).json({
                    ok: false,
                    msg: "Check query data, if problem persists, report to an admin"
                });
            }else{
                return res.status(200).json({
                    ok: true,
                    msg: "Succesfully created",
                    uid
                });
            }
        }
    );
    connection.end();
}

const veriffyPlace = async (req,res)=>{
    const {placeUUID} = req.body;
    try {
        const connection = databaseHlprs.getConnectionDB();
        connection.query("SELECT latitud,longitud,descripcion,centro FROM VIEW_lugarCentro WHERE lugarUUID=?",[placeUUID],
            (error,results,fields)=>{
                if (error){
                    return res.status(500).json({
                        ok: false,
                        msg: error
                    });
                }else{
                    if (results[0]&&results[0].latitud){
                        return res.status(200).json({
                            ok: true,
                            results: results[0]
                        });
                    }else{
                        return res.status(400).json({
                            ok: false,
                            msg: "Bad request"
                        });
                    }
                }
            }
        );
        connection.end();
    }catch (error){
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
}

const createCenter = async (req,res)=>{
    const {name} = req.body;
    const connection = databaseHlprs.getConnectionDB();
    const uid = uuid.v4();
    connection.query("INSERT INTO centro (uid,nombre) VALUES (?,?)",[uid,name],(error,results,fields)=>{
        if (error){
            return res.status(500).json({
                ok: false,
                msg: "Error at updating in database"
            });
        }else {
            return res.status(200).json({
               ok: true,
               msg: "Succesfully created",
               uid
            });
        }
    });
    connection.end();
}

module.exports = {
    createPlace,
    veriffyPlace,
    createCenter
}
