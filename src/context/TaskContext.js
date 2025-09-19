import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [groupPending, setGroupPending] = useState(false);
  const [earnPending, setEarnPending] = useState(false);
  const [exchangePending, setExchangePending] = useState(false);

  return (
    <TaskContext.Provider value={{
      groupPending, setGroupPending,
      earnPending, setEarnPending,
      exchangePending, setExchangePending
    }}>
      {children}
    </TaskContext.Provider>
  );
};
