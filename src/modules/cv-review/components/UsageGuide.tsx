import { motion } from "framer-motion";
import { Upload, Sparkles, Clock, Eye, Lightbulb } from "lucide-react";

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

function UsageGuide({ data }: UsageGuideProps) {
  return (
    <motion.div
      className="usage-guide"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
    >
      <h2 className="usage-guide-title">{data.title}</h2>

      <div className="usage-guide-steps">
        {data.steps.map((step, i) => {
          const Icon = stepIcons[i];
          return (
            <div key={i} className="usage-guide-step">
              <div className="usage-guide-step-num">
                <Icon size={14} />
              </div>
              <span className="usage-guide-step-text">{step}</span>
            </div>
          );
        })}
      </div>

      <div className="usage-guide-divider" />

      <h3 className="usage-guide-subtitle">{data.checksTitle}</h3>
      <div className="usage-guide-checks">
        {data.checks.map((check, i) => (
          <div key={i} className="usage-guide-check">
            <span className="usage-guide-check-dot" />
            <span className="usage-guide-check-text">{check}</span>
          </div>
        ))}
      </div>

      <div className="usage-guide-divider" />

      <h3 className="usage-guide-subtitle">{data.tipsTitle}</h3>
      <div className="usage-guide-tips">
        {data.tips.map((tip, i) => (
          <div key={i} className="usage-guide-tip">
            <Lightbulb size={14} />
            <span className="usage-guide-tip-text">{tip}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default UsageGuide;
