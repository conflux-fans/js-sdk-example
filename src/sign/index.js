const {Message, format, sign, PersonalMessage} = require('js-conflux-sdk');
const PREFIX = '\x19Conflux Signed Message:\n';
const PREFIX2 = '\u0019Conflux Signed Message:\n';  // same as above
const NETWORK_ID = 1029;

const signer = 'cfx:aak2rra2njvd77ezwjvx04kkds9fzagfe6ku8scz91';
const message = 'Hello World';
const portalSig = "0x5f8499879ce281ff083f5716de68ab6d05b176edbb27b6c5882ab482dc00478e33679f15a30bc60510faab49c2bd0bf883ad0a45ad3160e424b35cddcc1ee85d1c";

let hexAddress = recoverPortalPersonalSign(portalSig, message);
console.log('Hex format address: ', hexAddress);
let address = format.address(hexAddress, 1029);
console.log('Address: ', address);

/*
* This function will return the hex address of the signer
*/
function recoverPortalPersonalSign(signature, message) {
  let v = parseInt(signature.slice(130), 16) - 27;
  signature = signature.slice(0, 130) + format.hex(v).slice(2);  // deal the value v
  const messageHex = message.startsWith('0x') ? message : format.hex(Buffer.from(message));
  let msg = new Message(PREFIX + messageHex.length + messageHex);
  let publicKey = Message.recover(signature, msg.hash);
  return '0x' + sign.publicKeyToAddress(format.hexBuffer(publicKey)).toString('hex')
}