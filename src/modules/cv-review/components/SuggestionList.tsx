import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Filter,
  ArrowRight,
} from "lucide-react";
import type { SuggestionItem } from "../services/reviewService";

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

type FilterTab = "all" | "ats_format" | "content_grammar" | "high_priority";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.25, ease: "easeOut" },
  }),
};

function SuggestionList({
  suggestions,
  title,
  improveButton,
}: SuggestionListProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // First item expanded by default

  const filteredSuggestions = useMemo(() => {
    return suggestions.filter((s) => {
      if (activeTab === "all") return true;
      if (activeTab === "ats_format") return s.category === "ats" || s.category === "format";
      if (activeTab === "content_grammar") return s.category === "content" || s.category === "grammar";
      if (activeTab === "high_priority") return s.priority === "high";
      return true;
    });
  }, [suggestions, activeTab]);

  const toggleExpand = (i: number) => {
    setExpandedIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="suggestion-section">
      <div className="suggestion-section-header">
        <div className="suggestion-title-group">
          <h2 className="suggestion-section-title">{title}</h2>
          <span className="suggestion-count-badge">
            {filteredSuggestions.length} Item
          </span>
        </div>

        {/* Category Filter Tabs */}
        <div className="suggestion-filter-tabs">
          <button
            type="button"
            className={`suggestion-tab${activeTab === "all" ? " suggestion-tab--active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            Semua
          </button>
          <button
            type="button"
            className={`suggestion-tab${activeTab === "high_priority" ? " suggestion-tab--active" : ""}`}
            onClick={() => setActiveTab("high_priority")}
          >
            <Filter size={12} /> Prioritas Tinggi
          </button>
          <button
            type="button"
            className={`suggestion-tab${activeTab === "ats_format" ? " suggestion-tab--active" : ""}`}
            onClick={() => setActiveTab("ats_format")}
          >
            ATS & Format
          </button>
          <button
            type="button"
            className={`suggestion-tab${activeTab === "content_grammar" ? " suggestion-tab--active" : ""}`}
            onClick={() => setActiveTab("content_grammar")}
          >
            Konten & Grammar
          </button>
        </div>
      </div>

      <div className="suggestion-list">
        {filteredSuggestions.map((s, i) => {
          const Icon = iconMap[s.icon];
          const color = iconColorMap[s.icon];
          const isExpanded = expandedIndex === i;
          const hasBeforeAfter = Boolean(s.beforeAfter);

          return (
            <motion.div
              key={i}
              className={`suggestion-item${isExpanded ? " suggestion-item--expanded" : ""}`}
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              onClick={() => hasBeforeAfter && toggleExpand(i)}
            >
              <div className="suggestion-item-main">
                <div className="suggestion-icon" style={{ color }}>
                  <Icon size={18} />
                </div>
                <div className="suggestion-content">
                  <div className="suggestion-header-line">
                    <h4 className="suggestion-item-title">{s.title}</h4>
                    {s.priority === "high" && (
                      <span className="suggestion-priority-tag suggestion-priority-tag--high">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="suggestion-item-desc">{s.description}</p>
                </div>

                {hasBeforeAfter && (
                  <button
                    type="button"
                    className="suggestion-expand-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(i);
                    }}
                  >
                    <span>{isExpanded ? "Tutup Contoh" : "Lihat Contoh"}</span>
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                )}
              </div>

              {/* Before & After Accordion Details */}
              <AnimatePresence>
                {isExpanded && s.beforeAfter && (
                  <motion.div
                    className="suggestion-before-after-card"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="suggestion-ba-column suggestion-ba-column--before">
                      <span className="suggestion-ba-label">❌ Versi Saat Ini</span>
                      <p className="suggestion-ba-text">{s.beforeAfter.before}</p>
                    </div>
                    <div className="suggestion-ba-divider">
                      <ArrowRight size={14} />
                    </div>
                    <div className="suggestion-ba-column suggestion-ba-column--after">
                      <span className="suggestion-ba-label">✅ Contoh Rekomendasi AI</span>
                      <p className="suggestion-ba-text">{s.beforeAfter.after}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
