import {getNthAccountOfHDKey} from "@fluent-wallet/hdkey";
import { sign, format } from "js-conflux-sdk";

const networkId = 1;
// your mnemonic words
const mnemonic = 'your mnemonic words';  // replace with real mnemonic words

async function main() {

  let index = 1;
  // conflux coin path is `m/44'/503'/0'/0`
  let account = await getNthAccountOfHDKey({
    mnemonic,
    nth: index  // the account index
  });

  let privateKey = account.privateKey;
  // use privateKey to get Conflux hex address
  let hexAddress = privateKeyToAddress(privateKey);
  let cfxAddress = format.address(hexAddress, networkId);
  console.log(cfxAddress);
}

function privateKeyToAddress (pk) {
  return '0x' + sign.privateKeyToAddress(Buffer.from(pk.slice(2), 'hex')).toString('hex');
}

main().catch(console.log);

