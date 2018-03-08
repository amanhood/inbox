const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'depth bunker there combine chef this ticket wash dilemma industry scrub country',
    'https://rinkeby.infura.io/0M8v5xM6Ezvagr84zba0'
)

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments: ['Hi there!']})
    .send({ gas:'1000000',from:accounts[0]});

    console.log('Contract deloyed to', result.options.address);
};
