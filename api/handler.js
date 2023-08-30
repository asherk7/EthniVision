const express = require('express');
const router = express.Router();
const predSchema = require('./model.js');
const tf = require('@tensorflow/tfjs-node');
const modelPath = 'tfjs_model';

router.get('/', (req, res) => {
    res.send('Backend for EthniVision, go to localhost:3000 to see the actual app');
});

router.post('/upload',  async(req, res) => {
    const imageData = req.body.base64;
    const base64Data = imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const imageTensor = tf.node.decodeImage(imageBuffer, 3);
    const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);
    const normalizedImageTensor = resizedImageTensor.div(255.0);
    const processedImageTensor = normalizedImageTensor.expandDims(0);
    const tfTensor = tf.cast(processedImageTensor, 'float32');

    const model = await tf.loadLayersModel(`file://${modelPath}/model.json`)  
    const predictions = await model.predict(tfTensor).data();    
    
    const predAge = predictions[0]
    const predGender = predictions[1]
    const predEthnicity = predictions[2]

    predictions = {
        age: predAge,
        gender: predGender,
        ethnicity: predEthnicity
    }
    try{
        await predSchema.findOneAndUpdate({}, {predictions: predictions}, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        });
        res.send({status: "ok"});
    } catch(err) {
        res.send({status: err});
    }
});

router.get('/getPrediction', async(req, res) => {
    try{
        const count = await predSchema.countDocuments();
        if (count > 0) {
            const data = await predSchema.find({});
            res.send({status:"ok", data:data});
        }
    } catch(err){
        res.send({status: err})
    }
});

router.get('/reset', async(req, res) => {
    try{
        await predSchema.deleteMany({});
        res.send({status: "ok"});
    } catch(err) {
        res.send({status: err});
    }
});

module.exports = router;
