// src/hooks/useTransaction.js  v0.14
import { useState } from "react";

export const useTransaction = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const startTransaction = (msg = "交易确认中...") => {
    setMessage(msg);
    setLoading(true);
  };

  const endTransaction = (success = true) => {
    setMessage(success ? "交易成功！" : "交易失败！");
    setTimeout(() => {
      setLoading(false);
      setMessage("");
    }, 2000);
  };

  return { loading, message, startTransaction, endTransaction };
};
