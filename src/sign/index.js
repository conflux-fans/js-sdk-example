const {Message, format, sign} = require('js-conflux-sdk');
const PREFIX = '\x19Conflux Signed Message:\n';
// const PREFIX2 = '\u0019Conflux Signed Message:\n';

let portalSig = "0x11efaa79ac64f46682d427cfa8c2b5cf7d22f0bc97a1c52ee60e442ee3e4c00212417a3f646209af682d46a890fa1928460c6e02a737432e6f19b7e57ff0c6631b";
let hexAddress = recoverPortalPersonalSign(portalSig, 'personal sign data');
console.log('Hex format address: ' + hexAddress);
let address = format.address(hexAddress, 1029);
console.log('Address: ' + address);

/*
* This function will return the hex address of the signer
*/
function recoverPortalPersonalSign(signature, message) {
  let v = parseInt(signature.slice(130), 16) - 27;
  signature = signature.slice(0, 130) + '0' + v.toString(16);  // deal the value v
  const messageHex = format.hex(Buffer.from(message));
  let msg = new Message(PREFIX + messageHex.length + messageHex);
  let publicKey = Message.recover(signature, msg.hash);
  let publicKeyBuffer = Buffer.from(publicKey.slice(2), 'hex'); // remove the 0x prefix, then convert it to buffer
  return '0x' + sign.publicKeyToAddress(publicKeyBuffer).toString('hex')
}