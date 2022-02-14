import { expect } from "chai";
import { ethers } from "hardhat";

describe("Horcrux", function () {

  const abiCreate = [
    "function create(uint256 source,uint256 nonce, string calldata horcrux )"
  ];

  function getNodeFromString(source: string) {
    const seed = source.split('').reduce((value,char,index) => {
      return value * BigInt(source.charCodeAt(index));
    },BigInt(1));
    const hex = seed.toString(16).slice(0,-21);
    // console.log('---seed ',hex.length,hex)
    return ethers.utils.HDNode.fromSeed("0x"+hex);
  }

  it("create unique wallet from username/password", async function() {
    const seed = "userfrom1233@bigcomp.com1LP#QOlp09=m/44'/60'/0'/60/60";
    const node = getNodeFromString(seed);

    console.log('---private ',node.privateKey);
    console.log('---public ',node.publicKey);
  })
  it("sign create vault function", async function() {
    const seed = "userfrom1233@bigcomp.com1LP#QOlp09=m/44'/60'/0'/60/60";
    const node = getNodeFromString(seed);

    const iface = new ethers.utils.Interface(abiCreate);
    const add = ethers.utils.id(node.publicKey);
    const nonce = "0x12345";
    const horcrux = "0x73dd7f6889d95a8285f7f4cef5a00cad4d8fe5afedb4643ea2509762e37f567d";
    const embeded = iface.encodeFunctionData("create", [add, nonce,horcrux]);
    
    console.log('---calldata ',embeded);

  })  
  it("create a new horcrux", async function () {
    const Horcrux = await ethers.getContractFactory("Horcrux");
    const horcrux = await Horcrux.deploy();
    await horcrux.deployed();

    //
    // fist account is deployer
    const [deployer, alice, bob] = await ethers.getSigners();


    horcrux.create();
    const seed = "userfrom1233@bigcomp.com1LP#QOlp09=m/44'/60'/0'/60/60";
    const node = getNodeFromString(seed);

    const iface = new ethers.utils.Interface(abiCreate);
    const add = ethers.utils.id(node.publicKey);
    const nonce = "0x12345";
    const share = "test";
    const embeded = iface.encodeFunctionData("create", [add, nonce,share]);


    const tx = await alice.sendTransaction({
      to: horcrux.address,
      value: ethers.utils.parseEther("0.0"),
      data:embeded
    });    
    
    console.log('---tx ',tx,horcrux.address);

  });
});
