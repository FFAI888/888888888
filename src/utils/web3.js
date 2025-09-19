// src/utils/web3.js  v0.14
import { ethers } from "ethers";

export let signer;
export let provider;

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      const network = await provider.getNetwork();
      if (network.chainId !== 56) {
        alert("请切换到 BSC 主网");
        throw new Error("非 BSC 链");
      }
      const address = await signer.getAddress();
      return { provider, signer, address };
    } catch (err) {
      console.error(err);
      alert("钱包连接失败：" + err.message);
      return null;
    }
  } else {
    alert("请安装 MetaMask 钱包");
    return null;
  }
};

// 查询 ERC20 余额
export const getTokenBalance = async (tokenContract, account, decimals) => {
  const bal = await tokenContract.balanceOf(account);
  return Math.floor(parseFloat(ethers.utils.formatUnits(bal, decimals)));
};

// 支付交易封装
export const payToken = async (tokenContract, amount, toAddress, startTransaction, endTransaction) => {
  try {
    startTransaction(`请确认支付 ${amount.toString()} 个代币`);
    const tx = await tokenContract.transfer(toAddress, amount);
    await tx.wait();
    endTransaction(true);
    return tx;
  } catch (err) {
    console.error(err);
    endTransaction(false);
    return null;
  }
};
