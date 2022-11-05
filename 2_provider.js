// 导入ethers包
// import { ethers } from "ethers";
// playcode免费版不能安装ethers，用这条命令，需要从网络上import包（把上面这行注释掉）
// import { ethers } from "https://cdn-cors.ethers.io/lib/ethers-5.6.9.esm.min.js";
const ethers = require('ethers');
// 利用Alchemy的rpc节点连接以太坊网络
// 准备 alchemy API 可以参考https://github.com/AmazingAng/WTFSolidity/blob/main/Topics/Tools/TOOL04_Alchemy/readme.md 
const ALCHEMY_MAINNET_URL = 'https://mainnet.infura.io/v3/49c2c9b9697347c69eaffe60e7d61e74';
const ALCHEMY_GOERLI_URL = 'https://goerli.infura.io/v3/49c2c9b9697347c69eaffe60e7d61e74';
// 连接以太坊主网
const providerETH = new ethers.providers.JsonRpcProvider(ALCHEMY_MAINNET_URL)
// 连接Goerli测试网
const providerGoerli = new ethers.providers.JsonRpcProvider(ALCHEMY_GOERLI_URL)

const provider = providerETH

const main = async () => {
    // 利用provider读取链上信息
    // 1. 查询vitalik在主网和Goerli测试网的ETH余额
    console.log("1. 查询vitalik在主网和Goerli测试网的ETH余额");
    const balance = await provider.getBalance(`vitalik.eth`);
    const balanceGoerli = await providerGoerli.getBalance(`vitalik.eth`);
    // 将余额输出在console（主网）
    console.log(`ETH Balance of vitalik: ${ethers.utils.formatEther(balance)} ETH`);
    // 输出Goerli测试网ETH余额
    console.log(`Goerli ETH Balance of vitalik: ${ethers.utils.formatEther(balanceGoerli)} ETH`);
    
    // 2. 查询provider连接到了哪条链
    console.log("\n2. 查询provider连接到了哪条链")
    const network = await provider.getNetwork();
    console.log(network);

    // 3. 查询区块高度
    console.log("\n3. 查询区块高度")
    const blockNumber = await provider.getBlockNumber();
    console.log(blockNumber);

    // 4. 查询当前gas price
    console.log("\n4. 查询当前gas price")
    const gasPrice = await provider.getGasPrice();
    console.log(gasPrice);

    // 5. 查询当前建议的gas设置
    console.log("\n5. 查询当前建议的gas设置")
    const feeData = await provider.getFeeData();
    console.log(feeData);

    // 6. 查询区块信息
    console.log("\n6. 查询区块信息")
    const block = await provider.getBlock(0);
    console.log(block);

    // 7. 给定合约地址查询合约bytecode，例子用的WETH地址
    console.log("\n7. 给定合约地址查询合约bytecode，例子用的WETH地址")
    const code = await provider.getCode("0xc778417e063141139fce010982780140aa0cd5ab");
    console.log(code);
}

main()