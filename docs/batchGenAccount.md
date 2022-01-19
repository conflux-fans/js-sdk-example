# 使用 js-conflux-sdk 批量生成账号

## 安装

要使用 js-conflux-sdk 需要有一个 Node.js 环境，安装方法可参看 Node.js 官网。

然后使用 npm 安装 js-conflux-sdk

```sh
$ npm install js-conflux-sdk
```

## 批量生成账号

引入 `PrivateKeyAccount` 类，然后调用其 random 方法生成账号

```js
const {PrivateKeyAccount} = require('js-conflux-sdk');

const mainnetNetworkId = 1029;  //

// use PrivateKeyAccount.random method to generate a random account
for(let i = 0; i < 100; i++) {
  let a = PrivateKeyAccount.random(undefined, 1029);
  console.log(a);
}
/*
PrivateKeyAccount {
  address: 'cfx:aap7ewcs7p2cypy3xdvfc8h0ax5src1gs29n8nxj58',
  publicKey: '0x2830f02b87a4660c0ea046e243a50bdad14f3332c14b99a13f258c3ac006a4a13d43b03dde5eec20d92745718ae8b4dd7ecd2ebae34d1797d881bd460c671b9a',
  privateKey: '0xcd974dec78f3341fd9e9ef194a83de8cc9d3e5d3883c1316a3773cefa938884e',
  networkId: 1029
}
*/
```

运行该脚本即可生成 100 个账号

```sh
$ node batch-gen-account.js
```