const { HDWallet } = require('@conflux-dev/hdwallet');
const { Conflux } = require('js-conflux-sdk');

const mnemonic =  HDWallet.generateMnemonic();
// faint also eye industry survey unhappy boil public lemon myself cube sense

const mnemonic2 = 'faint also eye industry survey unhappy boil public lemon myself cube sense';

const wallet = new HDWallet(mnemonic2);

const privateKey0 = wallet.getPrivateKeyByIndex(0);
console.log(privateKey0.toString('hex'));
// 40d0f137665463584cc57fce2b761572a85d1cbf1601fc93d001c129b2a11c92
const privateKey1 = wallet.getPrivateKey("m/44'/503'/0'/0/1");
console.log(privateKey0.toString('hex'));

const conflux = new Conflux({
  networkId: 1
});

let a = conflux.wallet.addPrivateKey(privateKey0);
console.log(a.address);