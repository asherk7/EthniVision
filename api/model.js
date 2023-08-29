const mongoose = require('mongoose');
const predictionSchema = new mongoose.Schema(
    {
        prediction: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        collection: "ModelPrediction",
    }
);

module.exports = mongoose.model('Prediction', predictionSchema);