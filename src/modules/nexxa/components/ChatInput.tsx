import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Mic, ArrowUp, ChevronDown, Check } from "lucide-react";

interface ChatInputProps {
  placeholder: string;
  models: string[];
}

function ChatInput({ placeholder, models }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="chat-input-wrapper">
      <motion.div
        className="chat-input-box"
        whileHover={{ borderColor: "#3f3f46" }}
        transition={{ duration: 0.15 }}
      >
        <textarea
          className="chat-input-field"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={1}
        />
        <div className="chat-input-tools">
          <div className="chat-input-tools-left">
            <motion.button
              type="button"
              className="input-icon-btn"
              aria-label="Attach file"
              whileHover={{ scale: 1.1, color: "#a1a1aa" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <Paperclip size={18} />
            </motion.button>
            <div className="model-selector" ref={ref}>
              <motion.button
                type="button"
                className="model-select-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={() => setOpen((v) => !v)}
              >
                <span>{selectedModel}</span>
                <motion.span
                  style={{ display: "inline-flex" }}
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown size={14} />
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {open && (
                  <motion.div
                    className="model-dropdown"
                    initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    {models.map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`model-dropdown-item${m === selectedModel ? " model-dropdown-item--active" : ""}`}
                        onClick={() => {
                          setSelectedModel(m);
                          setOpen(false);
                        }}
                      >
                        <span>{m}</span>
                        {m === selectedModel && <Check size={14} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="chat-input-tools-right">
            <motion.button
              type="button"
              className="input-icon-btn"
              aria-label="Voice input"
              whileHover={{ scale: 1.1, color: "#a1a1aa" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              <Mic size={18} />
            </motion.button>
            <motion.button
              type="button"
              className={`submit-btn${value.trim() ? " submit-btn--active" : ""}`}
              aria-label="Send message"
              whileHover={value.trim() ? { scale: 1.1 } : undefined}
              whileTap={value.trim() ? { scale: 0.9 } : undefined}
              transition={{ duration: 0.15 }}
            >
              <ArrowUp size={20} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ChatInput;
