const mysql = require('mysql2');
const databaseHlprs = require('../helpers/database.helper');
const jwt = require('jsonwebtoken');

const openReport = async (req,res)=>{
    try{
        const connection = databaseHlprs.getConnectionDB();
        const {userJWT,fechaPrueba,fechaSintomas,detalles} = req.body;
        const payload = jwt.verify(userJWT,process.env.MASTER_KEY);
        let userUID;
        userUID = payload.uid;
        connection.query(
            "INSERT INTO reporte (userUID,fechaPrueba,fechaSintomas,fechaRegistro,detalles) VALUES (?,?,?,Now(),?)",
        [userUID,fechaPrueba,fechaSintomas,detalles],
            (err,results,flds)=>{
                if (err){
                    console.log("Error im query: "+err);
                    res.status(400).json({
                        msg: "Bad parameter provided, please check them and try again",
                        ok: false
                    });
                }else{
                    res.status(200).json({
                        msg: "Report uploaded succesfully",
                        ok: true
                    });
                }
            }
        );
        connection.end();

    }catch (exception){
        res.status(500).json({
            msg: "Please check if values are properly provided, if error persists comunicate to an admin",
            ok: false
        });
    }
}

const getRiskByPlace = async (req,res)=>{
    try{
        const {locationUID} = req.body;
        const connection = databaseHlprs.getConnectionDB();

        connection.query("select COUNT(*) AS Total_Visitas_Riesgo, UIDLugar, NombreLugar FROM VIEW_LugaresRiesgoContagio WHERE UIDLugar = ? GROUP BY UIDLugar",
            [locationUID],(err,results,flds)=>{
                if (err){
                    console.log("Error in query: "+err);
                    res.status(400).json({
                        msg: "Bad parameter provided, please check them and try again",
                        ok: false
                    });
                }else{
                    res.status(200).json({
                        msg: "Query executed succesfully",
                        results,
                        ok: true
                    });
                }
            }
        );

        connection.end();

    }catch (exception){
        res.status(500).json({
            msg: "Please check if values are properly provided, if error persists comunicate to an admin",
            ok: false
        });
    }
}

module.exports = {
    openReport,
    getRiskByPlace
}