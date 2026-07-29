import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface RecentItemProps {
  label: string;
  onMobileClose?: () => void;
}

const iconBounce: Variants = {
  hover: { scale: 1.15, rotate: -10, transition: { duration: 0.2, ease: "easeOut" } },
};

function RecentItem({ label, onMobileClose }: RecentItemProps) {
  return (
    <motion.button
      type="button"
      className="recent-item"
      title={label}
      onClick={onMobileClose}
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <motion.span
        style={{ display: "inline-flex", flexShrink: 0 }}
        variants={iconBounce}
      >
        <MessageSquare size={14} />
      </motion.span>
      <span>{label}</span>
    </motion.button>
  );
}

export default RecentItem;
