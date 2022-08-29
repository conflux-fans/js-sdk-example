const { PrivateKeyAccount } = require('js-conflux-sdk');
const fs = require('fs');
const crypto = require('crypto');
const TESTNET_NETWORK_ID = 1;

const account = PrivateKeyAccount.random(crypto.randomBytes(32), TESTNET_NETWORK_ID);
console.log('Random account: ', account);

const keystore = account.encrypt('password');
console.log('Keystore: ', keystore);

const recoveredAccount = PrivateKeyAccount.decrypt(keystore, 'password', TESTNET_NETWORK_ID);
console.log('Recover account from keystore: ', recoveredAccount);

