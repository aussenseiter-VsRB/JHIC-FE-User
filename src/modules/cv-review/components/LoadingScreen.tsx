import { motion } from "framer-motion";
import { FileText } from "lucide-react";

interface LoadingScreenProps {
  title: string;
  stages: string[];
  currentStage: number;
  progress: number;
}

function LoadingScreen({
  title,
  stages,
  currentStage,
  progress,
}: LoadingScreenProps) {
  return (
    <div className="loading-screen">
      <motion.div
        className="loading-icon"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <FileText size={40} />
      </motion.div>

      <h2 className="loading-title">{title}</h2>

      <div className="loading-stages">
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`loading-stage${i === currentStage ? " loading-stage--active" : ""}${i < currentStage ? " loading-stage--done" : ""}`}
          >
            <div className="loading-stage-dot">
              {i < currentStage ? (
                <span className="loading-stage-check">✓</span>
              ) : (
                <span
                  className={`loading-stage-num${i === currentStage ? " loading-stage-num--pulse" : ""}`}
                >
                  {i + 1}
                </span>
              )}
            </div>
            <span className="loading-stage-text">{stage}</span>
          </div>
        ))}
      </div>

      <div className="loading-bar-track">
        <motion.div
          className="loading-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>

      <p className="loading-percent">{progress}%</p>
    </div>
  );
}

export default LoadingScreen;
