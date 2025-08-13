const order = require('../models/orders');

let responseFormatter = {};

responseFormatter.created = async (orders) => {
    let response = {};
    response.primaryContactId = orders.id;
    response.emails = [orders.email];
    response.phoneNumbers = [orders.phoneNumber];
    response.secondaryContactIds = [];
    return {contact: response};
}

responseFormatter.secondaryCreated = async (primary) => {
    let response = {};
    response.primaryContactId = primary.id;
    const related = await order.find({linkedId: primary.id});
    response.emails = [...new Set([primary.email, ...related.map((r) => r.email)].filter(Boolean))],
    response.phoneNumbers = [...new Set([primary.phoneNumber, ...related.map((r) => r.phoneNumber)].filter(Boolean))],
    response.secondaryContactIds = related.map(r => r.id);
    return {contact: response}
}

responseFormatter.changeState = async (primary, orders) => {
    let response = {};
    responseFormatter.primaryContactId = primary.id;
    response.emails = [...new Set([primary.email, ...orders.map((o) => o.email)].filter(Boolean))],
    response.phoneNumbers = [...new Set([primary.phoneNumber, ...orders.map((o) => o.phoneNumber)].filter(Boolean))],
    response.secondaryContactIds = orders.map((o) => o.id);
    return {contact: response};
}

module.exports = responseFormatter;