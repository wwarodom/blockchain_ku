const rtUrl= 'https://ropsten.infura.io/v3/91ef1d6a3e7740e993b3ff987b8b3ff1'

const Tx = require('ethereumjs-tx').Transaction
const Web3 = require('web3')
const web3 = new Web3(rtUrl)

// ======  First use to create account ===
// console.log('Account1 : ',web3.eth.accounts.create())
// console.log('Account2 : ',web3.eth.accounts.create())

const account1 = '0xf3480FE912c9bb8a92c272A8E22F55bfFc89155a' // Your account address 1
const account2 = '0xda80Ae551aF4444d5595aC3fEE6a21E3DfEaCa1e' // Your account address 2

const pk1 = '0xb09961977a9b7ea74362ba2fb9c41f9a6f80932fe5e64eeff33bda......'
const pk2 = '0xe8fa110ca7157e05ba80e6dbb474b51a65cc30e7e4f4e3a33086f996....'

const privateKey1 = Buffer.from(pk1.substr(2), 'hex')
const privateKey2 = Buffer.from(pk2.substr(2), 'hex') 

web3.eth.getTransactionCount(account1, (err, txCount) => {
   // Build the transaction
   const txObject = {
       nonce:    web3.utils.toHex(txCount),
       to:       account2,
       value:    web3.utils.toHex(web3.utils.toWei('0.01', 'ether')),
       gasLimit: web3.utils.toHex(21000),
       gasPrice: web3.utils.toHex(web3.utils.toWei('1', 'gwei'))
   }

   console.log( txObject)
   // Sign the transaction
   const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
   tx.sign(privateKey1)

   const serializedTx = tx.serialize()
   const raw = '0x' + serializedTx.toString('hex')
   console.log('raw: ', raw)

   // Broadcast the transaction
   web3.eth.sendSignedTransaction(raw, (err, txHash) => {
       console.log('txHash:', txHash) 
       // Now go check etherscan to see the transaction!
   })
})
