const { conflux, account } = require('../init');
const crc1155meta = require('../../abis/1155.json');

async function main() {
  const balance = await conflux.cfx.getBalance(account.address);
  console.log(balance);

  let address = 'NET11:TYPE.CONTRACT:ACHMCR29ZH1D9XDS5GW7BXVM2A7VSH269E20UV0ZHU';
  let contract = conflux.Contract({
    abi: crc1155meta.abi,
    bytecode: crc1155meta.bytecode,
    address,
  });

  /* let receipt = await contract.constructor().sendTransaction({
    from: account.address
  }).executed();

  console.log(receipt); */

  /* let transfer = await contract.safeTransferFrom(account.address, account.address, 1, 1, '0x').estimateGasAndCollateral();
  console.log(transfer); */

  let result = await conflux.cfx.call({
    from: account.address,
    to: 'net11:achmcr29zh1d9xds5gw7bxvm2a7vsh269e20uv0zhu',
    data: '0xf242432a0000000000000000000000001ff8f6638baa1473d3b7b29421fbc573837f4b920000000000000000000000001ff8f6638baa1473d3b7b29421fbc573837f4b920000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000',
  })
  
}

main().catch(console.log);