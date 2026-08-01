import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft, ArrowRight, Check } from "lucide-react";
import SlideCard from "./components/SlideCard";
import data from "./onboarding.json";
import "./css/onboarding.css";

const slideVariants: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 56 }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction * -56,
    transition: { duration: 0.2 },
  }),
};

function Onboarding() {
  const navigate = useNavigate();
  const slides = data.slides;
  const total = slides.length;
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);

  const finish = useCallback(() => {
    navigate("/home");
  }, [navigate]);

  const goNext = useCallback(() => {
    setSlide(([current]) =>
      current === total - 1 ? [current, 0] : [current + 1, 1],
    );
  }, [total]);

  const goPrev = useCallback(() => {
    setSlide(([current]) => (current === 0 ? [current, 0] : [current - 1, -1]));
  }, []);

  const goTo = useCallback(
    (target: number) => {
      setSlide(([current]) => {
        if (target === current) return [current, 0];
        return [target, target > current ? 1 : -1];
      });
    },
    [],
  );

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  const isLast = index === total - 1;

  return (
    <div className="onboarding-page">
      <div className="onboarding-aurora" aria-hidden="true" />

      <header className="onboarding-topbar">
        <div className="onboarding-brand">
          <span className="onboarding-brand-icon">
            <Sparkles size={18} aria-hidden="true" />
          </span>
          <span className="onboarding-brand-text">{data.appName}</span>
        </div>
        <motion.button
          type="button"
          className="onboarding-skip"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={{ duration: 0.15 }}
          onClick={finish}
        >
          {data.skipLabel}
        </motion.button>
      </header>

      <main className="onboarding-stage">
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="onboarding-slide-wrap"
          >
            <SlideCard
              slide={slides[index]}
              index={index}
              total={total}
              slideLabel={data.slideLabel}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="onboarding-footer">
        <div className="onboarding-dots" role="tablist" aria-label={data.slideLabel}>
          {slides.map((slide, dotIndex) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={`${data.slideLabel} ${dotIndex + 1}`}
              className={`onboarding-dots-dot${dotIndex === index ? " onboarding-dots-dot--active" : ""}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>

        <div className="onboarding-nav">
          <motion.button
            type="button"
            className="onboarding-nav-back"
            aria-label={data.backLabel}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.15 }}
            onClick={goPrev}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </motion.button>
          <motion.button
            type="button"
            className="onboarding-nav-next"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onClick={isLast ? finish : goNext}
          >
            {isLast ? (
              <>
                {data.finishLabel}
                <Check size={18} aria-hidden="true" />
              </>
            ) : (
              <>
                {data.nextLabel}
                <ArrowRight size={18} aria-hidden="true" />
              </>
            )}
          </motion.button>
        </div>
      </footer>
    </div>
  );
}

export default Onboarding;
