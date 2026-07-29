import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import "./layout.css";

export interface ChatContext {
  resetKey: number;
}

function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleResetChat = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
        onResetChat={handleResetChat}
      />
      <main className="main-content">
        <Outlet context={{ resetKey } satisfies ChatContext} />
      </main>
    </div>
  );
}

export default Layout;
