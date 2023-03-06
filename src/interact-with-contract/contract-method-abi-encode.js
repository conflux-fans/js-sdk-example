const {
    conflux,
    Drip,
    account
} = require('../init');

const erc20meta = require('../../abis/erc20-short');
const erc20 = conflux.Contract(erc20meta);
console.log(erc20);

// let callReq = erc20.constructor(Drip.fromCFX(21000000));
// console.log(callReq.data);

let encodedData = erc20.transfer.encodeData([account.address, 100]);
console.log(encodedData);

let decodedData = erc20.transfer.decodeData(encodedData);
console.log(decodedData);

const result = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const decodedResult = erc20.transfer.decodeOutputs(result);
console.log(decodedResult);

