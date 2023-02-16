const axios = require("axios");
let moduleRoute=async(req,res,ObjectId,db,moment,transporter,hashIt,axios,qs)=>{
    try {
        moment.locale('fr')
        const listCommercials = await new Promise(function (resolve, reject) {
            db.collection('commercials').find({}).toArray((err, commercials) => {
                if (err) {
                    return resolve(false)
                }
                return resolve(commercials)
            });
        })
    return  res.json({"listCommercials":listCommercials})
    } catch (e) {
        console.log(e)
    }
}

exports.moduleRoute=moduleRoute