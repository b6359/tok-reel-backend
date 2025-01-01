const headers = { 'x-api-version': "0.0.3", "Access-Control-Allow-Origin": "*" };
const isBase64Encoded = false;

const Responses = {
    _200(data = {}) {
        return {
            message: 'Successfully!',
            data: data
        };
    },

    _400(error) {
        return {
            message: error.message,
        };
    },
    _404(error = {}) {
        return {
            message: error.message
        };
    },
};

module.exports = Responses;