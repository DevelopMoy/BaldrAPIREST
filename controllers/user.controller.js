const mysql = require('mysql');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const databaseHlprs = require('../helpers/database.helper');

const getAllUsers = async (req,res)=>{
    const connection = databaseHlprs.getConnectionDB();
    connection.query(
        "SELECT uid, fechaNacimiento FROM usuario",
        (errors,results,fields)=>{
            if (errors){
                return res.status(500).json({
                    ok: false,
                    msg: "Error at server database please notiffy to admin"
                })
            }else{
                return res.status(200).json({
                    ok: true,
                    msg: "Succesfully operation",
                    users: results
                })
            }
        }
    )
}

const createUser = async (req,res)=>{
    const {birthDate}=req.body;
    const uniqueIdentifier = uuid.v4();
    const jsonwt = jwt.sign({
        uid: uniqueIdentifier
    },process.env.MASTER_KEY);
    const connection = databaseHlprs.getConnectionDB();
    connection.connect();
    connection.query('INSERT INTO usuario (uid,fechaNacimiento) VALUES (?,?)',[uniqueIdentifier,birthDate],(error,results,fields)=>{
       if (error){
           console.log(error);
           return res.status(400).json({
               msg: "Error, please check passed arguments",
               ok: false
           });
       }else {
           return res.status(200).json({
               msg: "Successfully created",
               jwt: jsonwt,
               ok: true
           });
       }
    });
    connection.end();
}

module.exports = {
    getAllUsers,
    createUser
}
