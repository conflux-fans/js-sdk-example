const abi = require('js-conflux-sdk/src/contract/abi');
const HexStream = require('js-conflux-sdk/src/util/HexStream');
const address = '0x1386b4185a223ef49592233b69291bbe5a80c527';

// create a abi coder through abi frame
const coder = abi.valueCoder({type: 'uint256'});
const addressCoder = abi.valueCoder({type: 'address'});
const tupleCoder = abi.valueCoder({type: 'tuple', components: [{type: 'uint256'}, {type: 'address'}]});
const arrayCoder = abi.valueCoder({type: 'uint256[]'});

// the encode result is buffer
const encodedResult = coder.encode(1).toString('hex');
console.log(coder.decode(new HexStream(encodedResult)));
console.log(addressCoder.encode(address).toString('hex'));

console.log(tupleCoder.encode([1, address]).toString('hex'));
console.log(arrayCoder.encode([1, 2, 3]).toString('hex'));
