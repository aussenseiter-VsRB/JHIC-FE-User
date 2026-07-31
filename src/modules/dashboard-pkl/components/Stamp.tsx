import { motion, useReducedMotion } from "framer-motion";

interface StampProps {
  status: "approved" | "pending";
}

function Stamp({ status }: StampProps) {
  const prefersReducedMotion = useReducedMotion();
  const isApproved = status === "approved";

  if (prefersReducedMotion) {
    return (
      <span className={`stamp stamp--${status}`} aria-label={isApproved ? "Disetujui" : "Menunggu"}>
        {isApproved ? "DISETUJUI" : "MENUNGGU"}
      </span>
    );
  }

  return (
    <motion.span
      className={`stamp stamp--${status}`}
      aria-label={isApproved ? "Disetujui" : "Menunggu"}
      initial={{ opacity: 0, scale: isApproved ? 1.6 : 1.3, rotate: isApproved ? -14 : -6 }}
      animate={{ opacity: 1, scale: 1, rotate: isApproved ? -4 : 0 }}
      transition={
        isApproved
          ? { type: "spring", stiffness: 420, damping: 22 }
          : { type: "spring", stiffness: 300, damping: 20 }
      }
    >
      {isApproved ? "DISETUJUI" : "MENUNGGU"}
    </motion.span>
  );
}

export default Stamp;
