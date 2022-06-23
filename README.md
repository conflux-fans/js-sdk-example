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

## Example list

0. `./src/init.js` SDK initialize
1. `./src/index.js` Query blockchain info by invoke RPC methods
2. `./src/sending-tx` How to send conflux transactions
3. `./src/interact-with-contract` Interact with contract: Query contract state; update contract state
4. `./src/sign` Recover portal personal_sign's signature
