import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Palette, LogOut } from "lucide-react";
import data from "./settingsData.json";
import "./settings.css";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  onLogout?: () => void;
  initialUsername?: string;
  userId?: string;
  namaAsli?: string;
}

type Section = "akun" | "tampilan";
type Theme = "dark" | "light" | "system";
type Font = "sans-serif" | "serif";

const sidebarIcons: Record<Section, typeof User> = {
  akun: User,
  tampilan: Palette,
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, duration: 0.35, bounce: 0.15 },
  },
  exit: { opacity: 0, scale: 0.95, y: 16, transition: { duration: 0.15 } },
};

function SettingsModal({
  open,
  onClose,
  onLogout,
  initialUsername = "Pengguna",
  userId = "USR-001",
  namaAsli = "Pengguna",
}: SettingsModalProps) {
  const [activeSection, setActiveSection] = useState<Section>("akun");
  const [username, setUsername] = useState(initialUsername);
  const [theme, setTheme] = useState<Theme>("dark");
  const [font, setFont] = useState<Font>("sans-serif");

  const handleClose = useCallback(() => {
    setActiveSection("akun");
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence onExitComplete={handleClose}>
      {open && (
        <motion.div
          className="settings-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            className="settings-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="settings-header">
              <span className="settings-header-title">{data.title}</span>
              <button
                type="button"
                className="settings-close-btn"
                aria-label={data.closeAriaLabel}
                onClick={onClose}
              >
                <X size={18} />
              </button>
            </div>

            <div className="settings-body">
              <nav className="settings-sidebar">
                {(Object.keys(data.sidebar) as Section[]).map((key) => {
                  const Icon = sidebarIcons[key];
                  const isActive = activeSection === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      className={
                        "settings-sidebar-item" +
                        (isActive ? " settings-sidebar-item--active" : "")
                      }
                      onClick={() => setActiveSection(key)}
                    >
                      <Icon size={16} />
                      <span>{data.sidebar[key].label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="settings-content">
                {activeSection === "akun" && (
                  <div className="settings-form">
                    <div className="settings-field">
                      <label className="settings-field-label">
                        {data.akun.username.label}
                      </label>
                      <input
                        className="settings-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="settings-field">
                      <label className="settings-field-label">
                        {data.akun.id.label}
                      </label>
                      <input
                        className="settings-input settings-input--readonly"
                        type="text"
                        value={userId}
                        readOnly
                      />
                    </div>
                    <div className="settings-field">
                      <label className="settings-field-label">
                        {data.akun.namaAsli.label}
                      </label>
                      <input
                        className="settings-input settings-input--readonly"
                        type="text"
                        value={namaAsli}
                        readOnly
                      />
                    </div>
                    <button
                      type="button"
                      className="settings-logout-btn"
                      onClick={onLogout}
                    >
                      <LogOut size={16} />
                      <span>{data.akun.keluar}</span>
                    </button>
                  </div>
                )}

                {activeSection === "tampilan" && (
                  <div className="settings-form">
                    <div className="settings-section-group">
                      <span className="settings-section-label">
                        {data.tampilan.theme.label}
                      </span>
                      <div className="settings-option-group">
                        {data.tampilan.themeOptions.map((opt) => {
                          const isActive = theme === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              className={
                                "settings-option-btn" +
                                (isActive ? " settings-option-btn--active" : "")
                              }
                              onClick={() => setTheme(opt.value as Theme)}
                            >
                              <span className="settings-option-indicator" />
                              <span>{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <div className="settings-section-group">
                      <span className="settings-section-label">
                        {data.tampilan.font.label}
                      </span>
                      <div className="settings-option-group">
                        {data.tampilan.fontOptions.map((opt) => {
                          const isActive = font === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              className={
                                "settings-option-btn" +
                                (isActive ? " settings-option-btn--active" : "")
                              }
                              onClick={() => setFont(opt.value as Font)}
                            >
                              <span className="settings-option-indicator" />
                              <span>{opt.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SettingsModal;
