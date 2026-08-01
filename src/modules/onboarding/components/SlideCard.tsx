import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Sparkles, MessageSquare, Search, Stamp, FileText, CalendarClock } from "lucide-react";

export interface OnboardingSlideData {
  id: number;
  icon: string;
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

const iconMap = {
  Sparkles,
  MessageSquare,
  Search,
  Stamp,
  FileText,
  CalendarClock,
} as const;

const iconVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -12 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
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
  const SlideIcon = iconMap[slide.icon as keyof typeof iconMap];

  return (
    <div className="onboarding-slide" data-accent={slide.accent}>
      <span className="onboarding-slide-index">
        {slideLabel} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      <motion.div
        className="onboarding-slide-icon"
        variants={iconVariants}
        initial="hidden"
        animate="visible"
      >
        <SlideIcon size={44} strokeWidth={1.5} aria-hidden="true" />
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
