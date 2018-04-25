const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

// Web3 can be a considered as a class 
// whereas  web3  can be considered as an 
// instance

const provider = ganache.provider()

const web3 = new Web3(provider);
// ganache provider is like a sort of a  
// communication layer between the web3 and 
// ethereum network. 

let accounts, inbox;

beforeEach(async () => {
	// get list of all accounts 
	accounts = await web3.eth.getAccounts()
	// use one of those accounts to 
	// deploy the contract.
	inbox = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode, arguments: ['Hi there!'] })
		.send({ from: accounts[0], gas:'1000000' })

	inbox.setProvider(provider);
});

describe('Inbox', () => {
	it('deploys a contract' , () => {
		//console.log(accounts)
		//console.log(inbox)
		assert.ok(inbox.options.address)
	})

	it('has an initial message', async () => {
		const message = await inbox.methods.message().call();
		assert.equal(message, 'Hi there!')

		// message() is used to pass any arguments if the method calls for it.
		// call() is to actually tell what to do do.
		// i.e. if we need to call the func or send a transaction.
	})

	it('can change the message', async () => {
		await inbox.methods.setMessage('bye').send({ from: accounts[0] })
		// as calling a function costs money or ether.
		// we recieve the transaction hash as the transaction reciept.
		const message = await inbox.methods.message().call()
		assert.equal(message, 'bye')
	})
})

