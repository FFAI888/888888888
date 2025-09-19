import React from "react";

const ConfirmPage = ({ onConfirm }) => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>确认关系</h2>
      <p>请确认你的关系信息。</p>
      <button onClick={onConfirm}>确认</button>
    </div>
  );
};

export default ConfirmPage;
