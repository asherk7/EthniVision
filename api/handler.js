const express = require('express');
const router = express.Router();
const imgSchema = require('./model.js');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/src/resources/uploads")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/upload', upload.single("image"), async(req, res) => {
    const imageName = req.file.filename;
    try{
        await imgSchema.create({ image: imageName });
        res.json({status: "ok"})
    }
    catch(err){
        res.json({status: "error"})
    }
});

router.get('/getImages', async(req, res) => {
    try{
        imgSchema.find({}).then((data) => {
            res.send({status:"ok", data:data});
        })
    }
    catch(err){
        res.json({status: err})
    }
});

module.exports = router;
