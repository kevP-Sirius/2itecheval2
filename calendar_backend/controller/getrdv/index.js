const axios = require("axios");
let moduleRoute=async(req,res,ObjectId,db,moment,transporter,hashIt,axios,qs)=>{
    try {
        moment.locale('fr')
        const listRdv = await new Promise(function (resolve, reject) {
            db.collection('rdv').find({}).toArray((err, eventsList) => {
                if (err) {
                    return resolve(false)
                }
                return resolve(eventsList)
            });
        })
    return  res.json({"listRdv":listRdv})
    } catch (e) {
        console.log(e)
    }
}

exports.moduleRoute=moduleRoute