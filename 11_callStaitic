const ethers = require('ethers');

const MATIC_URL = 'https://mainnet.infura.io/v3/49c2c9b9697347c69eaffe60e7d61e74';
const abiERC20 = [
    "event Transfer(address indexed from, address indexed to, uint amount)",
    "function transfer(address, uint) public returns (bool)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) public view returns(uint)"
];
const WALLET_ADDRESS = '0xe5856FEFB63D88fDdafD1B166E47DE486DF9845d'
const WALLET_BINANCE = '0x28C6c06298d514Db089934071355E5743bf21d60'

const provider = new ethers.providers.JsonRpcProvider(MATIC_URL)
const addressDai = '0x6B175474E89094C44Da98b954EedeAC495271d0F'
const contract = new ethers.Contract(addressDai, abiERC20, provider)

const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
const wallet = new ethers.Wallet(privateKey, provider)

const callStatic = async () => {
    const address = await wallet.getAddress()
    console.log("\n1. 读取测试钱包的DAI余额")
    const balanceDAI = await contract.balanceOf(address)
    console.log(`DAI持仓: ${ethers.utils.formatEther(balanceDAI)}\n`)

    console.log("\n2.  用callStatic尝试调用transfer转账1 DAI，msg.sender为V神地址")
    // 发起交易
    const tx = await contract.callStatic.transfer("vitalik.eth", ethers.utils.parseEther("10000"), {from: "vitalik.eth"})
    console.log(`交易会成功吗？：`, tx)

    console.log("\n3.  用callStatic尝试调用transfer转账1 DAI，msg.sender为测试钱包地址")
    const tx2 = await contract.callStatic.transfer("vitalik.eth", ethers.utils.parseEther("10000"), {from: address})
    console.log(`交易会成功吗？：`, tx)
}

callStatic()