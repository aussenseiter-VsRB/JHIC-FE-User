import { motion } from "framer-motion";

interface GreetingProps {
  name: string;
}

function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Pagi";
  if (hour < 17) return "Siang";
  if (hour < 21) return "Sore";
  return "Malam";
}

function Greeting({ name }: GreetingProps) {
  const text = `Selamat ${getTimeOfDay()}, ${name}`;

  return (
    <div className="greeting">
      <motion.h1 className="greeting-text" aria-label={text}>
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.35, ease: "easeOut" }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
}

export default Greeting;
