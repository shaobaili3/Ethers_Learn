const ethers = require('ethers');
const MATIC_URL = 'https://polygon-mainnet.infura.io/v3/49c2c9b9697347c69eaffe60e7d61e74';
const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
    "function decimals() view returns (uint8)"
];
const WALLET_ADDRESS = '0xe5856FEFB63D88fDdafD1B166E47DE486DF9845d'

const provider = new ethers.providers.JsonRpcProvider(MATIC_URL)
const addressUSDC = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
const contractUSDC = new ethers.Contract(addressUSDC, abiERC20, provider)

const readChain = async () => {
    const balance = await provider.getBalance(WALLET_ADDRESS);
    const decimalMatic = await provider.getNetwork()
    console.log(`Balance: ${ethers.utils.formatEther(balance)} Matic`);
    console.log(decimalMatic)


    const name = await contractUSDC.name()
    const symbol = await contractUSDC.symbol()
    const totalSupply = await contractUSDC.totalSupply()
    const decimals = await contractUSDC.decimals()
    const balanceUSDC = await contractUSDC.balanceOf(WALLET_ADDRESS)
    console.log(name, symbol, ethers.utils.formatUnits(totalSupply, decimals), decimals)
    console.log('Balance:', ethers.utils.formatUnits(balanceUSDC, decimals))
}

readChain();