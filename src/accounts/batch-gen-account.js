const { PrivateKeyAccount, CONST } = require('js-conflux-sdk');

// use PrivateKeyAccount.random method to generate a random account
for(let i = 0; i < 100; i++) {
  let a = PrivateKeyAccount.random(undefined, CONST.MAINNET_ID);
  console.log(`Account ${i+1}`, a);
}