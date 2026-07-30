import { useState, useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import SettingsModal from "../components/settings/SettingsModal";
import { Menu } from "lucide-react";
import "./layout.css";

type Font = "sans-serif" | "serif";

export interface ChatContext {
  resetKey: number;
  onOpenSettings: () => void;
  font: Font;
}

function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [font, setFont] = useState<Font>("sans-serif");

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

  const handleOpenSettings = useCallback(() => {
    setSettingsOpen(true);
  }, []);

  const handleCloseSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const handleFontChange = useCallback((f: Font) => {
    setFont(f);
  }, []);

  return (
    <div className="app-layout">
      <Sidebar
        collapsed={isMobile ? false : sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggle={handleToggleSidebar}
        onResetChat={handleResetChat}
        onMobileClose={handleMobileClose}
        onOpenSettings={handleOpenSettings}
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
        <Outlet context={{ resetKey, onOpenSettings: handleOpenSettings, font } satisfies ChatContext} />
      </main>
      <SettingsModal
        open={settingsOpen}
        onClose={handleCloseSettings}
        font={font}
        onFontChange={handleFontChange}
      />
    </div>
  );
}

export default Layout;
