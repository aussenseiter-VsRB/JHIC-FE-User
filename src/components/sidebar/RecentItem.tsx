import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface RecentItemProps {
  label: string;
}

function RecentItem({ label }: RecentItemProps) {
  return (
    <motion.button
      type="button"
      className="recent-item"
      title={label}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <motion.span
        style={{ display: "inline-flex", flexShrink: 0 }}
        whileHover={{ scale: 1.15, rotate: -10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <MessageSquare size={14} />
      </motion.span>
      <span>{label}</span>
    </motion.button>
  );
}

export default RecentItem;
