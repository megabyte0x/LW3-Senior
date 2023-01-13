const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

describe("ERC721 Upgradeable", function () {
    it("Should deploy an upgradeable NFT Smart Contract", async function () {
        const MBNFT = await ethers.getContractFactory("MBNFT");
        const MBNFT2 = await ethers.getContractFactory("MBNFT2");

        let proxyContract = await hre.upgrades.deployProxy(MBNFT, {
            kind: "uups"
        });

        const [owner] = await ethers.getSigners();
        const ownerOfToken1 = await proxyContract.ownerOf(1);

        expect(ownerOfToken1).to.equal(owner.address);

        proxyContract = await hre.upgrades.upgradeProxy(proxyContract, MBNFT2);
        expect(await proxyContract.test()).to.equal("upgraded");
    });
});