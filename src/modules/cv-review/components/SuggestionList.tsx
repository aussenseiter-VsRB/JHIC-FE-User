import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle2, AlertTriangle, XCircle, Sparkles } from "lucide-react";

interface SuggestionItem {
  icon: "check" | "warning" | "error";
  title: string;
  description: string;
}

interface SuggestionListProps {
  suggestions: SuggestionItem[];
  title: string;
  improveButton: string;
}

const iconMap = {
  check: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
} as const;

const iconColorMap = {
  check: "#22c55e",
  warning: "#facc15",
  error: "#f87171",
} as const;

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.06, duration: 0.3, ease: "easeOut" },
  }),
};

function SuggestionList({
  suggestions,
  title,
  improveButton,
}: SuggestionListProps) {
  return (
    <div className="suggestion-section">
      <h2 className="suggestion-section-title">{title}</h2>
      <div className="suggestion-list">
        {suggestions.map((s, i) => {
          const Icon = iconMap[s.icon];
          const color = iconColorMap[s.icon];
          return (
            <motion.div
              key={i}
              className="suggestion-item"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="suggestion-icon" style={{ color }}>
                <Icon size={18} />
              </div>
              <div className="suggestion-content">
                <h4 className="suggestion-item-title">{s.title}</h4>
                <p className="suggestion-item-desc">{s.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.button
        type="button"
        className="suggestion-improve-btn"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Sparkles size={16} />
        {improveButton}
      </motion.button>
    </div>
  );
}

export default SuggestionList;
