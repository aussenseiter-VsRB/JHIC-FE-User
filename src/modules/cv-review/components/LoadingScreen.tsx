import { motion } from "framer-motion";
import { FileText, Sparkles, CheckCircle2 } from "lucide-react";

interface LoadingScreenProps {
  title: string;
  stages: string[];
  currentStage: number;
  progress: number;
  subStages?: string[];
}

function LoadingScreen({
  title,
  stages,
  currentStage,
  progress,
  subStages,
}: LoadingScreenProps) {
  const currentSubStageText =
    subStages && subStages[currentStage]
      ? subStages[currentStage]
      : "Memproses analisis mendalam...";

  return (
    <div className="loading-screen">
      {/* Animated Document Scanner Graphic */}
      <div className="loading-scanner-container">
        <motion.div
          className="loading-doc-card"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="loading-doc-header">
            <FileText size={24} className="loading-doc-icon" />
            <div className="loading-doc-lines">
              <div className="loading-doc-line loading-doc-line--short" />
              <div className="loading-doc-line loading-doc-line--micro" />
            </div>
          </div>
          <div className="loading-doc-body">
            <div className="loading-doc-line" />
            <div className="loading-doc-line" />
            <div className="loading-doc-line loading-doc-line--short" />
            <div className="loading-doc-line" />
          </div>
          {/* Animated Laser Beam */}
          <motion.div
            className="loading-scanner-beam"
            animate={{ top: ["5%", "90%", "5%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <div className="loading-text-group">
        <h2 className="loading-title">{title}</h2>
        <motion.p
          key={currentStage}
          className="loading-substage-tip"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Sparkles size={14} />
          <span>{currentSubStageText}</span>
        </motion.p>
      </div>

      <div className="loading-stages">
        {stages.map((stage, i) => (
          <div
            key={i}
            className={`loading-stage${i === currentStage ? " loading-stage--active" : ""}${i < currentStage ? " loading-stage--done" : ""}`}
          >
            <div className="loading-stage-dot">
              {i < currentStage ? (
                <CheckCircle2 size={16} className="loading-stage-check-icon" />
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

      <div className="loading-progress-section">
        <div className="loading-bar-track">
          <motion.div
            className="loading-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>
        <p className="loading-percent">{progress}% Selesai</p>
      </div>
    </div>
  );
}

export default LoadingScreen;
