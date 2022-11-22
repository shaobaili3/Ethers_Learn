const ethers = require('ethers');

// 生成随机助记词
const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32))
// 创建HD钱包
const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
console.log(hdNode);

const numWallet = 20
// 派生路径：m / purpose' / coin_type' / account' / change / address_index
// 我们只需要切换最后一位address_index，就可以从hdNode派生出新钱包
// m: 固定为"m"
// purpose：固定为"44"
// coin_type：代币类型，比特币主网为0，比特币测试网为1，以太坊主网为60
// account：账户索引，从0开始。
// change：是否为外部链，0为外部链，1为内部链，一般填0.
// address_index：地址索引，从0开始，想生成新地址就把这里改为1，2，3。
// 举个例子，以太坊的默认衍生路径为"m/44'/60'/0'/0/0"。
let basePath = "m/44'/60'/0'/0";
let wallets = [];
for (let i = 0; i < numWallet; i++) {
    let hdNodeNew = hdNode.derivePath(basePath + "/" + i);
    let walletNew = new ethers.Wallet(hdNodeNew.privateKey);
    console.log(`第${i+1}个钱包地址： ${walletNew.address}`)
    wallets.push(walletNew);
}

const calldata = async () => {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic)
    console.log("通过助记词创建钱包：")
    console.log(wallet)
    // 加密json用的密码，可以更改成别的
    const pwd = "password"
    const json = await wallet.encrypt(pwd)
    console.log("钱包的加密json：")
    console.log(json)

    const wallet2 = await ethers.Wallet.fromEncryptedJson(json, pwd);
    console.log("\n4. 从加密json读取钱包：")
    console.log(wallet2)
}

calldata()

