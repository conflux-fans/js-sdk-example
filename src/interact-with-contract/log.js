const {
  cfx, 
  account,
  FC_ADDRESS,
  CRC20_ABI,
  targetAddress,
} = require('../init');

/**
 * Demonstrate 
 * 1. how to decode log
 * 2. how to build log filter
 */
async function main() {
  // initialize a contract instance with abi and address
  let fc = cfx.Contract({
    address: FC_ADDRESS,
    abi: CRC20_ABI,
  });

  // This example will use ERC20's "Transfer" event as example
  // Get event signature
  console.log('signature: ', fc.Transfer.signature);

  // Get event topics by invoke encodeTopics method with parameters as array
  console.log(fc.Transfer.encodeTopics([account.address, targetAddress, 100]));

  // Get an event's log filter, which can be used as 
  console.log(fc.Transfer(account.address, targetAddress, 100));
  
  // Get "Transfer" logs
  let logs = await fc.Transfer(account.address, targetAddress, 100).getLogs();

  // Subscribe to "Transfer" logs
  let sub = await fc.Transfer(account.address, targetAddress, 100).subscribeLogs();
  sub.on('data', console.log);
  
  // Get log through receipt
  let hash = '0xd7cbc63b8c0fe25ae736ce38c939eea7bc4f890888aa48a139a212dfeeee4799';
  let receipt = await cfx.getTransactionReceipt(hash);

  // Decode log
  for(let log of receipt.logs) {
    let decoded = fc.abi.decodeLog(log);
    console.log(decoded);
  }
  
}

main().catch(console.log);