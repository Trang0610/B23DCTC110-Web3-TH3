require("@nomiclabs/hardhat-waffle");

require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */


const { subtask } = require("hardhat/config");
const {
  TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD,
} = require("hardhat/builtin-tasks/task-names");

subtask(
  TASK_COMPILE_SOLIDITY_GET_SOLC_BUILD,
  async ({ solcVersion }, hre, runSuper) => {
    if (solcVersion === "0.8.19") {
      return {
        compilerPath: require.resolve("solc/soljson.js"),
        isSolcJs: true,
        version: solcVersion,
        longVersion: require("solc").version(),
      };
    }
    return runSuper();
  }
);



module.exports = {
  solidity: "0.8.19",
  networks: {
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL ||
        "https://sepolia.gateway.tenderly.co",
      chainId: 11155111,
      accounts: process.env.PRIVATE_KEY
        ? [process.env.PRIVATE_KEY]
        : [],
    },
  },
};

