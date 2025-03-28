//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract YourContract {
    address private owner;

    constructor(address _owner) {
        owner = _owner;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function setOwner(address _owner) public {
        owner = _owner;
    }
}
