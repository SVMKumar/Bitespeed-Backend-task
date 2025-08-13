const order = require('../models/orders');

const responseFormatter = require('../utilities/responseFormatter');

let identifyService = {};

identifyService.identify = async (email, phoneNumber) => {
    if (!email && !phoneNumber) {
        throw new Error("Email and Phone Number not found");
    }
    let query = {};
    if (email && phoneNumber) {
        query = { $or: [ { email }, { phoneNumber } ] };
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
        return responseFormatter.created(newOrder);
    }
    else {
        const primary = hits.find((c) => c.linkPrecedence === 'primary');
        const exists = hits.some((c) =>(c.email === email && c.phoneNumber === phoneNumber) || (c.email === email && !phoneNumber) || (c.phoneNumber === phoneNumber && !email));
        if (!exists) {
            const newOrder = await order.create({email, phoneNumber, linkPrecedence: 'secondary', linkedId: primary.id});
            return responseFormatter.secondaryCreated(primary);
        }
    }
}

module.exports = identifyService;