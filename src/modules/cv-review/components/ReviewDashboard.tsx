import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  FileText,
  Bot,
  SpellCheck,
  File,
  Type,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Upload,
} from "lucide-react";
import type { ReviewResult } from "../services/reviewService";
import SuggestionList from "./SuggestionList";

interface ReviewDashboardProps {
  result: ReviewResult;
  data: {
    heading: string;
    scoreLabel: string;
    atsLabel: string;
    atsGood: string;
    atsNeedsImprovement: string;
    grammarLabel: string;
    grammarCount: string;
    formatLabel: string;
    quickStats: {
      pages: string;
      words: string;
      lastUpdated: string;
    };
    strengths: string;
    weaknesses: string;
    suggestionsTitle: string;
    improveButton: string;
    uploadAgain: string;
  };
  onUploadAgain: () => void;
}

function getScoreColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#facc15";
  if (score >= 40) return "#f97316";
  return "#f87171";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Sangat Baik";
  if (score >= 60) return "Cukup Baik";
  if (score >= 40) return "Kurang";
  return "Perlu Perbaikan";
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: "easeOut" },
  }),
};

function ReviewDashboard({ result, data, onUploadAgain }: ReviewDashboardProps) {
  const r = result;
  const scoreColor = getScoreColor(r.score);

  return (
    <div className="review-dashboard">
      <div className="review-dashboard-header">
        <h1 className="review-heading">{data.heading}</h1>
      </div>

      <div className="review-grid">
        <motion.div
          className="review-card review-card--score"
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="review-score-number" style={{ color: scoreColor }}>
            {r.score}
          </div>
          <div className="review-score-label">{getScoreLabel(r.score)}</div>
          <p className="review-score-summary">{r.summary}</p>
          <div className="review-strengths-weaknesses">
            <div className="review-sw-section">
              <h4 className="review-sw-title review-sw-title--strength">
                {data.strengths}
              </h4>
              <ul className="review-sw-list">
                {r.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="review-sw-item review-sw-item--strength"
                  >
                    <CheckCircle2 size={14} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="review-sw-section">
              <h4 className="review-sw-title review-sw-title--weakness">
                {data.weaknesses}
              </h4>
              <ul className="review-sw-list">
                {r.weaknesses.map((w, i) => (
                  <li
                    key={i}
                    className="review-sw-item review-sw-item--weakness"
                  >
                    <AlertTriangle size={14} />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="review-card review-card--medium"
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="review-card-header">
            <div className="review-card-icon">
              <FileText size={18} />
            </div>
            <h3 className="review-card-title">{data.formatLabel}</h3>
          </div>
          <div className="review-format-score">
            <span
              className="review-mini-score"
              style={{ color: getScoreColor(r.format.score) }}
            >
              {r.format.score}
            </span>
            <span className="review-mini-label">/100</span>
          </div>
          <ul className="review-card-list">
            {r.format.details.map((d, i) => (
              <li key={i} className="review-card-list-item">
                {d}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="review-card review-card--small"
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="review-card-header">
            <div className="review-card-icon">
              <Bot size={18} />
            </div>
            <h3 className="review-card-title">{data.atsLabel}</h3>
          </div>
          <div
            className={`review-ats-status${r.ats.status === "good" ? " review-ats-status--good" : " review-ats-status--bad"}`}
          >
            {r.ats.status === "good" ? (
              <>
                <CheckCircle2 size={20} />
                <span>{data.atsGood}</span>
              </>
            ) : (
              <>
                <XCircle size={20} />
                <span>{data.atsNeedsImprovement}</span>
              </>
            )}
          </div>
        </motion.div>

        <motion.div
          className="review-card review-card--small"
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="review-card-header">
            <div className="review-card-icon">
              <SpellCheck size={18} />
            </div>
            <h3 className="review-card-title">{data.grammarLabel}</h3>
          </div>
          <div className="review-grammar-count">
            <span className="review-grammar-number">{r.grammar.issues}</span>
            <span className="review-grammar-label">{data.grammarCount}</span>
          </div>
        </motion.div>

        <motion.div
          className="review-card review-card--full"
          custom={4}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="review-quick-stats">
            <div className="review-stat-item">
              <File size={16} />
              <span className="review-stat-value">{r.quickStats.pages}</span>
              <span className="review-stat-label">{data.quickStats.pages}</span>
            </div>
            <div className="review-stat-divider" />
            <div className="review-stat-item">
              <Type size={16} />
              <span className="review-stat-value">{r.quickStats.words}</span>
              <span className="review-stat-label">{data.quickStats.words}</span>
            </div>
            <div className="review-stat-divider" />
            <div className="review-stat-item">
              <Calendar size={16} />
              <span className="review-stat-value">
                {r.quickStats.lastUpdated}
              </span>
              <span className="review-stat-label">
                {data.quickStats.lastUpdated}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <SuggestionList
        suggestions={r.suggestions}
        title={data.suggestionsTitle}
        improveButton={data.improveButton}
      />

      <motion.div
        className="review-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6 } }}
      >
        <button
          type="button"
          className="review-upload-again-btn"
          onClick={onUploadAgain}
        >
          <Upload size={16} />
          {data.uploadAgain}
        </button>
      </motion.div>
    </div>
  );
}

export default ReviewDashboard;
