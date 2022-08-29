# js-sdk-example

This repo contains several `js-conflux-sdk` usage examples, which are are located at `src` folder.

It also contain some contracts, they can be compiled by hardhat `npx hardhat compile`.

## Local Develop Environment

Install dependencies.

```sh
$ npm install
```

Compile contracts

```sh
$ npx hardhat compile
```

Add local env file

```sh
$ cp .env.example .env 
```

Edit the options `URL`, `NETWORKID`, `PRIVATE_KEY` in it.

## Examples

### Basic

0. [SDK initialize](./src/init.js)
1. [Query blockchain info by invoke RPC methods](./src/index.js)
2. [How to send conflux transactions](./src/sending-tx/index.js)
3. [Interact with contract: Query contract state; update contract state](./src/interact-with-contract/index.js)
4. [Recover portal personal_sign's signature](./src/sign/index.js)

### Accounts

1. [Batch generate account](./src/accounts/batch-gen-account.js)
2. [HD Wallet](./src/accounts/hd/index.mjs)
