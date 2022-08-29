const { conflux } = require('./setup');
// const { utils } = require('js-conflux-sdk');
const { tracesInTree } = require('js-conflux-sdk/src/util/trace');
describe('Trace', () => {
    test('Trace in tree', async () => {
        const hash = '0xb6c42be2e74e671b0ddd5f69039fda23a0bc00d00ac54f9e3b18b430f3704f39';

        /* const traces = await conflux.trace.transaction(hash);
        let a = tracesInTree(traces);
        console.log(a); */

        const traces2 = require('../tmp/tmp-trace.json');
        let b = tracesInTree(traces2);
        console.log(b);
    });
});
