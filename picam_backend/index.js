const bodyParser = require("body-parser");
const express = require('express');
const fs = require('fs');
const app = express();
const axios = require('axios')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/videos/', express.static('/videos'))

// ADD THIS
var cors = require('cors');
app.use(cors());

app.get('/api/config', (req, res) => {

    fs.readFile('config.json', 'utf8', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        res.json(obj)
    });
});

app.post('/api/config', (req, res) => {
    console.log(req.body)
    fs.writeFile("config.json", JSON.stringify(req.body), function (err) {
        if (err) {
            return console.log(err);
        } else {
            res.json({ status: "ok" })
        }
    });
});

app.get('/api/videos', (req, res) => {

    let structure = [];

    fs.readdir("/videos", (err, files) => {
        console.log(err)
        files.forEach(file => {

            let splitter = "";
            splitter = file.split("-");

            let shotnumber = "undefined";

            if (splitter.length === 9) {
                shotnumber = Number(splitter[8].split(".")[0])
            }

            structure.push({
                filename: file,
                date: splitter[0] + "/" + splitter[1] + "/" + splitter[2],
                time: splitter[3].substring(0, 2) + ":" + splitter[3].substring(2, 4) + ":" + splitter[3].substring(4, 6),
                fps: splitter[4],
                length: splitter[5],
                slowdown: splitter[6],
                shotnumber: shotnumber,
                name: splitter[7].split(".")[0],
            })

            console.log(structure)
        });

        res.json(structure)
    });
});

app.get('/api/takevideo', (req, res) => {

    let loadedConfig = {};
    let finalConfig = [];

    fs.readFile('config.json', 'utf8', function (err, data) {
        if (err) throw err;
        loadedConfig = JSON.parse(data);

        console.log(loadedConfig)
        let counter = 0;
        loadedConfig.forEach(element => {

            console.log(element.includedforrecording)
            console.log(typeof element.includedforrecording)
            if (element.includedforrecording === true) {
                finalConfig.push(loadedConfig[counter])
            }
            counter++;
        });

        finalConfig.forEach(element => {

            //Call the API on the camera module, to begin the recording
            let path = "http://" + element.ip + ":5000" + "/api/video";
            console.log(path)
            axios.post(path, element).then(res => {

                console.log("Succesfully called " + element.ip)
            }).catch(err => {
                console.log(err.code + " for " + element.ip)
            })
        });

        console.log(finalConfig)
        res.json({ status: "ok" })
    });
});

app.post('/api/uploadvideo', upload.single('video'), (req, res) => {

    console.log(req.file)
    console.log("Moving file to " + "/videos/" + req.file.originalname)

    fs.renameSync(req.file.path, "./videos/" + req.file.originalname)
    
    res.json({ status: "ok" })
});


app.listen(3000, () => console.log('PiCam listening on port 3000!'));


