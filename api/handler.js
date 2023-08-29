const express = require('express');
const router = express.Router();
const predSchema = require('./model.js');
const tf = require('@tensorflow/tfjs-node');
const model_path = '../ml/models';

router.get('/', (req, res) => {
    res.send('Backend for EthniVision, go to localhost:3000 to see the actual app');
});

router.post('/upload',  async(req, res) => {
    const imageData = req.body.base64;
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    const imageTensor = tf.node.decodeImage(imageBuffer);
    const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);
    const processedImageTensor = resizedImageTensor.expandDims(0);

    const model = await tf.loadGraphModel(`file://${modelPath}/saved_model.pb`, {
        weightManifest: `file://${modelPath}/keras_metadata.pb`,
    });
    const predictions = await model.predict(processedImageTensor).data();    
    
    const predAge = Array.from(predictions[0].dataSync());
    const predGender = Array.from(predictions[1].dataSync());
    const predEthnicity = Array.from(predictions[2].dataSync());

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
