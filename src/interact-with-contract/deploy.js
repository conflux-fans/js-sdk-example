const {
  conflux, 
  account,
  FC_ADDRESS,
  CRC20_ABI,
  targetAddress,
  Drip,
} = require('../init');

const contractMeta = require('../../abis/1155.json');

const targetAddress1 = 'cfxtest:aat3bzj1mhgubvfj4psdety7d5x46a9v92gtj86mvj';

async function main() {
  const {abi, bytecode} = require('../../artifacts/contracts/YourContract.sol/YourContract.json');
  const contract = conflux.Contract({
    abi,
    bytecode,
  });

  // If contract has parameters, you can set them as constructor arguments
  console.log(account.address);
  let receipt = await contract.constructor(account.address).sendTransaction({
    from: account.address,
  }).executed();

  console.log("New deployed contract address:", receipt.contractCreated);
  // await deploy();
  // await callContractMethod();
//   await setSponsor('CFXTEST:TYPE.CONTRACT:ACD0UU2ZF490D9Y5ZS0C070X6E95K3UK9P4X12P6T8');
}

main().catch(console.log);

async function deploy() {
  const contract = conflux.Contract({
    abi: contractMeta.abi,
    bytecode: contractMeta.bytecode,
  });

  // If contract has parameters, you can set them as constructor arguments
  let receipt = await contract.constructor().sendTransaction({
    from: account.address,
  }).executed();

  console.log("New deployed contract address:", receipt.contractCreated);
}

async function setSponsor(contract) {
  const sponsor = conflux.InternalContract('SponsorWhitelistControl');
  /* let tx = await sponsor
    .setSponsorForGas(contract, Drip.fromCFX(1))
    .sendTransaction({
      from: account.address,
      value: Drip.fromCFX(1000),
    })
    .executed(); */

  /* let tx2 = await sponsor
    .setSponsorForCollateral(contract)
    .sendTransaction({
      from: account.address,
      value: Drip.fromCFX(100),
    })
    .executed(); */

    let tx3 = await sponsor
        .addPrivilegeByAdmin(contract, ['cfxtest:aatgt75bzsvugzb6gz8tdn8mk7ejk7z5zeb0njx6hp'])
        .sendTransaction({
            from: account.address,
        }).executed();
}

async function callContractMethod() {
  const contract = conflux.Contract({
    abi: contractMeta.abi,
    // address: 'CFXTEST:TYPE.CONTRACT:ACA5X5SV86PP18VJHHZ0J89Z9NTT3GEWH2U6DV5V2G'
    address: 'CFXTEST:TYPE.CONTRACT:ACD0UU2ZF490D9Y5ZS0C070X6E95K3UK9P4X12P6T8', // sponsored
  });

  let callRequest = contract.safeTransferFrom(account.address, 'cfxtest:aak8wesad998xpnsk9rdg7an1wwnfv1s8e3tpyjue2', 1, 10000, '0x');
//   console.log(callRequest.data);

  let tx = await callRequest.sendTransaction({
    from: account.address,
    data: callRequest.data,
  });
  console.log(tx);
}