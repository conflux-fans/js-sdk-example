const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Transaction } = require('js-conflux-sdk');
const { conflux, account, testAccount } = require('./setup');
const rlp = require('js-conflux-sdk/src/util/rlp');

describe("Transaction", function () {
  it("TX Decode should success", async function () {
    // decode 失败的交易 https://www.confluxscan.io/transaction/0x434c8538bffb109fe42a7b4dc8ba8ffd59330e8f5c5c0f1d3590076569db4bee
    const rawTx1 = '0xf86be782040e843b9aca00825208941fe21dbcf6c252656d2a26030cda2b2090417f2f01808203e8018001a06dd2640cd05b6ae4616037737c2845205d261727e849e92952a776e559690cffa029e5d1d04bd1f69ce1a16ddb21049b0fca2f2ef371d6cc866518fcf5d4e8d240';
    const rawTx2 = '0xf873f082016a843b9aca0082520894171938a30ce34a65b1e673410a4366cab7f242b885e8d4a51000808403ee5f388204058001a055a88721dcac6c82ebf13db500046644c38ed914d224b23507dfd169ef44fe4a9f84561724efa51adfad3c24e9e74d89169b805654cc21d3bda855a9c4818eb7';
    const tx = Transaction.decodeRaw(rawTx1);
    // console.log(tx);

    const dtx1 = rlp.decode(rawTx1);
    console.log(dtx1);
    const dtx2 = rlp.decode(rawTx2);
    console.log(dtx2);
    // const tx2 = Transaction.decodeRaw(rawTx2);
    // console.log(tx2);
  });

  it("TX Encode should success", async function () {
    let txMeta = {
        from: account.address,
        to: testAccount.address,
        value: 1,
        epochHeight: 1000,
    }
    txMeta = await conflux.cfx.populateTransaction(txMeta);
    const tx = await account.signTransaction(txMeta);
    const rawTx = tx.serialize();
    const expectRawTx = '0xf86be782040e843b9aca00825208941fe21dbcf6c252656d2a26030cda2b2090417f2f01808203e8018001a06dd2640cd05b6ae4616037737c2845205d261727e849e92952a776e559690cffa029e5d1d04bd1f69ce1a16ddb21049b0fca2f2ef371d6cc866518fcf5d4e8d240';
    expect(rawTx).to.equal(expectRawTx);
  });
});
