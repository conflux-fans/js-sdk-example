const { conflux, FC_ADDRESS, CRC20_ABI } = require('./init');

// This example shows how to call a contract method

// Instantiate a contract object with the abi and address
const c = conflux.Contract({abi: CRC20_ABI, address: FC_ADDRESS});

async function main() {
    // Call the name() method of the contract
    let res = await c.name();
    console.log(`Result: ${res}`);
}

main().catch(e => console.error(e));