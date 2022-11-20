const ethers = require('ethers');

const MAIN_URL = 'https://goerli.infura.io/v3/49c2c9b9697347c69eaffe60e7d61e74';
const abiWETH = [
    "function balanceOf(address) public view returns(uint)",
    "function deposit() public payable",
    "function withdraw() public"
];

const addressWETH = '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6'
// 利用私钥和provider创建wallet对象
const privateKey = '0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b'
const provider = new ethers.providers.JsonRpcProvider(MAIN_URL)
const wallet = new ethers.Wallet(privateKey, provider)
const contract = new ethers.Contract(addressWETH, abiWETH, provider)

const calldata = async () => {
    const balance = await provider.getBalance(wallet.address)
    console.log('余额ETH:', ethers.utils.formatEther(balance))

    const address = await wallet.getAddress()
    // 1. 读取WETH合约的链上信息（WETH abi）
    console.log("\n1. 读取WETH余额")
    // 编码calldata
    const param1 = contract.interface.encodeFunctionData(
        "balanceOf",
        [address]
      );
    console.log(`编码结果： ${param1}`)
    // 创建交易
    const tx1 = {
        to: addressWETH,
        data: param1
    }
    // 发起交易，可读操作（view/pure）可以用 provider.call(tx)
    const balanceWETH = await provider.call(tx1)

    //cannot get if no balance
    console.log(balanceWETH)
    console.log(`存款前WETH持仓: ${ethers.utils.formatEther(balanceWETH)}\n`)


    // 编码calldata
    const param = contract.interface.encodeFunctionData(
        "withdraw"          
        );
    console.log(`编码结果： ${param}`)
    // 创建交易
    const tx = {
        to: addressWETH,
        data: param,
        value: ethers.utils.parseEther("0.001")}
    // 发起交易，写入操作需要 wallet.sendTransaction(tx)
    const receipt = await wallet.sendTransaction(tx)
    // 等待交易上链
    await receipt.wait()
    console.log(`交易详情：`)
    console.log(receipt)
    const balanceWETH_withdraw = await contract.balanceOf(address)
    console.log(`存款后WETH持仓: ${ethers.utils.formatEther(balanceWETH_withdraw)}\n`)

    // 编码calldata
    const param2 = contract.interface.encodeFunctionData(
        "deposit"          
        );
    console.log(`编码结果： ${param2}`)
    // 创建交易
    const tx2 = {
        to: addressWETH,
        data: param2,
        value: ethers.utils.parseEther("0.001")}
    // 发起交易，写入操作需要 wallet.sendTransaction(tx)
    const receipt1 = await wallet.sendTransaction(tx2)
    // 等待交易上链
    await receipt1.wait()
    console.log(`交易详情：`)
    console.log(receipt1)
    const balanceWETH_deposit = await contractWETH.balanceOf(address)
    console.log(`存款后WETH持仓: ${ethers.utils.formatEther(balanceWETH_deposit)}\n`)
}

calldata()