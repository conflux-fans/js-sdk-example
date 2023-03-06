const { conflux, account, Drip, targetAddress } = require('./init');
const {abi} = require('../abis/crc20.json')

const c = conflux.Contract({abi});

let a = c.name();
console.log(a);