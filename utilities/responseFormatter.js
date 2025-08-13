let responseFormatter = {};

responseFormatter.created = async (order) => {
    let response = {};
    response.primaryContactId = order.id;
    response.emails = [order.email];
    response.phoneNumbers = [order.phoneNumber];
    response.secondaryContactIds = [];
    console.log(response);
    return {contact: response};
}

module.exports = responseFormatter;