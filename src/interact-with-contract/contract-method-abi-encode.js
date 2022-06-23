const {
    conflux,
    Drip,
} = require('../init');

const erc20meta = require('../../abis/erc20-short');

const erc20 = conflux.Contract(erc20meta);

let callReq = erc20.constructor(Drip.fromCFX(21000000));

console.log(callReq.data);