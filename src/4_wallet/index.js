const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const util = require('ethereumjs-util');   
const Buffer = require('safe-buffer').Buffer
const {abi} = require('./abi.js')

const infuraKey = '91ef1d6a3e7740e993b3ff987b8b3ff1'
if ('' === infuraKey) {
  console.error('Please go to https://infura.io to get infuraKey (PROJECT ID)')
  return -1
}
const web3 = new Web3(`https://kovan.infura.io/v3/${infuraKey}`);

async function transferEther(account, toAddress, amount) {
  const txCount = await web3.eth.getTransactionCount(account.address)
  var rawTx = {
    from: '0xf3480FE912c9bb8a92c272A8E22F55bfFc89155a',
    nonce: '0x' + txCount.toString(16),
    gasPrice: '0x003B9ACA00',
    // gasPrice: util.bufferToHex(9 * 10 ** 9),
    // gasLimit: util.bufferToHex(100000),
    gasLimit: '0x250CA',
    to: toAddress,
    value: util.bufferToHex(amount),
    data: '0x0'
  }

  let tx = new Tx(rawTx, { chain: 'kovan' })
  tx.sign(new Buffer.from(account.privateKey, 'hex'))

  let serializedTx = tx.serialize()

  const result = await web3.eth.sendSignedTransaction('0x' + 
    serializedTx.toString('hex'))
  console.log(`result`, result)
  // .on('receipt', console.log);
  return true
}

async function voteCandidate(account, name) {
   
  const contractAddress = '0x3b3b2B801365E85e5E5392Cdb2b2B4a0AC4c8547'
  const txCount = await web3.eth.getTransactionCount(account.address)
  const contract = new web3.eth.Contract(
    abi, 
    contractAddress,
    {from: account.address})

  var rawTx = {
    from: '0x55509eC248c859e15293189548a8b79E2306e0CD',
    nonce: '0x' + txCount.toString(16),
    gasPrice: '0x003B9ACA00',
    // gasPrice: util.bufferToHex(9 * 10 ** 9),
    // gasLimit: util.bufferToHex(100000),
    gasLimit: '0x250CA',
    to: contractAddress,
    value: '0x0',
    data: contract.methods.voteForCandidate(name).encodeABI()
  }

  let tx = new Tx(rawTx, { chain: 'kovan' })
  tx.sign(new Buffer.from(account.privateKey, 'hex'))

  let serializedTx = tx.serialize()

  const result = await web3.eth.sendSignedTransaction('0x' + 
    serializedTx.toString('hex'))
  console.log(`result`, result)
  // .on('receipt', console.log);
  return true
}

async function main() {
  const currentBlockNum = await web3.eth.getBlockNumber()
  console.log(`currentBlockNum ${currentBlockNum}`)

  // Generate account
  const result = await web3.eth.accounts.create()
  console.log(`account: ${JSON.stringify(result)}`)
  const account = {
    "address":"0xf3480FE912c9bb8a92c272A8E22F55bfFc89155a",
    "privateKey":"B09961977A9B7EA74362BA2FB9C41F9A6F80932FE5E64EEFF33BDA2C3CEA8056"
  }

  // Get balance
  const balance = await web3.eth.getBalance(account.address)
  console.log(`balance ${balance}`)

  // transfer
  // await transferEther(account, '0x786F95663B1fEAa429FE608dd51946356f9e6D54', 12)

  // Vote
  voteCandidate(account, 'PIG')

  return true
}


(async () => {
  const result = await main()
  console.log('result', result)
})()