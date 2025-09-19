// src/pages/ProfilePage.js  v0.14
import React, { useState, useEffect } from "react";
import { TOKENS, ERC20_ABI } from "../utils/constants";
import { signer, getTokenBalance } from "../utils/web3";

const ProfilePage = () => {
  const [balances, setBalances] = useState({});

  const fetchBalances = async () => {
    if (!signer) return;
    const account = await signer.getAddress();
    const newBalances = {};
    for (let token of TOKENS) {
      const contract = new ethers.Contract(token.address, ERC20_ABI, signer);
      const bal = await getTokenBalance(contract, account, token.decimals);
      newBalances[token.name] = bal;
    }
    setBalances(newBalances);
  };

  useEffect(() => { fetchBalances(); }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>我的</h1>
      {TOKENS.map(t => (
        <div key={t.name} style={{ margin: "10px 0" }}>
          {t.name}余额: {balances[t.name] || 0}
        </div>
      ))}
      <div style={{ marginTop: "20px" }}>
        <button>查看拼团/赚币/兑换历史</button>
        <button>管理授权</button>
      </div>
    </div>
  );
};

export default ProfilePage;
