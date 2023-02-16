const axios = require("axios");
let moduleRoute=async(req,res,ObjectId,db,moment,transporter,hashIt,axios,qs)=>{
    try {
        // { $set: { [`${columnName}`] : req.body.newData } };
        moment.locale('fr')
        const insertRdv = await new Promise(function (resolve, reject) {
            db.collection('rdv').insertOne( {
               ...req.body
            },(err, user) => {
                if (err) {
                    return console.log('Unable to fetch')
                }
                resolve(true)

            } );
        })
        if(insertRdv){
            res.json({status:201,message:'Rdv added'})
        }
        if(!insertRdv){
            res.json({status:500,message:'Rdv not added'})
        }
    } catch (e) {
        console.log(e)
    }
}

exports.moduleRoute=moduleRoute