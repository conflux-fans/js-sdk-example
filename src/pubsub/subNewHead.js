const { Conflux } = require('js-conflux-sdk');

const cfxClient = new Conflux({
  url: 'wss://test.confluxrpc.com/ws',
  chainId: 1,
});

async function main() {
  cfxClient.provider.on('close', (...args) => {console.log('connection closed', args)});

  let newHeadEmitter = await cfxClient.subscribeEpochs();
  newHeadEmitter.on('data', console.log);
}

main().catch(console.log);