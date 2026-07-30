import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CheckCircle, Clock, FileText } from "lucide-react";

interface Step {
  key: string;
  label: string;
  nama: string;
  status: "approved" | "pending";
  tanggal: string | null;
  catatan: string | null;
}

interface ProgressStepperProps {
  steps: Step[];
  nomorSurat: string;
  namaSiswa: string;
  perusahaan: string;
  periode: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function ProgressStepper({ steps, nomorSurat, perusahaan, periode }: ProgressStepperProps) {
  const approvedCount = steps.filter((s) => s.status === "approved").length;
  const progress = (approvedCount / steps.length) * 100;

  return (
    <div className="progress-stepper">
      <div className="progress-header">
        <div className="progress-header-top">
          <h2>Status Persetujuan Surat</h2>
          <span className="progress-badge">{approvedCount}/{steps.length} Selesai</span>
        </div>
        <div className="progress-meta">
          <div className="progress-meta-item">
            <FileText size={14} />
            <span>{nomorSurat}</span>
          </div>
          <div className="progress-meta-item">
            <span className="progress-meta-label">Perusahaan:</span>
            <span className="progress-meta-value">{perusahaan}</span>
          </div>
          <div className="progress-meta-item">
            <span className="progress-meta-label">Periode:</span>
            <span className="progress-meta-value">{periode}</span>
          </div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="overall-progress">
        <div className="overall-progress-label">
          <span>Progress Keseluruhan</span>
          <span className="overall-progress-percent">{Math.round(progress)}%</span>
        </div>
        <div className="overall-progress-bar">
          <motion.div
            className="overall-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          />
        </div>
      </div>

      {/* Steps */}
      <motion.div
        className="steps-list"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((step, idx) => {
          const isApproved = step.status === "approved";

          const isActive = idx === approvedCount;

          return (
            <motion.div
              key={step.key}
              className={`step-item ${isApproved ? "approved" : ""} ${isActive ? "active" : ""}`}
              variants={itemVariants}
              whileHover={isApproved ? { scale: 1.02, x: 4 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="step-icon-wrapper">
                {isApproved ? (
                  <motion.div
                    className="step-icon approved"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: idx * 0.15 }}
                  >
                    <CheckCircle size={20} />
                  </motion.div>
                ) : (
                  <div className={`step-icon ${isActive ? "active" : "pending"}`}>
                    {isActive ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Clock size={20} />
                      </motion.div>
                    ) : (
                      <Clock size={20} />
                    )}
                  </div>
                )}
                {idx < steps.length - 1 && (
                  <div className={`step-connector ${isApproved ? "approved" : ""}`} />
                )}
              </div>

              <div className="step-content">
                <div className="step-header">
                  <h3 className="step-label">{step.label}</h3>
                  <span className={`step-status ${step.status}`}>
                    {step.status === "approved" ? "Disetujui" : "Menunggu"}
                  </span>
                </div>
                <p className="step-name">{step.nama}</p>
                {step.tanggal && (
                  <p className="step-date">{step.tanggal}</p>
                )}
                {step.catatan && (
                  <p className="step-notes">{step.catatan}</p>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default ProgressStepper;
