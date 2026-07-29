import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Image, PenLine, Terminal, Search } from "lucide-react";
import ChatHeader from "./components/ChatHeader";
import Greeting from "./components/Greeting";
import ChatInput from "./components/ChatInput";
import ShortcutChip from "./components/ShortcutChip";
import data from "./nexxa.json";
import "./css/nexxa.css";

const shortcutIconMap: Record<string, typeof Image> = {
  "Buat Gambar": Image,
  "Tulis Cerdas": PenLine,
  "Koding AI": Terminal,
  "Riset Mendalam": Search,
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Nexxa() {
  return (
    <>
      <ChatHeader />
      <motion.div
        className="main-center"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp}>
          <Greeting name={data.userName} />
        </motion.div>
        <motion.div variants={fadeUp} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <ChatInput
            placeholder={data.inputPlaceholder}
            models={data.models}
          />
        </motion.div>
        <motion.div className="shortcut-chips" variants={fadeUp}>
          {data.shortcuts.map((label) => {
            const Icon = shortcutIconMap[label];
            return Icon ? (
              <ShortcutChip key={label} icon={Icon} label={label} />
            ) : null;
          })}
        </motion.div>
      </motion.div>
    </>
  );
}

export default Nexxa;
