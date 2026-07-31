import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ShowcasePanelProps {
  headline: string;
  label: string;
  description: string;
  avatarNames: string[];
}

function ShowcasePanel({ headline, label, description, avatarNames }: ShowcasePanelProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="showcase-panel"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    >
      <div className="showcase-glow" aria-hidden="true" />
      <div className="showcase-content">
        <h2 className="showcase-headline">{headline}</h2>

        <div className="showcase-art" aria-hidden="true">
          <motion.div
            className="art-orbit"
            animate={prefersReducedMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="art-ring art-ring--large"
            animate={prefersReducedMotion ? undefined : { rotate: -180 }}
            transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
          />
          <div className="art-ring art-ring--tilt" />
          <motion.div
            className="art-core"
            animate={prefersReducedMotion ? undefined : { y: [0, -16, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="art-ring art-ring--accent" />
        </div>

        <div className="showcase-card">
          <div className="showcase-card-top">
            <span className="showcase-label">{label}</span>
            <div className="showcase-avatars" aria-hidden="true">
              {avatarNames.map((name) => (
                <span key={name} className="showcase-avatar">
                  {name.charAt(0)}
                </span>
              ))}
            </div>
          </div>
          <p className="showcase-desc">{description}</p>
          <div className="showcase-nav">
            <motion.button
              type="button"
              className="showcase-nav-btn"
              aria-label="Sebelumnya"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronLeft size={16} />
            </motion.button>
            <motion.button
              type="button"
              className="showcase-nav-btn"
              aria-label="Berikutnya"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default ShowcasePanel;
