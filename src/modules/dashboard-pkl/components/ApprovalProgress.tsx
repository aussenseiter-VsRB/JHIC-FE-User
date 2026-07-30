import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Shield,
  Heart,
  GraduationCap,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { getApprovalProgress } from "../services/dashboardService";
import type { TeacherApproval } from "../services/dashboardService";

interface ApprovalProgressProps {
  title: string;
  subtitle: string;
  statusLabels: Record<string, string>;
  teachers: { id: string; name: string; role: string }[];
}

const iconMap: Record<string, typeof Users> = {
  wali: Users,
  kesiswaan: Shield,
  gurubk: Heart,
  kaprodi: GraduationCap,
};

const statusConfig: Record<
  string,
  { icon: typeof Clock; className: string }
> = {
  pending: { icon: Clock, className: "approval-badge--pending" },
  approved: { icon: CheckCircle2, className: "approval-badge--approved" },
  rejected: { icon: XCircle, className: "approval-badge--rejected" },
};

function ApprovalProgress({
  title,
  subtitle,
  statusLabels,
  teachers,
}: ApprovalProgressProps) {
  const [approvals, setApprovals] = useState<TeacherApproval[]>([]);

  useEffect(() => {
    getApprovalProgress().then(setApprovals);
  }, []);

  return (
    <div className="approval-progress dashboard-card">
      <div className="approval-progress-header">
        <div className="approval-progress-icon">
          <GraduationCap size={20} />
        </div>
        <div>
          <h3 className="approval-progress-title">{title}</h3>
          <p className="approval-progress-subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="approval-progress-list">
        {teachers.map((teacher, i) => {
          const approval = approvals.find((a) => a.id === teacher.id);
          const status = approval?.status || "pending";
          const statusLabel = statusLabels[status] || status;
          const updatedAt = approval?.updatedAt || "—";
          const Icon = iconMap[teacher.id] || Users;
          const config = statusConfig[status] || statusConfig.pending;
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={teacher.id}
              className="approval-item"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <div className="approval-item-icon">
                <Icon size={18} />
              </div>
              <div className="approval-item-info">
                <span className="approval-item-name">{teacher.name}</span>
                <span className="approval-item-role">{teacher.role}</span>
              </div>
              <div className="approval-item-right">
                <span className={`approval-badge ${config.className}`}>
                  <StatusIcon size={12} />
                  {statusLabel}
                </span>
                <span className="approval-item-time">{updatedAt}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="approval-progress-footer">
        <div className="approval-progress-line" />
        <div className="approval-progress-steps">
          {teachers.map((_, i) => (
            <div
              key={i}
              className={`approval-step-dot${approvals[i]?.status === "approved" ? " approval-step-dot--done" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ApprovalProgress;
