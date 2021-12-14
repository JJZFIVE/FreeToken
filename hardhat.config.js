require("@nomiclabs/hardhat-waffle");
const fs = require("fs");

const projectId = "99f2b74367c740d19221f8803b62ba8d";
// set this to environment variable later
const privateKey = fs.readFileSync(".secret").toString();

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${projectId}`,
      accounts: [privateKey],
    },
  },
};
