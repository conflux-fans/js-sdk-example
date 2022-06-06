const { conflux, account, Drip, targetAddress } = require('./init');

async function main() {
  // Invoke RPC methods
  let epochNumber = await conflux.getEpochNumber();
  console.log(`Current epoch number: ${epochNumber}`);

  let status = await conflux.getStatus();
  console.log(`Current status: `, status);

  let balance = await conflux.getBalance(account.address);
  console.log(`Balance of ${account.address}: ${Drip(balance).toCFX()} CFX`);

  // send tx
  let tx = conflux.sendTransaction({
    from: account.address,
    to: targetAddress,
    value: Drip.fromCFX(1),
  });
  let hash = await tx;
  console.log(`Transaction hash: ${hash}`);

  let txInfo = await tx.mined();
  console.log(`Transaction mined: `, txInfo);

  let txReceipt = await tx.executed();
  console.log(`Transaction receipt: `, txReceipt);
}

main().then(console.log);
