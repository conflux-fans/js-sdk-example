const {PrivateKeyAccount} = require('js-conflux-sdk');

const mainnetNetworkId = 1029;

// use PrivateKeyAccount.random method to generate a random account
for(let i = 0; i < 100; i++) {
  let a = PrivateKeyAccount.random(undefined, 1029);
  console.log(a);
}