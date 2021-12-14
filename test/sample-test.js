const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TransferAmount", function () {
  it("Should set the transfer amount to 50", async function () {
    const Free = await ethers.getContractFactory("FreeToken");
    const free = await Free.deploy();
    await free.deployed();

    expect(await free.transferAmount()).to.equal(100);

    const tx = await free.setTransferAmount(50);
    await tx.wait();
    expect(await free.transferAmount()).to.equal(50);
  });
});

describe("GetTokens", function () {
  it("Should transfer tokens to a second wallet address", async function () {
    const Free = await ethers.getContractFactory("FreeToken");
    const free = await Free.deploy();
    await free.deployed();

    const [owner, secondAddress] = await ethers.getSigners();
    await free.connect(secondAddress).giveTokens();
    expect(await free.balanceOf(secondAddress.address)).to.equal(
      await free.transferAmount()
    );
  });
});
