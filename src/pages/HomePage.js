import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { TOKENS, ERC20_ABI } from "../utils/constants";
import { signer, getTokenBalance } from "../utils/web3";

const HomePage = () => {
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
      <h1>首页</h1>
      {TOKENS.map(t => (
        <div key={t.name} style={{ margin: "10px 0" }}>
          {t.name}余额: {balances[t.name] || 0}
        </div>
      ))}
    </div>
  );
};

export default HomePage;
