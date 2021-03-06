const checkDateWithTolerance = (dateName,tolerance)=>{ // Will check if "date" is in the interval of tolerance the value of today
                                // Tolerance is in days
    return async (req,res,next)=>{
        tolerance = parseInt(tolerance);
        try{
            const date = req.body[dateName];
            const clientDate = new Date(date);
            const todayDate = new Date();
            todayDate.setDate(todayDate.getDate() + tolerance);
            if (clientDate>todayDate){
                throw new Error("Error, tolerance exceeded");
            }
            todayDate.setDate(todayDate.getDate()-tolerance*2);
            if (clientDate<todayDate){
                throw new Error("Error, tolerance exceeded");
            }
            next();
        }catch (errorExc){
            return res.status(400).json({
                msg: "Error at checking dates, exceeds maximum time tolerance, Value provided by client -> "+req.body[dateName],
                ok: false
            });
        }
    }
}

const checkDateToleranceBefore = (dateName,tolerance)=>{
    // WILL CHECK IF THE DATE IS MINOR THAN TODAYS DATE, AND ALSO IF IT IS GREATER THAN TODAY - TOLERANCE DAY
    return async (req,res,next)=>{
        tolerance = parseInt(tolerance);
        try{
            const date = req.body[dateName];
            const clientDate = new Date(date);
            const todayDate = new Date();

            if (clientDate>todayDate){
                throw new Error("Error, provided date can not exceed today's date, tolerance exceeded");
            }else{
                todayDate.setDate(todayDate.getDate() - tolerance);
                if (clientDate <= todayDate){
                    throw new Error("Error, tolerance exceeded");
                }
            }
            next();
        }catch (errorExc){
            return res.status(400).json({
                msg: "Error at checking dates, exceeds maximum time tolerance, Value provided by client -> "+req.body[dateName]+" in "+dateName,
                ok: false
            });
        }
    }
}

const isValidDateTime = (dateName)=>{
    return async (req,res,next)=>{
        const date = req.body[dateName];
        console.log(req.body);
        console.log(dateName);
        const dateValid = new Date(date);
        if (!isNaN(dateValid.getTime())){
            next();
        }else{
            return res.status(400).json({
                msg:"Datetime provided in bad format, value provided: "+date,
                ok: false
            });
        }
    }
}

module.exports = {
    checkDateWithTolerance,
    isValidDateTime,
    checkDateToleranceBefore
}
