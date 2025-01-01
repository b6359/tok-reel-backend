const crypto = require('crypto');
const { uuid } = require('uuidv4');
const secret = require('../config/secrets.json');
var CryptoJS = require("crypto-js");
const nodemailer = require('nodemailer');

module.exports = {

    CheckParameterValid: (jsonObj, check_keys, callback) => {

        var is_valid = true;
        var missing_parameter = "";
        check_keys.forEach((key, indexOf) => {
            if (!Object.prototype.hasOwnProperty.call(jsonObj, key)) {
                is_valid = false;
                missing_parameter += key + " ";
            }
        });
        if (!is_valid) {

            throw new HTTPError(422, "Missing parameter (" + missing_parameter + ")")

        } else {
            return callback();
        }
    },

    CheckParameterValid_Socket: (client, name, jsonObj, check_keys, callback) => {
        var is_valid = true;
        var missing_parameter = "";
        check_keys.forEach((key, indexOf) => {
            if (!Object.prototype.hasOwnProperty.call(jsonObj, key)) {
                is_valid = false;
                missing_parameter += key + " ";
            }
        });
        if (!is_valid) {

            if (!app_debug_mode) {
                missing_parameter = "";
            }

            client.emit(name, {
                "success": "false",
                "status": 0,
                "message": "Missing parameter (" + missing_parameter + ")"
            })
        } else {
            return callback();
        }
    },



    remove_key_from_array: (arr, remove_key) => {
        for (var i = remove_key.length - 1; i >= 0; i--) {
            delete arr[remove_key[i]];
        }
    },

    create_request_token: () => {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = 20; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        result = result + server_datetime('YYYYMMDDHHmmssms');
        //Dlog ("Token :- "+ result );
        return result;
    },

    image_name_genrate: () => {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = 10; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return server_datetime('YYYYMMDDHHmmssms') + result + '.jpg';
    },

    file_name_generate: (extions) => {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = 10; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return server_datetime('YYYYMMDDHHmmssms') + result + '.' + extions;
    },

    HTTPError: (statusCode, message) => {
        return new HTTPError(statusCode, message);
    },

    Dlog: (log) => {
        return Dlog(log);
    },

    getHashedPassword: (password) => {
        return getHashedPassword(password);
    },
    generateAuthToken: () => {
        return generateAuthToken();
    },
    sendMail: (data) => {
        return sendMails(data);
    },
    catchError: (err) => {
        return {
            statusCode: err.statusCode || 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: err.message || 'Could not fetch the Data.' })
        }
    },
    uploadFile: async (data) => {

        if (secret.IMGUPLOAD == "true") {

            // const base64Data = new Buffer.from(data.replace(/^data:(image|text)\/\w+;base64,/, ""), 'base64');

            // // Getting the file type, ie: jpeg, png or gif
            // const type = data.split(';')[0].split('/')[1];

            // var s3Params_logo = {
            //     Bucket: 'cisspuploads',
            //     Key: uuid() + '.' + (type == "plain" ? 'txt' : type),
            //     Body: base64Data,
            //     ContentEncoding: 'base64',
            //     ACL: 'public-read'
            // };

            // const img = await s3.upload(s3Params_logo).promise();
            // return img.Location;
            return data;
        } else {
            return data;
        }
    },
    groupBy: (array, key) => {
        // Return the end result
        return array.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    },
    deleteUser: async (data) => {
        try {
            // const cognito = new AWS.CognitoIdentityServiceProvider();

            // return await cognito.adminDeleteUser({
            //     UserPoolId: process.env.USER_POOL_ID,
            //     Username: data,
            // }).promise();
        } catch (ex) {
            return ex;
        }
    },
    decryptRequest: (data) => {
        return decryptRequest(data);
    },
    encryptPassword: (data) => {
        return encryptPassword(data);
    },
    decryptPassword: (data) => {
        return decryptPassword(data);
    },
    decryptUri: (data) => {
        return decryptUri(data);
    },
    decodeImage: (data) => {
        return decodeImage(data);
    },
};


function Dlog(log) {
    if (app_debug_mode) {
        console.log(log)
    }
}

function HTTPError(statusCode, message) {
    const error = new Error(message)
    error.statusCode = statusCode
    return error
}

function getHashedPassword(password) {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

function generateAuthToken() {
    return crypto.randomBytes(30).toString('hex');
}

async function sendMails(data) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: secret.FROM_EMAIL,
            pass: secret.EMAIL_SECRET,
        },
    });

    const mailOptions = {
        from: secret.FROM_EMAIL,
        to: data.to,
        subject: data.subject,
        html: data.text,
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };

    } catch (error) {
        console.error('Error sending email:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error sending email' }),
        };
    }

}
function decryptRequest(data) {
    var bytes = CryptoJS.AES.decrypt(data, secret.ENC_SECRET);
    // let ddd = {
    //     "email": "yashatestfirst@gmail.com"
    // }
    // var bytes2 = CryptoJS.AES.encrypt(JSON.stringify(ddd), secret.ENC_SECRET);
    // var xyz = bytes2.toString();
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
function decryptPassword(data) {
    var bytes = CryptoJS.AES.decrypt(data, secret.ENC_SECRET);
    return bytes.toString(CryptoJS.enc.Utf8)//JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
function encryptPassword(text) {
    return CryptoJS.MD5(text).toString();
    // return CryptoJS.AES.encrypt(text, secret.ENC_SECRET).toString();
}
function decryptUri(cipherText) {
    var reb64 = CryptoJS.enc.Hex.parse(cipherText);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, secret.ENC_SECRET);
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;
}
function decodeImage(data) {
    const decoded = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(data)));
    return decoded;
}