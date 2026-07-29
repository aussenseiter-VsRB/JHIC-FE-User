import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { analyzeCv, LOADING_STAGES } from "./services/reviewService";
import type { ReviewResult } from "./services/reviewService";
import UploadForm from "./components/UploadForm";
import UsageGuide from "./components/UsageGuide";
import LoadingScreen from "./components/LoadingScreen";
import ReviewDashboard from "./components/ReviewDashboard";
import data from "./cv-review.json";
import "./css/cv-review.css";

type Step = "upload" | "loading" | "result";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.2 },
  },
};

function CvReview() {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const handleFileSelect = useCallback((f: File | null) => {
    setFile(f);
  }, []);

  const handleStartAnalysis = useCallback(async () => {
    if (!file) return;
    setStep("loading");
    setCurrentStage(0);
    setProgress(0);

    const stageDuration = 1400;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < LOADING_STAGES.length; i++) {
      const t = setTimeout(() => setCurrentStage(i), i * stageDuration);
      timeouts.push(t);
    }
    intervalsRef.current = timeouts;

    let p = 0;
    const pi = setInterval(() => {
      p += 2;
      setProgress(Math.min(p, 99));
    }, 80);

    try {
      const reviewResult = await analyzeCv();
      clearInterval(pi);
      setProgress(100);
      await new Promise((r) => setTimeout(r, 400));
      setResult(reviewResult);
      setStep("result");
    } catch {
      clearInterval(pi);
      setStep("upload");
    }

    intervalsRef.current.forEach(clearTimeout);
  }, [file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResult(null);
    setStep("upload");
    setCurrentStage(0);
    setProgress(0);
  }, []);

  return (
    <motion.div
      className="cv-review"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {step === "upload" && (
          <motion.div
            key="upload"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="cv-review-step"
          >
            <div className="cv-review-upload-layout">
              <div className="cv-review-upload-left">
                <UploadForm
                  data={data.upload}
                  file={file}
                  onFileSelect={handleFileSelect}
                  onStartAnalysis={handleStartAnalysis}
                />
              </div>
              <div className="cv-review-upload-right">
                <UsageGuide data={data.upload.guide} />
              </div>
            </div>
          </motion.div>
        )}

        {step === "loading" && (
          <motion.div
            key="loading"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="cv-review-step"
          >
            <LoadingScreen
              title={data.loading.title}
              stages={LOADING_STAGES}
              currentStage={currentStage}
              progress={progress}
              subStages={data.loading.subStages}
            />
          </motion.div>
        )}

        {step === "result" && result && (
          <motion.div
            key="result"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="cv-review-step"
          >
            <ReviewDashboard
              result={result}
              data={data.result}
              onUploadAgain={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default CvReview;
