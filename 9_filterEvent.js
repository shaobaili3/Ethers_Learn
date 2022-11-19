const ethers = require('ethers');

const MATIC_URL = 'https://mainnet.infura.io/v3/49c2c9b9697347c69eaffe60e7d61e74';
const abiERC20 = [
    "event Transfer(address indexed from, address indexed to, uint amount)",
    "function decimals() view returns (uint8)",
    "function balanceOf(address) public view returns(uint)"
];
const WALLET_ADDRESS = '0xe5856FEFB63D88fDdafD1B166E47DE486DF9845d'
const WALLET_BINANCE = '0x28C6c06298d514Db089934071355E5743bf21d60'

const provider = new ethers.providers.JsonRpcProvider(MATIC_URL)
const addressUSDT = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const contract = new ethers.Contract(addressUSDT, abiERC20, provider)

const listenContract = async () => {
    const balanceUSDT = await contract.balanceOf(WALLET_BINANCE)
    console.log(`USDT余额: ${ethers.utils.formatUnits(balanceUSDT,6)}\n`)
    console.log("\n2. 创建过滤器，监听转移USDT进交易所")
    let filterBinanceIn = contract.filters.Transfer(null, WALLET_BINANCE);
    console.log("过滤器详情：")
    console.log(filterBinanceIn);
    contract.on(filterBinanceIn, (from, to, value) => {
    console.log('---------监听USDT进入交易所--------');
    console.log(
        `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
    )
    }).on('error', (error) => {
    console.log(error)
    })

    let filterToBinanceOut = contract.filters.Transfer(WALLET_BINANCE, null);
    console.log("\n3. 创建过滤器，监听转移USDT出交易所")
    console.log("过滤器详情：")
    console.log(filterToBinanceOut);
    contract.on(filterToBinanceOut, (from, to, value) => {
    console.log('---------监听USDT转出交易所--------');
    console.log(
        `${from} -> ${to} ${ethers.utils.formatUnits(ethers.BigNumber.from(value),6)}`
    )
    }
    ).on('error', (error) => {
    console.log(error)
});
}

listenContract();