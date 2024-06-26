const { conflux, account, Drip, targetAddress } = require('./init');

async function main() {
  // Invoke RPC methods
  let epochNumber = await conflux.getEpochNumber();
  console.log(`Current epoch number: ${epochNumber}`);
  console.log();

  let status = await conflux.getStatus();
  console.log(`Current network status: `, status);
  console.log();

  let balance = await conflux.getBalance(account.address);
  console.log(`Balance of ${account.address}: ${Drip(balance).toCFX()} CFX`);
  console.log();

  // send tx
  let tx = conflux.sendTransaction({
    from: account.address,
    to: targetAddress,
    value: Drip.fromCFX(1),
  });
  let hash = await tx;
  console.log(`Transaction hash: ${hash}`);
  console.log();

  let txInfo = await tx.mined();
  console.log(`Transaction mined: `, txInfo);
  console.log();

  let txReceipt = await tx.executed();
  console.log(`Transaction receipt: `, txReceipt);
}

main().then(console.log);
