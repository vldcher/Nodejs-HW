const http = require('http');
const router = require('express').Router();
const Device = require('../models/device');

function sendRequest(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (res) => {
            if (res.statusCode !== 200) {
                reject(res.statusCode)
            } else {
                resolve();
            }
        });
    });
}


function deviceAdapter(device) {
    return {
        id: device._id,
        name: device.name,
        address: device.address,
        port: device.port,
        state: device.state ? 'on' : 'off',
        log: device.log
    }
}

router.get('/', async (req, res) => {
    const devices = await Device.find().exec();
    res.json(devices.map(deviceAdapter));
});

router.get('/:id', async (req, res) => {
    const deviceId = req.params.id;
    const device = await Device.findById(deviceId).exec();

    if (device) {
        res.json(deviceAdapter(device));
    } else {
        res.sendStatus(404);
    }
});

router.post('/', async (req, res) => {
    const deviceData = req.body;
    const device = new Device(deviceData);

    await device.save();

    res.sendStatus(201);
});

router.delete('/:id', async (req, res) => {
    const deviceId = req.params.id;
    
    await Device.findByIdAndDelete(deviceId);

    res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
    const deviceId = req.params.id;
    const deviceData = req.body;

    try {

        const device = await Device.findById(deviceId).exec();
   
        await device.update({
            ...deviceData,
            state: device.state,
            log: device.log
        });

        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    };

});

// logs
router.get('/log/:id', async (req, res) => {
    const deviceId = req.params.id;
    const device = await Device.findById(deviceId, 'log').exec();

    if (device) {
        res.json(device.log);
    } else {
        res.sendStatus(404);
    }
});

router.put('/log/:id', async(req, res) => {
    const deviceId = req.params.id;
    const deviceData = req.body;

    try {
        const device = await Device.findById(deviceId).exec();

        await device.update({
            state: deviceData.state === 'on' ? true : false,
            $push: { "log": 
                        { 
                            "_id": deviceData.state.id,
                            "date": new Date().toUTCString(), 
                            "action": deviceData.state 
                        }
                    }
        });

        const url = `http://${device.address}:${device.port}`;
        const command = device.state ? 'Power off' : 'Power On';

        await sendRequest(`${url}/cm?cmnd=${command}`)
        res.sendStatus(200);
  
    } catch(e) {
        res.sendStatus(404);
    };
});


module.exports = router;