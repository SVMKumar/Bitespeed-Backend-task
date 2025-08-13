const order = require('../models/orders');

const responseFormatter = require('../utilities/responseFormatter');

let identifyService = {};

identifyService.identify = async (email, phoneNumber) => {
    if (!email && !phoneNumber) {
        throw new Error("Email and Phone Number not found");
    }
    let query = {};
    if (email && phoneNumber) {
        query = { $or: [{ email }, { phoneNumber }] };
    }
    else if (email) {
        query = { email };
    }
    else if (phoneNumber) {
        query = { phoneNumber };
    }
    let hits = await order.find(query).sort({ createdAt: 1 });

    if (hits.length === 0) {
        const newOrder = await order.create({ email, phoneNumber });
        return responseFormatter.created(newOrder);
    }
    else {
        const primary = hits.find(c => c.linkPrecedence === 'primary') || hits[0];
        const phoneMatches = phoneNumber ? await order.find({ phoneNumber }) : [];
        const emailMatches = email ? await order.find({ email }) : [];
        let exists = hits.some(c => c.email === email && c.phoneNumber === phoneNumber);
        if (!exists && email && phoneNumber) {
            if (hits.some(c => c.email === email && c.phoneNumber !== phoneNumber) && phoneMatches.length === 0) {
                exists = false;
            }
            if (hits.some(c => c.phoneNumber === phoneNumber && c.email !== email) && emailMatches.length === 0) {
                exists = false;
            }
        }
        const clusterPrimaries = hits.filter(c => c.linkPrecedence === 'primary');
        for (const cp of clusterPrimaries) {
            if (cp.id !== primary.id) {
                await order.updateOne(
                    { id: cp.id },
                    {
                        $set: {
                            linkPrecedence: 'secondary',
                            linkedId: primary.id,
                            updatedAt: new Date()
                        }
                    }
                );
            }
        }
        if (!exists) {
            await order.create({
                email,
                phoneNumber,
                linkPrecedence: 'secondary',
                linkedId: primary.id
            });
            return responseFormatter.secondaryCreated(primary);
        }
    }
    const secondaries = hits.filter(c => c.linkPrecedence === 'secondary');
    return responseFormatter.changeState(primary, secondaries);
}

module.exports = identifyService;