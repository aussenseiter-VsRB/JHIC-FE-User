import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  Bell,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { getNotifications } from "../services/dashboardService";
import type { Notification } from "../services/dashboardService";

interface NotificationBotProps {
  title: string;
  subtitle: string;
  botName: string;
}

const typeConfig: Record<
  string,
  { icon: typeof Info; className: string }
> = {
  info: { icon: Info, className: "notification-item--info" },
  success: { icon: CheckCircle2, className: "notification-item--success" },
  warning: { icon: AlertTriangle, className: "notification-item--warning" },
  error: { icon: XCircle, className: "notification-item--error" },
};

function NotificationBot({ title, subtitle, botName }: NotificationBotProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const listRef = useRef<HTMLDivElement>(null);
  const prevLenRef = useRef(0);

  useEffect(() => {
    getNotifications().then(setNotifications);
  }, []);

  useEffect(() => {
    if (listRef.current && notifications.length > prevLenRef.current) {
      listRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    prevLenRef.current = notifications.length;
  }, [notifications.length]);

  return (
    <div className="notification-bot dashboard-card">
      <div className="notification-bot-header">
        <div className="notification-bot-avatar">
          <Bot size={20} />
        </div>
        <div>
          <h3 className="notification-bot-title">{title}</h3>
          <p className="notification-bot-subtitle">{subtitle}</p>
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="notification-bot-empty">
          <Bell size={22} />
          <p>Belum ada notifikasi</p>
          <span>Notifikasi akan muncul saat ada aktivitas surat PKL</span>
        </div>
      ) : (
        <div className="notification-bot-list" ref={listRef}>
          {notifications.map((notif, i) => {
            const config = typeConfig[notif.type] || typeConfig.info;
            const Icon = config.icon;

            return (
              <motion.div
                key={notif.id}
                className={`notification-item ${config.className}`}
                initial={{ opacity: 0, x: -16, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <div className="notification-item-icon">
                  <Icon size={14} />
                </div>
                <div className="notification-item-content">
                  <p className="notification-item-message">{notif.message}</p>
                  <span className="notification-item-time">{notif.time}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="notification-bot-footer">
        <span className="notification-bot-status" />
        <span className="notification-bot-status-text">
          Terhubung — {botName}
        </span>
      </div>
    </div>
  );
}

export default NotificationBot;
