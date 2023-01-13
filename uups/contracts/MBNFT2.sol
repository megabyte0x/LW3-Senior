// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./MBNFT.sol";

contract MBNFT2 is MBNFT {
    function test() public pure returns (string memory) {
        return "upgraded";
    }
}
