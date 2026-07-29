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

const phaseVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { delay: i * 0.2, duration: 0.4, ease: "easeOut" },
  }),
};

function TimelineAgit() {
  return (
    <motion.div
      className="timeline-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <header className="timeline-header">
        <h1 className="timeline-title">{data.title}</h1>
        <p className="timeline-subtitle">{data.subtitle}</p>
      </header>

      <div className="timeline-container">
        {data.phases.map((phase, pIdx) => {
          const PhaseIcon = iconMap[phase.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={phase.period}
              className="timeline-phase"
              custom={pIdx}
              variants={phaseVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="timeline-phase-header">
                <div className="timeline-phase-icon">
                  <PhaseIcon size={20} />
                </div>
                <h2 className="timeline-phase-title">{phase.period}</h2>
              </div>

              <div className="timeline-line-track">
                <div className="timeline-line" />
                <div className="timeline-steps">
                  {phase.items.map((item, sIdx) => (
                    <div key={sIdx} className="timeline-step">
                      <div className="timeline-step-dot">
                        <CheckCircle size={14} />
                      </div>
                      <div className="timeline-step-card">
                        <span className="timeline-step-date">{item.date}</span>
                        <h3 className="timeline-step-title">{item.title}</h3>
                        <p className="timeline-step-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default TimelineAgit;
