const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

// Web3 can be a considered as a class 
// whereas  web3  can be considered as an 
// instance

const web3 = new Web3(ganache.provider());
// ganache provider is like a sort of a  
// communication layer between the web3 and 
// ethereum network. 
