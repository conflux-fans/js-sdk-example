const { conflux } = require('./setup');
// const { tracesInTree } = require('js-conflux-sdk/src/util/trace');
const { tracesInTree } = require('/Users/panaw/Projects/conflux/sdks/js-conflux-sdk/src/util/trace');


describe('Trace', () => {
    test('Trace in tree', async () => {
        // contract destroy
        // const hash = '0xff71bf4b21cd276700263518b5fd71f83c09af15a1cdc02e1ce20aa8fbff3a47';
        // contract
        // const hash = '0x181a25d3bb105c64cff93e956c00b95b657dbfe945e7815f08f99adc3ff292fa';
        // nft transfer
        // const hash = '0xc37619edf4bbb7aba734362a5da53ddacdeb6b5548c69a35125d9cf54ac13540';
        // common tx
        const hash = '0x7c080fa399df7c3c87346e55907e321d0391a37cb2a89e5b3dfe2b731ef7a9a5';
        const traces = await conflux.trace.transaction(hash);
        // console.log(JSON.stringify(traces, null, '\t'));
        let a = tracesInTree(traces);
        console.log(JSON.stringify(a, null, '\t'));

        /* const traces2 = require('../tmp/tmp-trace.json');
        let b = tracesInTree(traces2);
        console.log(JSON.stringify(b, null, '\t')); */
    });
});
