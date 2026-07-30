import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  AlertCircle,
  CheckCircle,
  Building2,
  Sparkles,
  Tag,
  RefreshCw,
} from "lucide-react";
import { analyzeCvMatch, LOADING_STAGES } from "../services/dashboardService";
import type { CvAnalysisResult } from "../services/dashboardService";
import type { Variants } from "framer-motion";

interface CvUploadBoxProps {
  data: {
    title: string;
    description: string;
    dropzoneText: string;
    browseText: string;
    fileRestriction: string;
    selectButton: string;
    analyzeButton: string;
    errorFormat?: string;
    errorSize?: string;
  };
  resultLabels: {
    heading: string;
    matchedSkills: string;
    recommendations: string;
    matchLabel: string;
    analyzeAnother: string;
  };
}

type Step = "upload" | "loading" | "result";

const stageVariants: Variants = {
  initial: { opacity: 0, x: -12 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: 12, transition: { duration: 0.15 } },
};

const MAX_FILE_SIZE_MB = 5;

function CvUploadBox({ data, resultLabels }: CvUploadBoxProps) {
  const [step, setStep] = useState<Step>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<CvAnalysisResult | null>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const intervalsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const validateAndSetFile = useCallback(
    (f: File) => {
      setErrorMsg(null);
      if (
        f.type !== "application/pdf" &&
        !f.name.toLowerCase().endsWith(".pdf")
      ) {
        setErrorMsg(data.errorFormat || "File harus berformat PDF (.pdf)");
        return;
      }
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setErrorMsg(
          data.errorSize ||
            `Ukuran file melebihi batas maksimal ${MAX_FILE_SIZE_MB} MB`,
        );
        return;
      }
      setFile(f);
    },
    [data.errorFormat, data.errorSize],
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) validateAndSetFile(f);
      e.target.value = "";
    },
    [validateAndSetFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDragLeave = useCallback(() => {}, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) validateAndSetFile(f);
    },
    [validateAndSetFile],
  );

  const handleRemoveFile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setErrorMsg(null);
  }, []);

  const handleStartAnalysis = useCallback(async () => {
    if (!file) return;
    setStep("loading");
    setCurrentStage(0);
    setProgress(0);

    const stageDuration = 900;
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
      const analysisResult = await analyzeCvMatch();
      clearInterval(pi);
      setProgress(100);
      await new Promise((r) => setTimeout(r, 400));
      setResult(analysisResult);
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
    <div className="cv-upload dashboard-card">
      {step === "upload" && (
        <div className="cv-upload-inner">
          <div className="cv-upload-header">
            <div className="cv-upload-icon">
              <FileText size={24} />
            </div>
            <h2 className="cv-upload-title">{data.title}</h2>
            <p className="cv-upload-desc">{data.description}</p>
          </div>

          <AnimatePresence>
            {errorMsg && (
              <motion.div
                className="cv-upload-error"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
              >
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div
            className={`cv-upload-dropzone${file ? " cv-upload-dropzone--filled" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={!file ? handleClick : undefined}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="cv-upload-hidden-input"
            />

            {file ? (
              <div className="cv-upload-file-card">
                <div className="cv-upload-file-info">
                  <div className="cv-upload-file-badge">
                    <FileText size={20} />
                  </div>
                  <div className="cv-upload-file-meta">
                    <span className="cv-upload-file-name" title={file.name}>
                      {file.name}
                    </span>
                    <span className="cv-upload-file-size">
                      {(file.size / 1024 / 1024).toFixed(2)} MB • PDF
                    </span>
                  </div>
                </div>
                <div className="cv-upload-file-actions">
                  <span className="cv-upload-ready-badge">
                    <CheckCircle size={12} /> Siap
                  </span>
                  <button
                    type="button"
                    className="cv-upload-remove-btn"
                    onClick={handleRemoveFile}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="cv-upload-dropzone-icon">
                  <Upload size={28} />
                </div>
                <p className="cv-upload-dropzone-text">{data.dropzoneText}</p>
                <p className="cv-upload-browse-text">{data.browseText}</p>
                <button
                  type="button"
                  className="cv-upload-select-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClick();
                  }}
                >
                  {data.selectButton}
                </button>
                <p className="cv-upload-restriction">{data.fileRestriction}</p>
              </>
            )}
          </div>

          <motion.button
            type="button"
            className="cv-upload-analyze-btn"
            disabled={!file}
            whileHover={file ? { scale: 1.02 } : {}}
            whileTap={file ? { scale: 0.98 } : {}}
            onClick={handleStartAnalysis}
          >
            <Sparkles size={16} />
            {data.analyzeButton}
          </motion.button>
        </div>
      )}

      {step === "loading" && (
        <div className="cv-upload-loading">
          <div className="cv-upload-loading-spinner">
            <motion.div
              className="cv-upload-loading-ring"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles size={24} />
            </motion.div>
          </div>
          <h3 className="cv-upload-loading-title">Menganalisis CV Anda</h3>
          <div className="cv-upload-loading-stages">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentStage}
                className="cv-upload-loading-stage"
                variants={stageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {LOADING_STAGES[currentStage]}
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="cv-upload-progress-bar">
            <motion.div
              className="cv-upload-progress-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="cv-upload-loading-dots">
            {LOADING_STAGES.map((_, i) => (
              <span
                key={i}
                className={`cv-upload-dot${i <= currentStage ? " cv-upload-dot--active" : ""}`}
              />
            ))}
          </div>
        </div>
      )}

      {step === "result" && result && (
        <div className="cv-upload-result">
          <div className="cv-upload-result-header">
            <div className="cv-upload-result-icon">
              <CheckCircle size={22} />
            </div>
            <h3 className="cv-upload-result-heading">
              {resultLabels.heading}
            </h3>
            <p className="cv-upload-result-name">
              Hallo, <strong>{result.name}</strong>
            </p>
          </div>

          <div className="cv-upload-skills">
            <h4 className="cv-upload-section-title">
              <Tag size={14} />
              {resultLabels.matchedSkills}
            </h4>
            <div className="cv-upload-skills-list">
              {result.skills.map((skill) => (
                <span key={skill} className="cv-upload-skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="cv-upload-recommendations">
            <h4 className="cv-upload-section-title">
              <Building2 size={14} />
              {resultLabels.recommendations}
            </h4>
            <div className="cv-upload-company-list">
              {result.recommendations.map((rec, i) => (
                <motion.div
                  key={rec.company}
                  className="cv-upload-company-card"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.35 }}
                >
                  <div className="cv-upload-company-top">
                    <div className="cv-upload-company-info">
                      <div className="cv-upload-company-icon">
                        <Building2 size={18} />
                      </div>
                      <div>
                        <span className="cv-upload-company-name">
                          {rec.company}
                        </span>
                        <span className="cv-upload-company-match">
                          {rec.match}% {resultLabels.matchLabel}
                        </span>
                      </div>
                    </div>
                    <div className="cv-upload-match-ring">
                      <svg viewBox="0 0 36 36" className="cv-upload-match-svg">
                        <path
                          className="cv-upload-match-bg"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="cv-upload-match-fill"
                          strokeDasharray={`${rec.match}, 100`}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <text x="18" y="21" className="cv-upload-match-text">
                          {rec.match}%
                        </text>
                      </svg>
                    </div>
                  </div>
                  <p className="cv-upload-company-reason">{rec.reason}</p>
                  <div className="cv-upload-company-tags">
                    {rec.tags.map((tag) => (
                      <span key={tag} className="cv-upload-company-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button
            type="button"
            className="cv-upload-reset-btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
          >
            <RefreshCw size={14} />
            {resultLabels.analyzeAnother}
          </motion.button>
        </div>
      )}
    </div>
  );
}

export default CvUploadBox;
