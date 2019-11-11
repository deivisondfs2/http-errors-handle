const errorMaping = require('./src/util/errorMaping');

module.exports = httpErrorsHandle = async (request, customMessage = null) => {
    try {
        const response = await request;
        return response;
    } catch (error) {
        throw errorMaping[error.response.status](customMessage);
    }
}
