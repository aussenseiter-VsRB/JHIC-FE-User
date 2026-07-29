import { motion } from "framer-motion";
import "./css/cv-review.css";

function CvReview() {
  return (
    <motion.div
      className="page-placeholder"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h1 className="page-placeholder-title">CV Review</h1>
      <p className="page-placeholder-desc">Halaman ini sedang dalam pengembangan</p>
    </motion.div>
  );
}

export default CvReview;
