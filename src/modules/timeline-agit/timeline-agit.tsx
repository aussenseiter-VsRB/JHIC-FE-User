import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { BookOpen, GraduationCap, Award, CheckCircle } from "lucide-react";
import data from "./timeline-agit.json";
import "./css/timeline-agit.css";

const iconMap = {
  BookOpen,
  GraduationCap,
  Award,
} as const;

/* ── Variant Definitions ── */

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: -20, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: -12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay: 0.2, ease: "easeOut" },
  },
};

const phaseContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const phaseVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const phaseIconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -45 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 },
  },
};

const lineVariants: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 },
  },
};

const stepsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const dotVariants: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, x: 16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

/* ── Component ── */

function TimelineAgit() {
  return (
    <motion.div
      className="timeline-page"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header with staggered blur-deblur */}
      <header className="timeline-header">
        <motion.h1
          className="timeline-title"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          {data.title}
        </motion.h1>
        <motion.p
          className="timeline-subtitle"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
          {data.subtitle}
        </motion.p>
      </header>

      {/* Phase container with staggered children */}
      <motion.div
        className="timeline-container"
        variants={phaseContainerVariants}
        initial="hidden"
        animate="visible"
      >
        {data.phases.map((phase) => {
          const PhaseIcon = iconMap[phase.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={phase.period}
              className="timeline-phase"
              variants={phaseVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {/* Phase header with icon spin-in */}
              <div className="timeline-phase-header">
                <motion.div
                  className="timeline-phase-icon"
                  variants={phaseIconVariants}
                  whileHover={{
                    scale: 1.15,
                    rotate: 8,
                    transition: { type: "spring", stiffness: 300, damping: 12 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <PhaseIcon size={20} />
                </motion.div>
                <motion.h2
                  className="timeline-phase-title"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                >
                  {phase.period}
                </motion.h2>
              </div>

              {/* Timeline track with animated line growth */}
              <div className="timeline-line-track">
                <motion.div
                  className="timeline-line"
                  variants={lineVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                />

                {/* Steps with staggered entrance */}
                <motion.div
                  className="timeline-steps"
                  variants={stepsContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                >
                  {phase.items.map((item, sIdx) => (
                    <motion.div
                      key={sIdx}
                      className="timeline-step"
                      variants={stepVariants}
                    >
                      {/* Dot with spring pop-in */}
                      <motion.div
                        className="timeline-step-dot"
                        variants={dotVariants}
                        whileHover={{
                          scale: 1.3,
                          borderColor: "#c084fc",
                          color: "#c084fc",
                          transition: { duration: 0.2 },
                        }}
                      >
                        <CheckCircle size={14} />
                      </motion.div>

                      {/* Card with slide-in and hover lift */}
                      <motion.div
                        className="timeline-step-card"
                        variants={cardVariants}
                        whileHover={{
                          y: -4,
                          scale: 1.015,
                          borderColor: "#c084fc40",
                          boxShadow: "0 8px 24px rgba(192, 132, 252, 0.08)",
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        }}
                        whileTap={{ scale: 0.985 }}
                      >
                        <span className="timeline-step-date">{item.date}</span>
                        <h3 className="timeline-step-title">{item.title}</h3>
                        <p className="timeline-step-desc">{item.desc}</p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}

export default TimelineAgit;
