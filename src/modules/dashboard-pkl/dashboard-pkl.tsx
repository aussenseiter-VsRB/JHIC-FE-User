import { motion } from "framer-motion";
import { FileText, CheckCircle, Building2 } from "lucide-react";
import CvUploadBox from "./components/CvUploadBox";
import ApprovalProgress from "./components/ApprovalProgress";
import NotificationBot from "./components/NotificationBot";
import data from "./dashboard-pkl.json";
import "./css/dashboard-pkl.css";

const statIcons = [FileText, CheckCircle, Building2];

function DashboardPkl() {
  return (
    <motion.div
      className="dashboard-pkl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="dashboard-pkl-header">
        <div className="dashboard-pkl-header-top">
          <div>
            <h1 className="dashboard-pkl-greeting">
              Halo, {data.header.userName}
            </h1>
            <p className="dashboard-pkl-tagline">{data.header.tagline}</p>
          </div>
          <span className="dashboard-pkl-badge">{data.header.badge}</span>
        </div>
      </div>

      <div className="dashboard-stats">
        {data.header.stats.map((stat, i) => {
          const Icon = statIcons[i];
          return (
            <div key={stat.label} className="dashboard-stat-card">
              <div className="dashboard-stat-icon">
                <Icon size={18} />
              </div>
              <div className="dashboard-stat-info">
                <span className="dashboard-stat-value">{stat.value}</span>
                <span className="dashboard-stat-label">{stat.label}</span>
                <span className="dashboard-stat-hint">{stat.hint}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="dashboard-main">
        <div className="dashboard-main-primary">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ flex: 1, display: "flex" }}
          >
            <CvUploadBox
              data={data.cvUpload}
              resultLabels={data.result}
            />
          </motion.div>
        </div>

        <div className="dashboard-main-sidebar">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <ApprovalProgress
              title={data.approvalProgress.title}
              subtitle={data.approvalProgress.subtitle}
              statusLabels={data.approvalProgress.statusLabels}
              teachers={data.approvalProgress.teachers}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <NotificationBot
              title={data.notificationBot.title}
              subtitle={data.notificationBot.subtitle}
              botName={data.notificationBot.botName}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default DashboardPkl;
