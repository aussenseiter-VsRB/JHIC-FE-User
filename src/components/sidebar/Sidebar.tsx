import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Sparkles,
  PanelLeftClose,
  Plus,
  Search,
  MessageSquare,
  Compass,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import RecentItem from "./RecentItem";
import data from "../../modules/nexxa/nexxa.json";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navIconMap: Record<string, typeof Search> = {
  Search,
  Chats: MessageSquare,
};

const navRouteMap: Record<string, string> = {
  Search: "/search",
  Chats: "/",
};

const iconHover: Variants = {
  rest: { scale: 1, rotate: 0 },
  hover: { scale: 1.2, rotate: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

function NavIcon({ Icon }: { Icon: typeof Search }) {
  return (
    <motion.span
      style={{ display: "inline-flex" }}
      variants={iconHover}
      initial="rest"
      whileHover="hover"
    >
      <Icon size={18} />
    </motion.span>
  );
}

function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar-inner">
        <div className="sidebar-header">
          {!collapsed && (
            <motion.div
              className="sidebar-logo"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <motion.span
                style={{ display: "inline-flex" }}
                whileHover={{ rotate: -15, scale: 1.15 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Sparkles size={20} className="sidebar-logo-icon" />
              </motion.span>
              <span className="sidebar-logo-text">{data.appName}</span>
            </motion.div>
          )}
          <motion.button
            type="button"
            className="icon-btn sidebar-collapse-btn"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            whileHover={{ scale: 1.15, rotate: collapsed ? 0 : 180 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.span
              style={{ display: "inline-flex" }}
              animate={{ rotate: collapsed ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <PanelLeftClose size={18} />
            </motion.span>
          </motion.button>
        </div>

        {!collapsed && (
          <motion.button
            type="button"
            className="new-chat-btn"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.15 }}
          >
            <motion.span
              style={{ display: "inline-flex" }}
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Plus size={16} />
            </motion.span>
            <span>{data.newChat}</span>
          </motion.button>
        )}

        <nav className="sidebar-nav">
          {data.navItems.map((label) => {
            const Icon = navIconMap[label];
            const route = navRouteMap[label];
            return (
              <NavLink
                key={label}
                to={route}
                end={route === "/"}
                className={({ isActive }) =>
                  `nav-item${isActive ? " active" : ""}`
                }
              >
                {Icon && <NavIcon Icon={Icon} />}
                {!collapsed && <span>{label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {!collapsed && (
          <>
            <div className="sidebar-section">
              <div className="sidebar-section-title">{data.gptsTitle}</div>
              <motion.button
                type="button"
                className="nav-item"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
              >
                <NavIcon Icon={Compass} />
                <span>{data.exploreGpts}</span>
              </motion.button>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-section-title">{data.recentsTitle}</div>
              {data.recents.length === 0 ? (
                <div className="sidebar-empty">No recent chats</div>
              ) : (
                data.recents.map((recent) => (
                  <RecentItem key={recent} label={recent} />
                ))
              )}
            </div>
          </>
        )}
      </div>

      {!collapsed && (
        <div className="sidebar-bottom">
          <div className="user-footer">
            <motion.div
              className="user-avatar"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ duration: 0.2 }}
            >
              {data.userName.charAt(0).toUpperCase()}
            </motion.div>
            <div className="user-info">
              <span className="user-name">{data.userName}</span>
            </div>
            <motion.button
              type="button"
              className="icon-btn"
              aria-label="Settings"
              whileHover={{ scale: 1.15, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Settings size={16} />
            </motion.button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
