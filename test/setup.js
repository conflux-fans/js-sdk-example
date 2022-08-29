require('dotenv').config();
const {
  Conflux,
  Drip, 
  format
} = require('js-conflux-sdk');

const conflux = new Conflux({
  url: process.env.URL,
  networkId: Number(process.env.NETWORKID),
});

module.exports = {
    conflux
};