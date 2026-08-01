import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  FileText,
  LayoutDashboard,
  Menu,
  MessageSquare,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import "./bottombar.css";

interface BottomBarProps {
  onOpenSidebar: () => void;
}

interface BottomBarItemProps {
  Icon: typeof FileText;
  label: string;
  route: string;
  variant?: "default" | "primary";
}

function BottomBarItem({ Icon, label, route, variant = "default" }: BottomBarItemProps) {
  const primary = variant === "primary";

  return (
    <NavLink to={route} end={route === "/home"} className="bottom-bar-item" aria-label={label}>
      {({ isActive }) => (
        <div
          className={`bottom-bar-tab${isActive ? " bottom-bar-tab--active" : ""}${
            primary ? " bottom-bar-tab--primary" : ""
          }`}
        >
          {primary ? (
            <span className="bottom-bar-fab">
              <Icon size={24} strokeWidth={2} />
            </span>
          ) : (
            <Icon size={22} strokeWidth={1.8} />
          )}
          <span className="bottom-bar-label">{label}</span>
        </div>
      )}
    </NavLink>
  );
}

function MenuTab({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <button
      type="button"
      className="bottom-bar-item"
      onClick={onOpenSidebar}
      aria-label="Buka sidebar"
    >
      <div className="bottom-bar-tab">
        <Menu size={22} strokeWidth={1.8} />
        <span className="bottom-bar-label">Menu</span>
      </div>
    </button>
  );
}

function BottomBar({ onOpenSidebar }: BottomBarProps) {
  const reducedMotion = useReducedMotion();

  return (
    <nav className="bottom-bar" aria-label="Navigasi utama">
      <motion.div
        className="bottom-bar-tabs"
        initial={reducedMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <BottomBarItem Icon={FileText} label="CV Review" route="/cv-review" />
        <BottomBarItem Icon={LayoutDashboard} label="Dashboard PKL" route="/dashboard-pkl" />
        <BottomBarItem Icon={MessageSquare} label="Konsultasi" route="/home" variant="primary" />
        <BottomBarItem Icon={CalendarClock} label="Timeline Agit" route="/timeline-agit" />
        <MenuTab onOpenSidebar={onOpenSidebar} />
      </motion.div>
    </nav>
  );
}

export default BottomBar;
