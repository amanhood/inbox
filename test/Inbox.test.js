const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);
const {interface,bytecode} = require('../compile');

let accounts;
let inbox;


beforeEach (async() => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //Use one of those accounts to deploy contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi,there!']})
    .send({from: accounts[0], gas: '1000000'});
});

describe('inbox', () => {
    it('deploy a contract',() => {
        assert.ok(inbox.options.address);
    });
    it('get a default msg', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message,'Hi,there!');
    });
    it('set msg', async () => {
        await inbox.methods.setMessage("changed msg").send({from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message,'changed msg');
    });
});
