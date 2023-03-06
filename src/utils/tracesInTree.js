const { conflux, account } = require('../init');
// const { tracesInTree } = require('js-conflux-sdk/src/util/trace');
const { tracesInTree } = require('/Users/panaw/Projects/conflux/sdks/js-conflux-sdk/src/util/trace');
const fs = require('fs');

async function main() {
    const epochNumber = await conflux.getEpochNumber();

    const txhash = '0x6aee5bc3b06602357ef424ae69946f555b8b2c464cb7abd33f764a991fa14d0e';

    const trace = await conflux.traceTransaction(txhash);
    console.log(trace);

    fs.writeFileSync('trace.json', JSON.stringify(trace, null, '\t'));

    console.log(tracesInTree(trace));
}

main().catch(console.log);