import { useState, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import { Menu } from "lucide-react";
import "./layout.css";

export interface ChatContext {
  resetKey: number;
}

function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
      if (e.matches) {
        setMobileSidebarOpen(false);
      }
    };
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleResetChat = useCallback(() => {
    setResetKey((k) => k + 1);
  }, []);

  const handleToggleSidebar = useCallback(() => {
    if (isMobile) {
      setMobileSidebarOpen((v) => !v);
    } else {
      setSidebarCollapsed((v) => !v);
    }
  }, [isMobile]);

  const handleMobileClose = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={isMobile ? false : sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggle={handleToggleSidebar}
        onResetChat={handleResetChat}
        onMobileClose={handleMobileClose}
      />
      {isMobile && mobileSidebarOpen && (
        <div className="sidebar-backdrop" onClick={handleMobileClose} />
      )}
      {isMobile && (
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileSidebarOpen(true)}
          aria-label="Buka sidebar"
        >
          <Menu size={20} />
        </button>
      )}
      <main className="main-content">
        <Outlet context={{ resetKey } satisfies ChatContext} />
      </main>
    </div>
  );
}

export default Layout;
