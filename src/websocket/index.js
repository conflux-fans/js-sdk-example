const { Conflux, Drip, CONST } = require('js-conflux-sdk');
const cfx = new Conflux({
  url: 'wss://test.confluxrpc.com/ws',  // an websocket url is needed to use Pub/Sub
  networkId: 1,
});
const account = cfx.wallet.addPrivateKey(process.env.PRIVATE_KEY);
const targetAddress = 'cfxtest:aame568esrpusxku1c449939ntrx2j0rxpmm5ge874';
const erc20_contract_address = 'cfxtest:acbkpy75s2mtaesb9m5vfjp1hj6hru9h0yex0vsuj5';
const { abi } = require('../crc20.json');
const erc20_contract = cfx.Contract({
  address: erc20_contract_address,
  abi
});

async function main() {
  // let emitter = await subEpoch();
  // let emitter = await subAllEvent();
  let emitter = await subFilteredEvent();

  // unsubscribe from an event
  // cfx.unsubscribe(emitter);
}

async function subAllEvent() {
  const emitter = await cfx.subscribeLogs();
  emitter.on("data", console.log);
  return emitter;
}

async function subFilteredEvent() {
  // let's setup a filter to ERC20 token's transfer event
  // https://developer.confluxnetwork.org/conflux-doc/docs/json_rpc#cfx_getlogs
  let filter = {
    address: erc20_contract_address,  // this is a contract address
  };
  const emitter = await cfx.subscribeLogs(filter);
  emitter.on("data", function(log) {
    // decode the log data
    console.log(erc20_contract.abi.decodeLog(log));
    /*
    The decoded data:
    {
      name: 'Transfer',
      fullName: 'Transfer(address indexed from, address indexed to, uint256 value)',
      type: 'Transfer(address,address,uint256)',
      signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      array: [
        'cfxtest:aak2rra2njvd77ezwjvx04kkds9fzagfe6d5r8e957',
        'cfxtest:aajge58md12t9mavgcframv9rbfnb80u6jpzwpcsbt',
        1000000000000000000n
      ],
      object: {
        from: 'cfxtest:aak2rra2njvd77ezwjvx04kkds9fzagfe6d5r8e957',
        to: 'cfxtest:aajge58md12t9mavgcframv9rbfnb80u6jpzwpcsbt',
        value: 1000000000000000000n
      }
    }
     */
  });
  return emitter;
}

async function subEpoch() {
  let emitter = await cfx.subscribeEpochs();
  emitter.on("data", console.log);
  return emitter;
}

main().catch(console.log);