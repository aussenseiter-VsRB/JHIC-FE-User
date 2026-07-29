import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ShortcutChipProps {
  icon: LucideIcon;
  label: string;
}

function ShortcutChip({ icon: Icon, label }: ShortcutChipProps) {
  return (
    <motion.button
      type="button"
      className="shortcut-chip"
      whileHover={{ scale: 1.05, borderColor: "#52525b" }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.span
        style={{ display: "inline-flex" }}
        whileHover={{ rotate: -10 }}
        transition={{ duration: 0.2 }}
      >
        <Icon size={14} />
      </motion.span>
      <span>{label}</span>
    </motion.button>
  );
}

export default ShortcutChip;
