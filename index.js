// index.js
const { Web3 } = require('web3');

// Connect to local Geth node
const web3 = new Web3('http://127.0.0.1:8545');

web3.eth.net.isListening()
  .then(() => {
    return web3.eth.getBalance('0x49c5480508AF07C715F320D87FDa70e85724b508');
  })
  .then((blockNumber) => {
    console.log("Current block number:", blockNumber);
  })
  .catch((err) => {
    console.error("Error:", err);
  });