let Web3 = require('web3')
// let url = 'https://mainnet.infura.io/v3/API_KEY'
let url = 'https://mainnet.infura.io/v3/91ef1d6a3e7740e993b3ff987b8b3ff1'
let web3 = new Web3(url)
// const address = '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'    // BNB 
const address = '0xdac17f958d2ee523a2206206994597c13d831ec7'  // USDT
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"withdrawEther","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"unfreeze","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"freezeOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"freeze","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"decimalUnits","type":"uint8"},{"name":"tokenSymbol","type":"string"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Freeze","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Unfreeze","type":"event"}]

// contract or holder address to check balance
web3.eth.getBalance(address, (err, balance) => {
    console.log( balance , ' wei')
    console.log(web3.utils.fromWei(balance, 'gwei'), ' gwei')
    console.log(web3.utils.fromWei(balance, 'Gwei'), ' GWei')
    console.log(web3.utils.fromWei(balance, 'ether'), ' ether')
})

// Contract creation
// console.log('Account: ',web3.eth.accounts.create())


const contract = new web3.eth.Contract(abi, address)
console.log('contract: ', contract._address  )
// console.log('method: ', contract.methods  )
contract.methods.name().call()
   .then( res => console.log('name: ', res) )
   .catch(err => console.log(err))
contract.methods.symbol().call()
   .then( res => console.log('symbol: ', res))
   .catch(err => console.log(err))
contract.methods.totalSupply().call()
   .then(res  => console.log('totalSupply: ', res))
   .catch(err => console.log(err))
contract.methods.balanceOf('0x9f9127b0efac7dd0434c6dfb8757db43d331c8d5').call()
   .then(res => console.log('balanceOf: ', res))
   .catch(err => console.log(err))