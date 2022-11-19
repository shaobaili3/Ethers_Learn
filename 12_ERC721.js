const ethers = require('ethers');

const MATIC_URL = 'https://mainnet.infura.io/v3/49c2c9b9697347c69eaffe60e7d61e74';
const abiERC721 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function supportsInterface(bytes4) public view returns(bool)",
];

const BAYC_ADDRESS = '0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d'

const provider = new ethers.providers.JsonRpcProvider(MATIC_URL)
const contract = new ethers.Contract(BAYC_ADDRESS, abiERC721, provider)


const callStatic = async () => {
    // 1. 读取ERC721合约的链上信息
    const nameERC721 = await contract.name()
    const symbolERC721 = await contract.symbol()
    console.log("\n1. 读取ERC721合约信息")
    console.log(`合约地址: ${BAYC_ADDRESS}`)
    console.log(`名称: ${nameERC721}`)
    console.log(`代号: ${symbolERC721}`)

    const selectorERC721 = "0x80ac58cd"
    const isERC721 = await contract.supportsInterface(selectorERC721)
    console.log("\n2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准")
    console.log(`合约是否为ERC721标准: ${isERC721}`)
}

callStatic()