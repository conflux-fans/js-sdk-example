const { conflux, account } = require('../init');
// const { tracesInTree } = require('js-conflux-sdk/src/util/trace');
const { tracesInTree } = require('/Users/panaw/Projects/conflux/sdks/js-conflux-sdk/src/util/trace');
const fs = require('fs');

async function main() {
    const epochNumber = await conflux.getEpochNumber();

    const txhash = '0x2596111cbf83238cf4582bcfaba4e8bb139e4c6702938242a828496c93a5f886';

    const trace = await conflux.traceTransaction(txhash);
    console.log(trace);

    fs.writeFileSync('trace.json', JSON.stringify(trace, null, '\t'));

    console.log(tracesInTree(trace));
}

main().catch(console.log);