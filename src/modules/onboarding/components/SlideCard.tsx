import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import slide1 from "../../../assets/onboarding/slide1.png";
import slide2 from "../../../assets/onboarding/slide2.png";
import slide3 from "../../../assets/onboarding/slide3.png";
import slide4 from "../../../assets/onboarding/slide4.png";
import slide5 from "../../../assets/onboarding/slide5.png";
import slide6 from "../../../assets/onboarding/slide6.png";

export interface OnboardingSlideData {
  id: number;
  accent: string;
  title: string;
  description: string;
}

interface SlideCardProps {
  slide: OnboardingSlideData;
  index: number;
  total: number;
  slideLabel: string;
}

const images = [slide1, slide2, slide3, slide4, slide5, slide6];

const mediaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.08 },
  },
};

const textVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", delay: 0.18 },
  },
};

function SlideCard({ slide, index, total, slideLabel }: SlideCardProps) {
  return (
    <div className="onboarding-slide" data-accent={slide.accent}>
      <span className="onboarding-slide-index">
        {slideLabel} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      <motion.div
        className="onboarding-slide-media"
        variants={mediaVariants}
        initial="hidden"
        animate="visible"
      >
        <img src={images[index]} alt={slide.title} />
      </motion.div>

      <motion.div
        className="onboarding-slide-copy"
        variants={textVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="onboarding-slide-title">{slide.title}</h1>
        <p className="onboarding-slide-desc">{slide.description}</p>
      </motion.div>
    </div>
  );
}

export default SlideCard;
