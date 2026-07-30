import { motion } from "framer-motion";
import {
  Upload,
  Sparkles,
  Clock,
  Eye,
  Lightbulb,
  Search,
  CheckCircle2,
} from "lucide-react";
import type { Variants } from "framer-motion";

interface UsageGuideProps {
  data: {
    title: string;
    steps: string[];
    checksTitle: string;
    checks: string[];
    tipsTitle: string;
    tips: string[];
  };
}

const stepIcons = [Upload, Sparkles, Clock, Eye];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const numVariants: Variants = {
  hidden: { scale: 0, rotate: -90 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 14 },
  },
};

const lineVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

function UsageGuide({ data }: UsageGuideProps) {
  return (
    <motion.div
      className="usage-guide"
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: 0.15, ease: [0.25, 0.25, 0, 1] }}
    >
      <motion.div
        className="usage-guide-header"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, delay: 0.2, ease: "easeOut" }}
      >
        <motion.div
          className="usage-guide-header-icon"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Search size={16} />
        </motion.div>
        <div>
          <h2 className="usage-guide-title">{data.title}</h2>
          <p className="usage-guide-sub">Panduan singkat menggunakan fitur ini</p>
        </div>
      </motion.div>

      <motion.div
        className="usage-guide-steps"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.steps.map((step, i) => {
          const Icon = stepIcons[i];
          return (
            <motion.div
              key={i}
              className="usage-guide-step"
              variants={stepVariants}
            >
              <div className="usage-guide-step-track">
                <motion.div
                  className="usage-guide-step-num"
                  variants={numVariants}
                  whileHover={{
                    scale: 1.15,
                    borderColor: "rgba(192, 132, 252, 0.6)",
                    boxShadow: "0 0 20px rgba(192, 132, 252, 0.25)",
                  }}
                >
                  <Icon size={13} />
                </motion.div>
                {i < data.steps.length - 1 && (
                  <motion.div
                    className="usage-guide-step-line"
                    variants={lineVariants}
                    style={{ originY: 0 }}
                  />
                )}
              </div>
              <motion.div
                className="usage-guide-step-body"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <span className="usage-guide-step-text">{step}</span>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        className="usage-guide-section"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="usage-guide-section-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <motion.div
            animate={{ rotate: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            <CheckCircle2 size={14} />
          </motion.div>
          <h3 className="usage-guide-section-title">{data.checksTitle}</h3>
        </motion.div>
        <div className="usage-guide-checks">
          {data.checks.map((check, i) => (
            <motion.div
              key={i}
              className="usage-guide-check"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
              whileHover={{
                background: "rgba(34, 197, 94, 0.05)",
                x: 4,
              }}
            >
              <motion.div
                className="usage-guide-check-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                <CheckCircle2 size={12} />
              </motion.div>
              <span className="usage-guide-check-text">{check}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="usage-guide-section"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="usage-guide-section-header"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <motion.div
            animate={{ rotate: [0, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          >
            <Lightbulb size={14} />
          </motion.div>
          <h3 className="usage-guide-section-title">{data.tipsTitle}</h3>
        </motion.div>
        <div className="usage-guide-tips">
          {data.tips.map((tip, i) => (
            <motion.div
              key={i}
              className="usage-guide-tip"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.8 + i * 0.08 }}
              whileHover={{
                background: "rgba(250, 204, 21, 0.05)",
                x: 4,
              }}
            >
              <motion.div
                className="usage-guide-tip-icon"
                whileHover={{ scale: 1.2 }}
              >
                <Lightbulb size={11} />
              </motion.div>
              <span className="usage-guide-tip-text">{tip}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default UsageGuide;
