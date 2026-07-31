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
}

const tabSpring = { type: "spring", stiffness: 320, damping: 22 } as const;

function BottomBarItem({ Icon, label, route }: BottomBarItemProps) {
  const reducedMotion = useReducedMotion();

  return (
    <NavLink to={route} end={route === "/"} className="bottom-bar-item" aria-label={label}>
      {({ isActive }) => (
        <motion.div
          className={`bottom-bar-tab${isActive ? " bottom-bar-tab--active" : ""}`}
          initial={false}
          animate={{ y: isActive && !reducedMotion ? -12 : 0 }}
          whileHover={reducedMotion ? undefined : { y: isActive ? -14 : -4 }}
          transition={tabSpring}
        >
          {isActive &&
            (reducedMotion ? (
              <span className="bottom-bar-edge" />
            ) : (
              <motion.span
                layoutId="bottom-bar-active-edge"
                className="bottom-bar-edge"
                transition={tabSpring}
              />
            ))}
          <Icon size={22} strokeWidth={1.8} />
          <span className="bottom-bar-label">{label}</span>
        </motion.div>
      )}
    </NavLink>
  );
}

function MenuTab({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const reducedMotion = useReducedMotion();

  return (
    <button
      type="button"
      className="bottom-bar-item"
      onClick={onOpenSidebar}
      aria-label="Buka sidebar"
    >
      <motion.div
        className="bottom-bar-tab"
        initial={false}
        whileHover={reducedMotion ? undefined : { y: -4 }}
        transition={tabSpring}
      >
        <Menu size={22} strokeWidth={1.8} />
        <span className="bottom-bar-label">Menu</span>
      </motion.div>
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
        <BottomBarItem Icon={MessageSquare} label="Konsultasi" route="/" />
        <BottomBarItem Icon={CalendarClock} label="Timeline Agit" route="/timeline-agit" />
        <MenuTab onOpenSidebar={onOpenSidebar} />
      </motion.div>
    </nav>
  );
}

export default BottomBar;
