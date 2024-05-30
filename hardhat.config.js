require("@nomiclabs/hardhat-waffle");
require('hardhat-conflux');
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    confluxTestnet: {
      url: "https://test.confluxrpc.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 1,
    }
  }
};
