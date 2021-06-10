const { Conflux, Drip, CONST } = require('js-conflux-sdk');
const cfx = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
});
const account = cfx.wallet.addPrivateKey(process.env.PRIVATE_KEY);
const targetAddress = 'cfxtest:aame568esrpusxku1c449939ntrx2j0rxpmm5ge874';

async function main() {
  
  // check balance
  await getBalance(targetAddress);
  //
  // let hash = await sendSimpleTx();
  let hash = await txStatusHelperMethods();
  //
  // await sendCompleteTX();
  await checkConfirmed(hash);
}

main().catch(console.log);

async function getBalance(address) {
  const balance = await cfx.getBalance(address);
  const balanceInDrip = Drip(balance);
  console.log(`Balance of ${address} is ${balanceInDrip.toCFX()} CFX`);
}

async function sendSimpleTx() {
  const hash = await cfx.sendTransaction({
    from: account.address,
    to: targetAddress,
    value: Drip.fromCFX(1.1),
  });
  console.log(`TX hash ${hash}`);
  return hash;
}

async function sendCompleteTX() {
  const currentEpoch = await cfx.getEpochNumber();
  const nonce = await cfx.getNextNonce(account.address);
  let txInfo = {
    from: account.address,
    to: targetAddress,
    value: Drip.fromCFX(1.1),
    nonce,
    gasPrice: 1,
    chainId: 1,
    epochHeight: currentEpoch,
  };
  let estimate = await cfx.estimateGasAndCollateral(txInfo);
  txInfo.gas = estimate.gasLimit;
  txInfo.storageLimit = estimate.storageCollateralized;
  const hash = await cfx.sendTransaction(txInfo);
  console.log(`TX hash ${hash}`);
  return hash;
}

async function txStatusHelperMethods() {
  const pendingTx = cfx.sendTransaction({
    from: account.address,
    to: targetAddress,
    value: Drip.fromCFX(1.1),
  });
  let hash = await pendingTx;
  // let tx = await pendingTx.get();
  // tx = await pendingTx.mined();
  let receipt = await pendingTx.executed();
  receipt = await pendingTx.confirmed();
  return hash;
}

async function checkConfirmed(hash) {
  let confirmedEpoch = await cfx.getEpochNumber(CONST.EPOCH_NUMBER.LATEST_CONFIRMED);
  let receipt = await cfx.getTransactionReceipt(hash);
  if (!receipt) return;
  // console.log("是否确认: ", receipt.epochNumber < confirmedEpoch, receipt.epochNumber - confirmedEpoch);

  let risk = await cfx.getConfirmationRiskByHash(receipt.blockHash);
  console.log(risk);
}