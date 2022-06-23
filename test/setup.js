require('dotenv').config();
const {
  Conflux, 
  Drip, 
  format
} = require('js-conflux-sdk');

const conflux = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
});

module.exports = {
    conflux
};