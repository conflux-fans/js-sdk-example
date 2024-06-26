const {
  conflux, 
  Drip, 
  CONST, 
  account, 
  targetAddress
} = require('../init');


async function getBalance(address) {
  const balance = await conflux.cfx.getBalance(address);
  const balanceInDrip = Drip(balance);
  console.log(`Balance of ${address} is ${balanceInDrip.toCFX()} CFX`);

  return balance;
}

// Quick send a simple transaction, just specify the from, to, value
// make sure the account has enough balance to cover the value and gas fee
async function sendSimpleTx() {
  const hash = await conflux.cfx.sendTransaction({
    from: account.address,
    to: targetAddress,
    value: Drip.fromCFX(1.1),
  });
  return hash;
}

// You can also send a complete transaction by specifying all the tx meta info
async function sendCompleteTX() {
  const currentEpoch = await conflux.cfx.getEpochNumber();
  const nonce = await conflux.cfx.getNextNonce(account.address);
  const value = Drip.fromCFX(1.1);
  const chainId = 1;
  const gasPrice = await conflux.cfx.gasPrice();
  let txInfo = {
    from: account.address,
    to: targetAddress,
    value,
    nonce,
    gasPrice,
    chainId,
    epochHeight: currentEpoch,
  };
  // estimate gas and storageCollateralized
  let estimate = await conflux.cfx.estimateGasAndCollateral(txInfo);
  txInfo.gas = estimate.gasLimit;
  txInfo.storageLimit = estimate.storageCollateralized;

  const hash = await conflux.cfx.sendTransaction(txInfo);
  return hash;
}

// pendingTx have several helper methods that can get different stage tx data
async function txStatusHelperMethods() {
  // return a sending tx promise
  const pendingTx = conflux.cfx.sendTransaction({
    from: account.address,
    to: targetAddress,
    value: Drip.fromCFX(1.1),
  });
  // get the tx hash
  let hash = await pendingTx;
  // get the tx object
  let tx = await pendingTx.get();
  // await tx to be mined and then return the tx
  tx = await pendingTx.mined();
  // wait tx to be executed and the return receipt
  let receipt = await pendingTx.executed();
  // wait tx to be confirmed and return receipt
  receipt = await pendingTx.confirmed();
  return hash;
}

// Demonstrate how to make sure a tx is confirmed
async function checkTxConfirmed(hash) {
  let receipt = await conflux.cfx.getTransactionReceipt(hash);
  if (!receipt) {
    console.log('Tx is not executed yet');
    return;
  }
  // check whether the tx is confirmed
  let confirmedEpoch = await conflux.cfx.getEpochNumber(CONST.EPOCH_NUMBER.LATEST_CONFIRMED);
  console.log("Confirmed: ", receipt.epochNumber < confirmedEpoch, receipt.epochNumber - confirmedEpoch);
}

async function main() {
  // check balance
  await getBalance(targetAddress);
  //
  // let hash = await sendSimpleTx();
  // let hash = await txStatusHelperMethods();
  //
  let hash = await sendCompleteTX();
  await checkTxConfirmed(hash);
}

main().catch(console.log);