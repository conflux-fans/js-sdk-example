const { conflux, FC_ADDRESS, CRC20_ABI } = require('./init');

// This example shows how to call a contract method

// Instantiate a contract object with the abi and address
const c = conflux.Contract({abi: CRC20_ABI, address: FC_ADDRESS});

async function main() {
    // Call the name() method of the contract
    // let res = await c.name();
    // console.log(`Result: ${res}`);
    const status = await conflux.cfx.getStatus();
    // console.log(conflux.cfx);
    // let a = await conflux.cfx.getParamsFromVote(status.epochNumber - 100);
    // console.log(a);

    // let res = await conflux.cfx.getFeeBurnt(status.epochNumber - 100);
    // console.log(res);

    let req = c.balanceOf('0x1d6e8f6b8a9f3e5f0f2e6b3b1f7f8e6f0f1e7f8e');
    console.log(req.type, req.txType());
    let a = req.request();
    console.log(JSON.stringify(a, null, '\t'));

}

main().catch(e => console.error(e));