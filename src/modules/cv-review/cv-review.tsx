import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { reviewCv, CvReviewError, LOADING_STAGES } from "./services/reviewService";
import type { ReviewResult } from "./services/reviewService";
import UploadForm from "./components/UploadForm";
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
  const [error, setError] = useState<string | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const navigate = useNavigate();

  const handleFileSelect = useCallback((f: File | null) => {
    setFile(f);
    setError(null);
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
      const { extractCvFile } = await import("./services/cvFile");
      const extracted = await extractCvFile(file);
      const reviewResult = await reviewCv(extracted.text, extracted.wordCount, 0);
      clearInterval(pi);
      setProgress(100);
      await new Promise((r) => setTimeout(r, 400));
      setResult(reviewResult);
      setError(null);
      setStep("result");
    } catch (err) {
      clearInterval(pi);
      setStep("upload");
      if (err instanceof CvReviewError && err.status === 401) {
        navigate("/login");
        return;
      }
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menganalisis CV.",
      );
    }

    intervalsRef.current.forEach(clearTimeout);
  }, [file, navigate]);

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
            <UploadForm
              data={data.upload}
              file={file}
              errorMsg={error}
              onFileSelect={handleFileSelect}
              onStartAnalysis={handleStartAnalysis}
            />
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
