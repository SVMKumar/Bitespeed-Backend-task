const order = require('../models/orders');

const responseFormatter = require('../utilities/responseFormatter');

let identifyService = {};

identifyService.identify = async (email, phoneNumber) => {
    if (!email && !phoneNumber) {
        throw new Error("Email and Phone Number not found");
    }
    let query = {};
    if (email && phoneNumber) {
        query = {email, phoneNumber};
    }
    else if (email) {
        query = {email};
    }
    else if (phoneNumber) {
        query = {phoneNumber};
    }
    let hits = await order.find(query).sort({createdAt: 1});

    if (hits.length === 0) {
        const newOrder = await order.create({email, phoneNumber});
        console.log(newOrder);
        return responseFormatter.created(newOrder);
    }
}

module.exports = identifyService;