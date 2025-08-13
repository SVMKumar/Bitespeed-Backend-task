const identifyService = require('../services/identifyService');

let identifyController = {};

identifyController.getInputs = async (req, res) => {
    try {
        const email = req.body?.email || null;
        const phoneNumber = req.body?.phoneNumber || null;
        console.log(email, phoneNumber);
        const response = await identifyService.identify(email, phoneNumber);
        res.json(response);
    }
    catch (err) {
        console.log(err);
        res.send("Error: " + err.message);
    }
}

module.exports = identifyController;