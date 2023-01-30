const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");

describe("Attack", function () {

  it("Should be able to guess the exact number", async () => {
    const Game = await ethers.getContractFactory("Game");
    const game = await Game.deploy({ value: utils.parseEther("1") });
    await game.deployed();

    console.log("Game deployed to:", game.address);

    const Attack = await ethers.getContractFactory("Attack");
    const attack = await Attack.deploy(game.address);

    console.log("Attack deployed to:", attack.address);


    const tx = await attack.attack();
    await tx.wait();

    const balance = await game.getBalance();
    expect(balance).to.equal(BigNumber.from("0"));
  });
});

