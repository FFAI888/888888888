// src/pages/LoginPage.js  v0.14
import React from "react";
import { connectWallet } from "../utils/web3";

const LoginPage = ({ onLogin }) => {
  const handleLogin = async () => {
    const user = await connectWallet();
    if (user) onLogin(user.address);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>欢迎登录</h1>
      <button onClick={handleLogin}>连接钱包</button>
    </div>
  );
};

export default LoginPage;
