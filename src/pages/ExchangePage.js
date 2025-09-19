import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { TOKENS, ERC20_ABI } from "../utils/constants";
import { signer, getTokenBalance, payToken } from "../utils/web3";
import { useTransaction } from "../hooks/useTransaction";
import { TaskContext } from "../context/TaskContext";

const EXCHANGE_ADDRESS = "0x兑换合约地址";

const ExchangePage = () => {
  const [selectedToken, setSelectedToken] = useState(TOKENS[2]);
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const { exchangePending, setExchangePending } = useContext(TaskContext);
  const { loading, message, startTransaction, endTransaction } = useTransaction();

  const fetchBalance = async () => {
    if (!signer) return;
    const account = await signer.getAddress();
    const contract = new ethers.Contract(selectedToken.address, ERC20_ABI, signer);
    const bal = await getTokenBalance(contract, account, selectedToken.decimals);
    setBalance(bal);
    setExchangePending(amount <= bal && amount > 0);
  };

  useEffect(() => { fetchBalance(); }, [selectedToken, amount]);

  const handleExchange = async () => {
    if (amount > balance) { alert("余额不足"); return; }
    const tokenContract = new ethers.Contract(selectedToken.address, ERC20_ABI, signer);
    const parsedAmount = ethers.utils.parseUnits(amount.toString(), selectedToken.decimals);
    await payToken(tokenContract, parsedAmount, EXCHANGE_ADDRESS, startTransaction, endTransaction);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>兑换</h1>
      <select value={selectedToken.name} onChange={e => setSelectedToken(TOKENS.find(t => t.name === e.target.value))}>
        {TOKENS.map(t => <option key={t.name}>{t.name}</option>)}
      </select>
      <p>余额: {balance}</p>
      <input type="number" value={amount} step="1" onChange={e => setAmount(Math.floor(Number(e.target.value) || 0))} />
      <button onClick={handleExchange} disabled={loading}>兑换</button>
      {loading && <p>{message}</p>}
    </div>
  );
};

export default ExchangePage;
