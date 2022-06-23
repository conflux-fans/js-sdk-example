require('dotenv').config();
const {
  Conflux, 
  Drip, 
  format
} = require('js-conflux-sdk');

const contractMeta = require('../abis/1155.json');

const conflux = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1,
});

// New account without balance
let newAccount = conflux.wallet.addPrivateKey('0x9ae99ca53d098c6773bd53be287aa412e148793c349bcbfb2ec087d682d1e7b0');
// cfxtest:aaskkfdhku9asbr0ch82k62gffh92v8azeyrz61kmv

// Account with balance 100 CFX
let account = conflux.wallet.addPrivateKey('0xbb3ad859e1fdef251e21feec6efb8cacbc9cee9217ac5fc6a27a0195bf2c1960');
// cfxtest:aar1p57797de6pjnk3r98cusun7jk4kcdyv7vdevrd

let accountWith1155 = conflux.wallet.addPrivateKey('0xad1300a57c75e4706cacea2b6e32400d03d8db2f71be1646e35d0b5a8eac3e07');
// NO CFX balance
// cfxtest:aatgt75bzsvugzb6gz8tdn8mk7ejk7z5zeb0njx6hp

let accountWith1155NotInWhiteList = conflux.wallet.addPrivateKey('0x4ba7b745fc9c37295e7379ba4d8bb9249a47c4e9cf6034387e31d16213f607f0');
// cfxtest:aak8wesad998xpnsk9rdg7an1wwnfv1s8e3tpyjue2

let nft1155WithoutSponsor = 'CFXTEST:TYPE.CONTRACT:ACA5X5SV86PP18VJHHZ0J89Z9NTT3GEWH2U6DV5V2G';

let contract1155 = conflux.Contract({
    abi: contractMeta.abi,
    address: nft1155WithoutSponsor,
});

let nft1155WithSponsor = 'CFXTEST:TYPE.CONTRACT:ACD0UU2ZF490D9Y5ZS0C070X6E95K3UK9P4X12P6T8';
let contract1155Sponsored = conflux.Contract({
    abi: contractMeta.abi,
    address: nft1155WithSponsor,
});

/**
 * Estimate error messages:
 * 1. const errMessage = 'Can not estimate: transaction execution failed, all gas will be charged (execution error: NotEnoughCash { required: 125000000000000000, got: 0, actual_gas_cost: 0, max_storage_limit_cost: 125000000000000000 })';
 * 
 * 
 * Estimate error data:
 * 1. NotEnoughCash { required: 1, got: 0, actual_gas_cost: 0, max_storage_limit_cost: 0 }
 */

describe('CFX transfer estimate', () => {

  test('Enough for balance and gas', async () => {
    let estimate = await conflux.cfx.estimateGasAndCollateral({
      from: account.address,
      to: newAccount.address,
      value: Drip.fromCFX(1)
    });
    expect(estimate.gasUsed).toBe(21000n);
    expect(estimate.storageCollateralized).toBe(0n);
  });

  test('Not enough for value', async () => {
    try {
        let balance = await conflux.cfx.getBalance(account.address);
        let estimate = await conflux.cfx.estimateGasAndCollateral({
            from: account.address,
            to: newAccount.address,
            value: balance + 1n
        });
    } catch(e) {
        expect(/execution error: NotEnoughCash/.test(e.message)).toEqual(true);
    }
  });

  test('Not enough for gas', async () => {
    let balance = await conflux.cfx.getBalance(account.address);

    try {
      let estimate = await conflux.cfx.estimateGasAndCollateral({
        from: account.address,
        to: newAccount.address,
        value: balance,
        gasPrice: 1,
      });
    } catch(e) {
        expect(/execution error: NotEnoughCash/.test(e.message)).toEqual(true);
    }
  });

  test('New user', async () => {
    try {
      let estimate = await conflux.cfx.estimateGasAndCollateral({
        from: newAccount.address,
        to: account.address,
        value: 1,
      });
    } catch(e) {
      expect(/execution error: NotEnoughCash/.test(e.message)).toEqual(true);
    }
  })

});

describe('Without from estimate', () => {
  test('Enough for balance and gas', async () => {
    let estimate = await conflux.cfx.estimateGasAndCollateral({
      to: newAccount.address,
      value: Drip.fromCFX(1)
    });
    expect(estimate.gasUsed).toBe(21000n);
    expect(estimate.storageCollateralized).toBe(0n);
  });

  test('Contract deploy estimate', async () => {
    let estimate = await conflux.cfx.estimateGasAndCollateral({
      data: contractMeta.bytecode
    });
    expect(estimate.gasUsed).toBe(3265619n);
    expect(estimate.storageCollateralized).toBe(5632n);
  });
});

describe('Contract interact estimate (no sponsor)', () => {
  test('1155 safeTransferFrom: contract error ', async () => {
    try {
      let estimate = await contract1155
        .safeTransferFrom(newAccount.address, account.address, 1, 1, '0x')
        .estimateGasAndCollateral({
          from: newAccount.address,
        });
    } catch(e) {
      expect(/ERC1155: insufficient balance for transfer./.test(e.message)).toEqual(true);
    }
  });

  test('1155 safeTransferFrom: can not pay gas', async () => {
    try {
      let estimate = await contract1155
        .safeTransferFrom(accountWith1155.address, account.address, 1, 1, '0x')
        .estimateGasAndCollateral({
          from: accountWith1155.address,
        });
    } catch(e) {
        expect(/execution error: NotEnoughCash/.test(e.message)).toEqual(true);
    }
  });

  test('1155 safeTransferFrom: can pay gas', async () => {
    let estimate = await contract1155
      .safeTransferFrom(account.address, newAccount.address, 1, 1, '0x')
      .estimateGasAndCollateral({
        from: account.address,
      });

    expect(estimate.gasUsed).toBe(45052n);
  });

});

describe('Contract interact estimate with sponsor', () => {
    test('Tx not in sponsor whitelist', async () => {
        try {
            let estimate = await contract1155Sponsored
              .safeTransferFrom(accountWith1155NotInWhiteList.address, account.address, 1, 1, '0x')
              .estimateGasAndCollateral({
                from: accountWith1155NotInWhiteList.address,
              });
        } catch(e) {
            expect(/execution error: NotEnoughCash/.test(e.message)).toEqual(true);
        }
    });

    test('Tx execute failed', async () => {
        try {
            let estimate = await contract1155Sponsored
              .safeTransferFrom(newAccount.address, account.address, 1, 1, '0x')
              .estimateGasAndCollateral({
                from: newAccount.address,
              });
        } catch(e) {
            expect(/ERC1155: insufficient balance for transfer./.test(e.message)).toEqual(true);
        }
    });

    test('Tx surpass upperbound', async () => {
        try {
            let estimate = await contract1155Sponsored
              .safeTransferFrom(accountWith1155.address, account.address, 1, 1, '0x')
              .estimateGasAndCollateral({
                from: accountWith1155.address,
                gasPrice: Drip.fromCFX(1),
              });
        } catch(e) {
            console.log(e.message);
            expect(/execution error: NotEnoughCash/.test(e.message)).toEqual(true);
        }
    });

    test('Tx can be sponsored', async () => {
        let estimate = await contract1155Sponsored
          .safeTransferFrom(accountWith1155.address, account.address, 1, 1, '0x')
          .estimateGasAndCollateral({
            from: accountWith1155.address,
          });

        expect(estimate.gasUsed).toBe(45052n);
    });
});

