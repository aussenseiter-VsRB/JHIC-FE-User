import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { LayoutDashboard, FileText, CalendarClock } from "lucide-react";
import type { ChatContext } from "../../core/layout";
import ChatHeader from "./components/ChatHeader";
import Greeting from "./components/Greeting";
import ChatInput from "./components/ChatInput";
import ChatMessage from "./components/ChatMessage";
import ShortcutChip from "./components/ShortcutChip";
import data from "./nexxa.json";
import "./css/nexxa.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const shortcutIconMap: Record<string, typeof LayoutDashboard> = {
  "Dashboard PKL": LayoutDashboard,
  "CV Review": FileText,
  "Timeline Agit": CalendarClock,
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
  const [messages, setMessages] = useState<Message[]>([]);
  const { resetKey } = useOutletContext<ChatContext>();

  useEffect(() => {
    setMessages([]);
  }, [resetKey]);

  function handleSend(text: string) {
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `Maket balasan untuk: "${text}"` },
      ]);
    }, 600);
  }

  if (messages.length === 0) {
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
              onSend={handleSend}
            />
          </motion.div>
          <motion.div className="shortcut-chips" variants={fadeUp}>
              {data.shortcuts.map((label) => {
              const Icon = shortcutIconMap[label];
              return Icon ? (
                <ShortcutChip key={label} icon={Icon} label={label} onClick={() => handleSend(label)} />
              ) : null;
            })}
          </motion.div>
        </motion.div>
      </>
    );
  }

  return (
    <>
      <ChatHeader />
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
      </div>
      <div className="chat-input-bottom">
        <ChatInput
          placeholder={data.inputPlaceholder}
          models={data.models}
          onSend={handleSend}
        />
      </div>
    </>
  );
}

export default Nexxa;
