require('dotenv').config();
const {
  Conflux,
  Drip, 
  format,
} = require('js-conflux-sdk');

const conflux = new Conflux({
  url: process.env.URL,
  networkId: Number(process.env.NETWORKID),
});

const account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);

const testPrivateKey = '0x42d41145b3992788fcd5e97b8f775e195c618155d7f83f57fab55dfffffffffff';
const testAccount = conflux.wallet.addPrivateKey(testPrivateKey);

module.exports = {
    conflux,
    account,
    testAccount,
    Drip,
    format,
};