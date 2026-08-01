import { motion } from "framer-motion";

function ShowcasePanel() {
  return (
    <motion.section
      className="showcase-panel"
      aria-hidden="true"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
    />
  );
}

export default ShowcasePanel;
