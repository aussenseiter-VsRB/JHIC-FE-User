import { motion, useReducedMotion } from "framer-motion";

export type StampStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "needs_further_action"
  | "cancelled";

interface StampProps {
  status: StampStatus;
}

const LABELS: Record<StampStatus, string> = {
  pending: "MENUNGGU",
  approved: "DISETUJUI",
  rejected: "DITOLAK",
  needs_further_action: "PERLU PERBAIKAN",
  cancelled: "DIBATALKAN",
};

const ARIA_LABELS: Record<StampStatus, string> = {
  pending: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
  needs_further_action: "Perlu perbaikan",
  cancelled: "Dibatalkan",
};

function Stamp({ status }: StampProps) {
  const prefersReducedMotion = useReducedMotion();
  const label = LABELS[status];
  const ariaLabel = ARIA_LABELS[status];
  const isApproved = status === "approved";

  if (prefersReducedMotion) {
    return (
      <span className={`stamp stamp--${status}`} aria-label={ariaLabel}>
        {label}
      </span>
    );
  }

  return (
    <motion.span
      className={`stamp stamp--${status}`}
      aria-label={ariaLabel}
      initial={{ opacity: 0, scale: isApproved ? 1.6 : 1.3, rotate: isApproved ? -14 : -6 }}
      animate={{ opacity: 1, scale: 1, rotate: isApproved ? -4 : 0 }}
      transition={
        isApproved
          ? { type: "spring", stiffness: 420, damping: 22 }
          : { type: "spring", stiffness: 300, damping: 20 }
      }
    >
      {label}
    </motion.span>
  );
}

export default Stamp;
