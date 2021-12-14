const hre = require("hardhat");

async function main() {
  const Free = await hre.ethers.getContractFactory("FreeToken");
  const free = await Free.deploy();
  await free.deployed();

  console.log("FreeToken deployed at", await free.address);
  console.log("Owner Address", await free.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
