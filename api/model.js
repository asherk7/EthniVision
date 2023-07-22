const mongoose = require('mongoose');
const ethnicitySchema = new mongoose.Schema(
    {
        ethnicity: String
    },
    {
        collection: "ModelPrediction",
    }
);

module.exports = mongoose.model('Ethnicity', ethnicitySchema);