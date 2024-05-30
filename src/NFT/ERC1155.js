const { conflux, account } = require('../init');
const ERC1155 = require('../abis/ERC1155.json');

const nftContract = conflux.Contract({
  abi: ERC1155.abi,  // use the erc1155 contract's abi
  address: 'the nft contract address'  // set the real contract address
});

async function main() {
  const tokenId = 3;
  // Query user's balance of one token(NFT)
  let balance = await nftContract.balanceOf(account.address, tokenId);
  console.log(balance);

  const targetAddress = 'xxx';
  const transferAmount = 1;
  // Transfer NFT 
  let receipt = await nftContract
    .safeTransferFrom(account.address, targetAddress, tokenId, transferAmount, "0x0")
    .sendTransaction({
      from: account.address,
      gasPrice: 10000000
    })
    .executed();
  console.log(receipt);
}

main().catch(console.log);