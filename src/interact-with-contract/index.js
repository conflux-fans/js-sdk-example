const {
  cfx, 
  account,
  FC_ADDRESS,
  CRC20_ABI,
  targetAddress,
} = require('../init');


async function main() {
  // initialize a contract instance with abi and address
  let fc = cfx.Contract({
    address: FC_ADDRESS,
    abi: CRC20_ABI,
  });
  
  let balance = await fc.balanceOf(account.address);
  console.log(`${account.address} FC balance is : ${balance}`);

  let hash = await fc.transfer(targetAddress, 100).sendTransaction({
    from: account.address,
  });

  console.log('FC transfer hash is ', hash);
}

main().catch(console.log);