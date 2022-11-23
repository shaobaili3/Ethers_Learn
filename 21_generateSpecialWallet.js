const ethers = require('ethers');

var wallet // 钱包
const requiredAddress = "0x000000" // 表达式
var isValid = false
var count = 0
while(!isValid){
    count += 1
    wallet = ethers.Wallet.createRandom() // 随机生成钱包，安全
    subAddress = wallet.address.substring(0, requiredAddress.length)
    console.log(count, subAddress)
    if (subAddress == requiredAddress){
        break}
}
// 打印靓号地址与私钥
console.log(`靓号地址：${wallet.address}`)
console.log(`靓号私钥：${wallet.privateKey}`)
console.log(wallet.mnemonic)
