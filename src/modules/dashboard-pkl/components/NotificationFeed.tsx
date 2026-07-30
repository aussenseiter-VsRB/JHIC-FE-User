import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Bot, CheckCircle, Lightbulb, FileText, Info } from "lucide-react";

interface Notification {
  id: number;
  type: "info" | "success" | "tip" | "warning";
  icon: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationFeedProps {
  notifications: Notification[];
}

const iconMap = {
  Bot,
  CheckCircle,
  Lightbulb,
  FileText,
  Info,
} as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function NotificationFeed({ notifications }: NotificationFeedProps) {
  return (
    <div className="notification-feed">
      <div className="notification-header">
        <h2>Notifikasi dari Nexxa</h2>
        <span className="notification-count">
          {notifications.filter((n) => !n.read).length} baru
        </span>
      </div>

      <motion.div
        className="notification-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {notifications.map((notif) => {
          const Icon = iconMap[notif.icon as keyof typeof iconMap] || Info;
          return (
            <motion.div
              key={notif.id}
              className={`notification-item ${notif.type} ${notif.read ? "read" : ""}`}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                x: 4,
                borderColor: "rgba(192, 132, 252, 0.3)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`notification-icon ${notif.type}`}>
                <Icon size={18} />
              </div>
              <div className="notification-content">
                <div className="notification-top">
                  <h3 className="notification-title">{notif.title}</h3>
                  {!notif.read && <span className="notification-unread-dot" />}
                </div>
                <p className="notification-message">{notif.message}</p>
                <span className="notification-time">{notif.time}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default NotificationFeed;
