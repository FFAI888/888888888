// src/pages/GroupPage.js  v0.14
import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { TOKENS, ERC20_ABI } from "../utils/constants";
import { signer, payToken, getTokenBalance } from "../utils/web3";
import { useTransaction } from "../hooks/useTransaction";
import { TaskContext } from "../context/TaskContext";

const CONTRACT_ADDRESS = "0x你的合约地址";
const initialGroups = [
  { id: 1, name: "拼团 A", price: 10, joined: false },
  { id: 2, name: "拼团 B", price: 15, joined: false },
];

const GroupPage = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [selectedToken, setSelectedToken] = useState(TOKENS[0]);
  const [amounts, setAmounts] = useState({});
  const [balance, setBalance] = useState(0);
  const { groupPending, setGroupPending } = useContext(TaskContext);
  const { loading, message, startTransaction, endTransaction } = useTransaction();

  const fetchBalance = async () => {
    if (!signer) return;
    const account = await signer.getAddress();
    const contract = new ethers.Contract(selectedToken.address, ERC20_ABI, signer);
    const bal = await getTokenBalance(contract, account, selectedToken.decimals);
    setBalance(bal);
    setGroupPending(groups.some(g => !g.joined && g.price <= bal));
  };

  useEffect(() => { fetchBalance(); }, [selectedToken, groups]);

  const handleAmountChange = (id, value) => {
    setAmounts({ ...amounts, [id]: Math.floor(Number(value) || 0) });
  };

  const handleJoin = async (group) => {
    const amountToPay = amounts[group.id] || group.price;
    if (amountToPay > balance) { alert("余额不足"); return; }
    const tokenContract = new ethers.Contract(selectedToken.address, ERC20_ABI, signer);
    const parsedAmount = ethers.utils.parseUnits(amountToPay.toString(), selectedToken.decimals);
    const tx = await payToken(tokenContract, parsedAmount, CONTRACT_ADDRESS, startTransaction, endTransaction);
    if (tx) setGroups(groups.map(g => g.id === group.id ? { ...g, joined: true } : g));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>拼团</h1>
      <select value={selectedToken.name} onChange={e => setSelectedToken(TOKENS.find(t => t.name === e.target.value))}>
        {TOKENS.map(t => <option key={t.name}>{t.name}</option>)}
      </select>
      <p>余额: {balance}</p>
      {groups.map(g => (
        <div key={g.id} style={{ margin: "10px 0", border: "1px solid #ddd", padding: "10px", borderRadius: "10px" }}>
          <p>{g.name} - 价格: {g.price}</p>
          <input type="number" value={amounts[g.id] || g.price} step="1" onChange={e => handleAmountChange(g.id, e.target.value)} />
          <button onClick={() => handleJoin(g)} disabled={g.joined || loading}>{g.joined ? "已加入" : "加入拼团"}</button>
        </div>
      ))}
      {loading && <p>{message}</p>}
    </div>
  );
};

export default GroupPage;
