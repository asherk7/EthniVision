const mongoose = require('mongoose');
const imageSchema = new mongoose.Schema(
    {
        image: String
    },
    {
        collection: "ImageDetails",
    }
);

module.exports = mongoose.model('Image', imageSchema);