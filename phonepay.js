var express = require('express');
const axios = require("axios");
var phonepay = express();
const uniqid = require("uniqid");

const PHONE_PE_HOST_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
const MERCHANT_ID = "PGTESTPAYUAT";
const SALT_INDEX = 1;
CONST_KEY = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
phonepay.get('/', function (req, res) {
    res.send('hello bro');
});

phonepay.get('/pay', function (req, res) {
    const payEndpoint = "/pg/v1/pay";
    const merchantTransactionId = uniqid();
    const userId = 123;
    const payload = {

        "merchantId": MERCHANT_ID,
        "merchantTransactionId": " merchantTransactionId",
        "merchantUserId": "userid",
        "amount": 10000,
        "redirectUrl": "http://localhost:5000/redirect-url/${merchantTransactionId}",
        "redirectMode": "REDIRECT",
        "mobileNumber": "9999999999",
        "paymentInstrument": {
        "type": "PAY_PAGE",


        },
    };
    const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
    const base63Encodedpayload = bufferObj.tostring("base64");
    const xverify = sha256(base63Encodedpayload + payEndpoint + SALT_KEY) + "###" + SALT_INDEX;

    const options = {
        method: 'post',
        url: '${PHONE_PE_HOST_URL}${payEndpoint}',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            "X-VERIFY": xverify,
        },
        data: {
            request: base63Encodedpayload,
        },
    };
    axios
        .request(options)
        .then(function (response) {
            console.log(response.data);
            const url = response.data.data.instrumentResponse.redirectInfo.url;
            res.redirect(url)
            // res.send({url})
        })
        .catch(function (error) {
            console.error(error);
        });
});
phonepay.get('/redirect-url/:merchantTransaction', (req, res) => {
    const { merchantTransactionId } = req.params;
    console.log("merchantTransactionId", merchantTransactionId);
    if (merchantTransactionId) {
        // SHA256(“/pg/v1/status/{merchantId}/{merchantTransactionId}” + saltKey) + “###” + saltIndex
        const xverify = sha256('/pg/v1/status/${{MERCHANT_ID}/${merchantTransactionId}' + SALT_KEY) + "###" + SALT_INDEX;


        const options = {
            method: 'get',
            url: '${PHONE_PE_HOST_URL}/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                "X-MERCHANT-ID": merchantTransactionId,
                "X-VERIFY": xverify
            },

        };
        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                res.send(response.data)
            })
            .catch(function (error) {
                console.error(error);
            });
        // res.send({ merchantTransactionId })
    } else {
        res.send({ error: 'Error' });
    }

})
phonepay.listen(5000);


