const { expect, assert } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, waffle, artifacts } = require("hardhat");
const hre = require("hardhat");

const { DAI, DAI_WHALE, POOL_ADDRESS_PROVIDER } = require("../config.js");

describe("Deploy Flash Loan Example Contract", function () {
    it("Should take a flash loan and be able to return it", async () => {

        const flashLoanExample = await ethers.getContractFactory("FlashLoanExample");
        const flashLoanExampleContract = await flashLoanExample.deploy(POOL_ADDRESS_PROVIDER);
        await flashLoanExampleContract.deployed();

        const token = await ethers.getContractAt("IERC20", DAI);
        const BALANCE_AMOUNT_DAI = ethers.utils.parseEther("2000");


        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [DAI_WHALE],
        });
        const signer = await ethers.getSigner(DAI_WHALE);

        await token.connect(signer).transfer(flashLoanExampleContract.address, BALANCE_AMOUNT_DAI);

        const tx = await flashLoanExampleContract.createFlashLoan(DAI, 1000);
        await tx.wait();

        const remainingBalance = await token.balanceOf(flashLoanExampleContract.address);
        expect(remainingBalance.lt(BALANCE_AMOUNT_DAI)).to.be.true;
    })
})