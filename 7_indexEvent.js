const ethers = require('ethers');
const MATIC_URL = 'https://polygon-mainnet.infura.io/v3/49c2c9b9697347c69eaffe60e7d61e74';
const abiERC20 = [
    "event Transfer(address indexed from, address indexed to, uint amount)",
    "function decimals() view returns (uint8)"
];
const WALLET_ADDRESS = '0xe5856FEFB63D88fDdafD1B166E47DE486DF9845d'

const provider = new ethers.providers.JsonRpcProvider(MATIC_URL)
const addressUSDC = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
const contract = new ethers.Contract(addressUSDC, abiERC20, provider)

const readChain = async () => {
    const block = await provider.getBlockNumber()
    console.log(`当前区块高度: ${block}`);
    console.log(`打印事件详情:`);
    const transferEvents = await contract.queryFilter('Transfer', block - 5, block)
    const decimal = await contract.decimals()

    // 打印第1个Transfer事件
    console.log(transferEvents[0])

    // 解析Transfer事件的数据（变量在args中）
    console.log("\n2. 解析事件：")
    const amount = ethers.utils.formatUnits(ethers.BigNumber.from(transferEvents[0].args["amount"]), decimal);
    for (let event in transferEvents) {
        const amountTransfer = ethers.utils.formatUnits(ethers.BigNumber.from(transferEvents[event].args["amount"]), decimal);
        console.log(`地址 ${transferEvents[event].args["from"]} 转账${amountTransfer} USDC 到地址 ${transferEvents[event].args["to"]}`);
    }
}

readChain();