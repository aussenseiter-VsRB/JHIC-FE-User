import { motion, useAnimation } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Sparkles,
  PanelLeftClose,
  Plus,
  Search,
  MessageSquare,
  LayoutDashboard,
  FileText,
  CalendarClock,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import RecentItem from "./RecentItem";
import data from "../../modules/nexxa/nexxa.json";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  Icon: typeof Search;
  label: string;
  route: string;
  collapsed: boolean;
}

const navIconMap: Record<string, typeof Search> = {
  Cari: Search,
  Konsultasi: MessageSquare,
};

const navRouteMap: Record<string, string> = {
  Cari: "/search",
  Konsultasi: "/",
};

const alatIconMap: Record<string, typeof Search> = {
  "Dashboard PKL": LayoutDashboard,
  "CV Review": FileText,
  "Timeline Agit": CalendarClock,
};

const iconScale: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: { scale: 1.2, rotate: -10, transition: { duration: 0.2, ease: "easeOut" } },
};

function NavItem({ Icon, label, route, collapsed }: NavItemProps) {
  const controls = useAnimation();

  return (
    <NavLink
      to={route}
      end={route === "/"}
      className={({ isActive }) =>
        `nav-item${isActive ? " active" : ""}`
      }
      onMouseEnter={() => controls.start("hover")}
      onMouseLeave={() => controls.start("initial")}
    >
      <motion.span
        style={{ display: "inline-flex" }}
        variants={iconScale}
        initial="initial"
        animate={controls}
      >
        <Icon size={18} />
      </motion.span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
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
            aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
            whileHover={{ scale: 1.15 }}
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
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              style={{ display: "inline-flex" }}
              variants={{
                hover: { rotate: 90, transition: { duration: 0.2, ease: "easeOut" } },
              }}
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
              <NavItem
                key={label}
                Icon={Icon}
                label={label}
                route={route}
                collapsed={collapsed}
              />
            );
          })}
        </nav>

        {!collapsed && (
          <>
            <div className="sidebar-section">
              <div className="sidebar-section-title">{data.alatTitle}</div>
              {data.alatItems.map((item) => {
                const Icon = alatIconMap[item.label];
                return (
                  <NavItem
                    key={item.label}
                    Icon={Icon}
                    label={item.label}
                    route={item.route}
                    collapsed={collapsed}
                  />
                );
              })}
            </div>

            <div className="sidebar-section">
              <div className="sidebar-section-title">{data.recentsTitle}</div>
              {data.recents.length === 0 ? (
                <div className="sidebar-empty">Tidak ada konsultasi terbaru</div>
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
              aria-label="Pengaturan"
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
