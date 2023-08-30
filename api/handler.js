const express = require('express');
const router = express.Router();
const predSchema = require('./model.js');
const tf = require('@tensorflow/tfjs-node');
const modelPath = 'tfjs_model';

const age_list = ["0-2", "3-9", "10-19", "20-29", "30-39", "40-49", "50-59", "60-69", "more than 70"]
const gender_list = ["Male", "Female"]
const ethnicity_list = ["White", "Black", "Latino_Hispanic", "Asian", "Indian", "Middle Eastern"]

router.get('/', (req, res) => {
    res.send('Backend for EthniVision, go to localhost:3000 to see the actual app');
});

router.post('/upload',  async(req, res) => {
    // Processing the base64 image
    const imageData = req.body.base64;
    const base64Data = imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Transforming the image into a tensor and preprocessing it
    const imageTensor = tf.node.decodeImage(imageBuffer, 3);
    const resizedImageTensor = tf.image.resizeBilinear(imageTensor, [224, 224]);
    const normalizedImageTensor = resizedImageTensor.div(255.0);
    const processedImageTensor = normalizedImageTensor.expandDims(0);
    const tfTensor = tf.cast(processedImageTensor, 'float32');

    // Instantiating the model and making predictions
    const model = await tf.loadLayersModel(`file://${modelPath}/model.json`)  
    const model_predictions = await model.predict(tfTensor);

    // Getting the predictions
    const ageArray = model_predictions[0].arraySync()[0]
    const genderArray = model_predictions[1].arraySync()[0]
    const ethnicityArray = model_predictions[2].arraySync()[0]

    // Mapping the predictions to the actual labels
    const predAge = age_list[ageArray.indexOf(Math.max(...ageArray))]
    const predGender = gender_list[genderArray.indexOf(Math.max(...genderArray))]
    const predEthnicity = ethnicity_list[ethnicityArray.indexOf(Math.max(...ethnicityArray))]

    const predictions = {
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
