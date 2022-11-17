const ethers = require("ethers");
const MATIC_URL =
  "https://goerli.infura.io/v3/49c2c9b9697347c69eaffe60e7d61e74";
const abiERC20 = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
  "function decimals() view returns (uint8)",
];
const WALLET_ADDRESS = "0xe5856FEFB63D88fDdafD1B166E47DE486DF9845d";

const provider = new ethers.providers.JsonRpcProvider(MATIC_URL);
const addressUSDC = "0x2791bca1f2de4661ed88a30c99a7a9449aa84174";
const contractUSDC = new ethers.Contract(addressUSDC, abiERC20, provider);

// 创建随机的wallet对象
const wallet1 = ethers.Wallet.createRandom();
const wallet1WithProvider = wallet1.connect(provider);
const mnemonic = wallet1.mnemonic; // 获取助记词

// 利用私钥和provider创建wallet对象
const privateKey =
  "0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b";
const wallet2 = new ethers.Wallet(privateKey, provider);
const mnemonic2 = wallet2.mnemonic

// 从助记词创建wallet对象 
// cannot get mnemonic from private key
const wallet3 = ethers.Wallet.fromMnemonic(mnemonic.phrase);

const sendETH = async () => {
  const address1 = await wallet1.getAddress();
  const address2 = await wallet2.getAddress();
  const address3 = await wallet3.getAddress(); // 获取地址
  console.log(`1. 获取钱包地址`);
  console.log(`钱包1地址: ${address1}`);
  console.log(`钱包2地址: ${address2}`);
  console.log(`钱包3地址: ${address3}`);
  console.log(`钱包1和钱包3的地址是否相同: ${address1 === address3}`);

  console.log('无法获取私钥助记词', mnemonic2)

  const txCount1 = await wallet1WithProvider.getTransactionCount()
  const txCount2 = await wallet2.getTransactionCount()
  console.log(`钱包1发送交易次数: ${txCount1}`)
  console.log(`钱包2发送交易次数: ${txCount2}`)

  console.log(`\n5. 发送ETH（测试网）`);
  // i. 打印交易前余额
  console.log(`i. 发送前余额`)
  console.log(`钱包1: ${ethers.utils.formatEther(await wallet1WithProvider.getBalance())} ETH`)
  console.log(`钱包2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`)
  // ii. 构造交易请求，参数：to为接收地址，value为ETH数额
  const tx = {
      to: address1,
      value: ethers.utils.parseEther("0.0000001"),
      gasLimit: 3000
  }
  // iii. 发送交易，获得收据
  console.log(`\nii. 等待交易在区块链确认（需要几分钟）`)
  const receipt = await wallet2.sendTransaction(tx)
  await receipt.wait() // 等待链上确认交易
  console.log(receipt) // 打印交易详情
  // iv. 打印交易后余额
  console.log(`\niii. 发送后余额`)
  console.log(`钱包1: ${ethers.utils.formatEther(await wallet1WithProvider.getBalance())} ETH`)
  console.log(`钱包2: ${ethers.utils.formatEther(await wallet2.getBalance())} ETH`)
};

sendETH()