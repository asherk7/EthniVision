const express = require('express');
const router = express.Router();
const ethnicitySchema = require('./model.js');
const tf = require('@tensorflow/tfjs');
const model_path = '../ml/models/1/ML_model.pb';

router.get('/', (req, res) => {
    res.send('Backend for EthniVision, go to localhost:3000 to see the actual app');
});

router.post('/upload',  async(req, res) => {
    const imageData = req.body.base64;
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    //const imageTensor = tf.node.decodeImage(imageBuffer);
    //process imageTensor, resize, etc.
    //const ML_model = await tf.loadGraphModel(model_path);
    //const prediction = await ML_model.predict(imageTensor).data();    
    
    const pred_Ethnicity = "Ethnicity"
    try{
        await ethnicitySchema.findOneAndUpdate({}, {ethnicity: pred_Ethnicity}, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        });
        res.send({status: "ok"});
    } catch(err) {
        res.send({status: err});
    }
});

router.get('/getEthnicity', async(req, res) => {
    try{
        const count = await ethnicitySchema.countDocuments();
        if (count > 0) {
            const data = await ethnicitySchema.find({});
            res.send({status:"ok", data:data});
        }
    } catch(err){
        res.send({status: err})
    }
});

router.get('/reset', async(req, res) => {
    try{
        await ethnicitySchema.deleteMany({});
        res.send({status: "ok"});
    } catch(err) {
        res.send({status: err});
    }
});

module.exports = router;
