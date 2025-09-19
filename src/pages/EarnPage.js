import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { TOKENS, ERC20_ABI } from "../utils/constants";
import { signer, getTokenBalance, payToken } from "../utils/web3";
import { useTransaction } from "../hooks/useTransaction";
import { TaskContext } from "../context/TaskContext";

const tasksList = [
  { id: 1, name: "每日签到", reward: 5, claimed: false },
  { id: 2, name: "完成任务A", reward: 10, claimed: false },
];

const EarnPage = () => {
  const [tasks, setTasks] = useState(tasksList);
  const [selectedToken, setSelectedToken] = useState(TOKENS[1]);
  const [balance, setBalance] = useState(0);
  const { earnPending, setEarnPending } = useContext(TaskContext);
  const { loading, message, startTransaction, endTransaction } = useTransaction();

  const fetchBalance = async () => {
    if (!signer) return;
    const account = await signer.getAddress();
    const contract = new ethers.Contract(selectedToken.address, ERC20_ABI, signer);
    const bal = await getTokenBalance(contract, account, selectedToken.decimals);
    setBalance(bal);
    setEarnPending(tasks.some(t => !t.claimed && t.reward <= bal));
  };

  useEffect(() => { fetchBalance(); }, [tasks, selectedToken]);

  const handleClaim = async (task) => {
    if (task.reward > balance) { alert("余额不足"); return; }
    const tokenContract = new ethers.Contract(selectedToken.address, ERC20_ABI, signer);
    const parsedAmount = ethers.utils.parseUnits(task.reward.toString(), selectedToken.decimals);
    const tx = await payToken(tokenContract, parsedAmount, await signer.getAddress(), startTransaction, endTransaction);
    if (tx) setTasks(tasks.map(t => t.id === task.id ? { ...t, claimed: true } : t));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>赚币</h1>
      <select value={selectedToken.name} onChange={e => setSelectedToken(TOKENS.find(t => t.name === e.target.value))}>
        {TOKENS.map(t => <option key={t.name}>{t.name}</option>)}
      </select>
      <p>余额: {balance}</p>
      {tasks.map(t => (
        <div key={t.id} style={{ margin: "10px 0", border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
          <p>{t.name} - 奖励: {t.reward}</p>
          <button onClick={() => handleClaim(t)} disabled={t.claimed || loading}>{t.claimed ? "已领取" : "领取"}</button>
        </div>
      ))}
      {loading && <p>{message}</p>}
    </div>
  );
};

export default EarnPage;
