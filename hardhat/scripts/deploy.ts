// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Network:", (await ethers.getDefaultProvider().getNetwork()).name)
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());


  const Horcrux = await ethers.getContractFactory("Horcrux");
  const horcrux = await Horcrux.deploy();
  await horcrux.deployed();

  console.log("\nHorcrux deployed to:", horcrux.address);
  console.log("Horcrux :", horcrux);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
