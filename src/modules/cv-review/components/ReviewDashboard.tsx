import { useState, useCallback } from "react";
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
  Copy,
  Check,
  Trophy,
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
    copyButton?: string;
    copiedText?: string;
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

/* SVG Radial Score Gauge */
function ScoreGauge({ score, color }: { score: number; color: string }) {
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="review-score-gauge-container">
      <svg className="review-score-gauge-svg" viewBox="0 0 160 160">
        {/* Background Circle */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Circle */}
        <motion.circle
          cx="80"
          cy="80"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
          fill="none"
          transform="rotate(-90 80 80)"
        />
      </svg>
      <div className="review-score-gauge-center">
        <span className="review-score-number" style={{ color }}>
          {score}
        </span>
        <span className="review-score-max">/100</span>
      </div>
    </div>
  );
}

function ReviewDashboard({ result, data, onUploadAgain }: ReviewDashboardProps) {
  const r = result;
  const scoreColor = getScoreColor(r.score);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopySummary = useCallback(() => {
    const summaryText = `[Hasil Audit CV - Skor: ${r.score}/100]
Ringkasan: ${r.summary}

Kekuatan Utama:
${r.strengths.map((s) => `- ${s}`).join("\n")}

Area Perbaikan:
${r.weaknesses.map((w) => `- ${w}`).join("\n")}

Status ATS: ${r.ats.status === "good" ? "Kompatibel" : "Perlu Perbaikan"}
Jumlah Isu Grammar: ${r.grammar.issues}`;

    navigator.clipboard.writeText(summaryText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  }, [r]);

  return (
    <div className="review-dashboard">
      <div className="review-dashboard-header">
        <div>
          <h1 className="review-heading">{data.heading}</h1>
          <p className="review-subheading">
            Analisis kecocokan CV Anda terhadap standar ATS dan preferensi rekruter.
          </p>
        </div>
        <div className="review-header-actions">
          <button
            type="button"
            className="review-copy-btn"
            onClick={handleCopySummary}
          >
            {isCopied ? <Check size={16} /> : <Copy size={16} />}
            <span>{isCopied ? data.copiedText || "Tersalin!" : data.copyButton || "Salin Audit"}</span>
          </button>
        </div>
      </div>

      <div className="review-grid">
        {/* Main Score Radial Card */}
        <motion.div
          className="review-card review-card--score"
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="review-score-layout">
            <ScoreGauge score={r.score} color={scoreColor} />
            <div className="review-score-details">
              <div className="review-score-badge-row">
                <span className="review-score-label-tag" style={{ color: scoreColor, borderColor: `${scoreColor}40`, background: `${scoreColor}15` }}>
                  {getScoreLabel(r.score)}
                </span>
                <span className="review-percentile-badge">
                  <Trophy size={13} />
                  <span>Top 15% Candidate CV</span>
                </span>
              </div>
              <p className="review-score-summary">{r.summary}</p>
            </div>
          </div>

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
                    <CheckCircle2 size={15} />
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
                    <AlertTriangle size={15} />
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Format Card */}
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

        {/* ATS Card */}
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

        {/* Grammar Card */}
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

        {/* Quick Stats Bar */}
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
