const { Conflux, Drip, CONST } = require('js-conflux-sdk');

const conflux = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
});

// NOTE: Replace with your own private key which have CFX balance
const account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);
const targetAddress = 'cfxtest:aame568esrpusxku1c449939ntrx2j0rxpmm5ge874';

module.exports = {
  conflux,
  account,
  targetAddress,
  CRC20_ABI: require('./crc20.json').abi,
  FC_ADDRESS: 'cfxtest:achkx35n7vngfxgrm7akemk3ftzy47t61yk5nn270s',
  Drip,
  CONST,
};