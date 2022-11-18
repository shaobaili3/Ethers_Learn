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

const listenContract = async () => {
    // 只监听一次
    console.log("\n1. 利用contract.once()，监听一次Transfer事件");
    contract.once('Transfer', (from, to, value)=>{
        // 打印结果
        console.log(
        `一次${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
        )
    })

    // 持续监听USDT合约
    console.log("\n2. 利用contract.on()，持续监听Transfer事件");
    contract.on('Transfer', (from, to, value)=>{
        console.log(
        // 打印结果
        `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
        )
    })
}

listenContract();