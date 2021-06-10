const { Conflux, Drip, CONST } = require('js-conflux-sdk');
const cfx = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
});
const account = cfx.wallet.addPrivateKey(process.env.PRIVATE_KEY);
const targetAddress = 'cfxtest:aame568esrpusxku1c449939ntrx2j0rxpmm5ge874';

module.exports = {
  cfx,
  account,
  targetAddress,
  CRC20_ABI: require('./crc20.json').abi,
  FC_ADDRESS: 'cfxtest:achkx35n7vngfxgrm7akemk3ftzy47t61yk5nn270s',
};