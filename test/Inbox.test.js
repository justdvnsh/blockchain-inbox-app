const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

// Web3 can be a considered as a class 
// whereas  web3  can be considered as an 
// instance

const web3 = new Web3(ganache.provider());
// ganache provider is like a sort of a  
// communication layer between the web3 and 
// ethereum network. 

let accounts, inbox;

beforeEach(() => {
	// get list of all accounts 
	accounts = web3.eth.getAccounts((error, 
fetchedAccounts) => {
	if(error) {return ;}
	console.log(fetchedAccounts)
})
	// use one of those accounts to 
	// deploy the contract.
	inbox = new web3.eth.contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!'] })
		.send({ from: accounts[0], gas:'100000' })
});

describe('Inbox', () => {
	it('deploys a contract' , () => {
		console.log(inbox)
	})
})

