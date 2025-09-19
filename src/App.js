import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import ConfirmPage from "./pages/ConfirmPage";
import HomePage from "./pages/HomePage";
import GroupPage from "./pages/GroupPage";
import EarnPage from "./pages/EarnPage";
import ExchangePage from "./pages/ExchangePage";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./components/NavBar";
import { TaskProvider } from "./context/TaskContext";

function App() {
  const [user, setUser] = useState(null);
  const [current, setCurrent] = useState("login");
  const [confirmed, setConfirmed] = useState(false);

  if (!user) return <LoginPage onLogin={(address) => { setUser(address); setCurrent("confirm"); }} />;
  if (!confirmed && current === "confirm") return <ConfirmPage onConfirm={() => { setConfirmed(true); setCurrent("home"); }} />;

  let PageComponent;
  switch (current) {
    case "home": PageComponent = <HomePage />; break;
    case "group": PageComponent = <GroupPage />; break;
    case "earn": PageComponent = <EarnPage />; break;
    case "exchange": PageComponent = <ExchangePage />; break;
    case "profile": PageComponent = <ProfilePage />; break;
    default: PageComponent = <HomePage />;
  }

  return (
    <TaskProvider>
      <div style={{ minHeight: "90vh" }}>
        {PageComponent}
      </div>
      <NavBar current={current} setCurrent={setCurrent} />
    </TaskProvider>
  );
}

export default App;
