const {Message, format, sign} = require('js-conflux-sdk');
const PREFIX = '\x19Conflux Signed Message:\n';
// const PREFIX2 = '\u0019Conflux Signed Message:\n';

let portalSig = "0x5470e25137b3645b2728d07c56eadc64f08d4d922298f32b7cf5a9c0733eccdc4782c8f7a4b732620c71c9c975e171a0bb6afac3053d5c5a4a106f4f476024031c";
let hexAddress = recoverPortalPersonalSign(portalSig, 'hello');
console.log('Hex format address: ' + hexAddress);
let address = format.address(hexAddress, 1);
console.log('Address: ' + address);

/*
* This function will return the hex address of the signer
*/
function recoverPortalPersonalSign(signature, message) {
  signature = signature.slice(0, 130) + '01';  // deal the value v
  const messageHex = format.hex(Buffer.from(message));
  let msg = new Message(PREFIX + messageHex.length + messageHex);
  let publicKey = Message.recover(signature, msg.hash);
  let publicKeyBuffer = Buffer.from(publicKey.slice(2), 'hex'); // remove the 0x prefix, then convert it to buffer
  return '0x' + sign.publicKeyToAddress(publicKeyBuffer).toString('hex')
}