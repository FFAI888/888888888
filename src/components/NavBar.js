// src/components/NavBar.js  v0.14
import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

const NavBar = ({ current, setCurrent }) => {
  const { groupPending, earnPending, exchangePending } = useContext(TaskContext);

  return (
    <div style={{ display: "flex", justifyContent: "space-around", padding: "10px", borderTop: "1px solid #ccc" }}>
      <div onClick={() => setCurrent("home")}>首页</div>
      <div onClick={() => setCurrent("group")}>
        拼团 {groupPending && <span style={{ color: "red" }}>•</span>}
      </div>
      <div onClick={() => setCurrent("earn")}>
        赚币 {earnPending && <span style={{ color: "red" }}>•</span>}
      </div>
      <div onClick={() => setCurrent("exchange")}>
        兑换 {exchangePending && <span style={{ color: "red" }}>•</span>}
      </div>
      <div onClick={() => setCurrent("profile")}>我的</div>
    </div>
  );
};

export default NavBar;
