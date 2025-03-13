// deploy.js

const fs = require('fs');
const path = require('path');

// Connect to your local Geth node's HTTP endpoint
const { Web3 } = require('web3');
const web3 = new Web3('http://127.0.0.1:8545');

// Load the ABI and bytecode from the build folder
const abiPath = path.resolve(__dirname, 'build', 'SimpleStorage.abi');
const binPath = path.resolve(__dirname, 'build', 'SimpleStorage.bin');

const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const bytecode = '0x' + fs.readFileSync(binPath, 'utf8').trim();

async function deployContract() {
  try {
    // Get list of accounts from the node
    const accounts = await web3.eth.getAccounts();
    console.log("Using account:", accounts[0]);

    // Create a contract instance
    const contract = new web3.eth.Contract(abi);

    // Deploy the contract
    console.log(bytecode);
    const deployedContract = await contract.deploy({
      data: bytecode,
      arguments: [] // no constructor arguments for SimpleStorage
    }).send({
      from: accounts[0],
      gas: 1500000,
      gasPrice: '30000000000'
    });

    console.log("Contract deployed at address:", deployedContract.options.address);

    // Call the set function to store a value (e.g., 42)
    await deployedContract.methods.set(42).send({ from: accounts[0] });
    console.log("Value set to 42");

    // Call the get function to retrieve the stored value
    const storedValue = await deployedContract.methods.get().call();
    console.log("Stored value is:", storedValue);

  } catch (err) {
    console.error("An error occurred:", err);
  }
}

deployContract();
