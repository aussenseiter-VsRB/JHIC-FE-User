import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, Mic, ArrowUp, ChevronDown, Check, Upload } from "lucide-react";

interface ChatInputProps {
  placeholder: string;
  models: string[];
  onSend: (message: string) => void;
  isSending?: boolean;
  maxChars?: number;
  placeholderCycle?: string[];
}

function ChatInput({
  placeholder,
  models,
  onSend,
  isSending = false,
  maxChars = 2000,
  placeholderCycle,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [open, setOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const charCount = value.length;
  const isOverLimit = charCount > maxChars;

  useEffect(() => {
    if (placeholderCycle && placeholderCycle.length > 0) {
      cycleRef.current = setInterval(() => {
        setPlaceholderIndex((i) => (i + 1) % placeholderCycle.length);
      }, 4000);
    }
    return () => clearInterval(cycleRef.current);
  }, [placeholderCycle]);

  useEffect(() => {
    if (!isSending && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isSending]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSend() {
    if (!value.trim() || isSending || isOverLimit) return;
    onSend(value.trim());
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
  }

  const getCounterClass = useCallback(() => {
    if (charCount > maxChars * 0.95) return "char-counter char-counter--danger";
    if (charCount > maxChars * 0.8) return "char-counter char-counter--warn";
    return "char-counter";
  }, [charCount, maxChars]);

  const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const shortcutKey = isMac ? "Cmd" : "Ctrl";

  return (
    <div className="chat-input-wrapper">
      <motion.div
        className={`chat-input-box${isDragOver ? " chat-input-box--drag" : ""}`}
        animate={{ borderColor: isDragOver ? "#a855f7" : undefined }}
        transition={{ duration: 0.15 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{ position: "relative" }}
      >
        {isDragOver && (
          <div className="chat-input-drag-overlay">
            <Upload size={20} />
            <span>Lepaskan file di sini</span>
          </div>
        )}

        <div className="chat-input-placeholder-wrap">
          {value === "" && placeholderCycle && placeholderCycle.length > 0 && (
            <div
              className={`chat-input-placeholder-fake chat-input-placeholder-fake--visible`}
              aria-hidden="true"
            >
              {placeholderCycle.map((p, i) => (
                <span
                  key={p}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: i === placeholderIndex ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          )}
          <textarea
            ref={textareaRef}
            className="chat-input-field"
            placeholder={
              placeholderCycle && placeholderCycle.length > 0
                ? ""
                : placeholder
            }
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isSending}
            aria-label="Pesan"
          />
        </div>

        <div className="chat-input-tools">
          <div className="chat-input-tools-left">
            <motion.button
              type="button"
              className="input-icon-btn"
              aria-label="Lampirkan file"
              whileHover={{ scale: 1.1, color: "#a1a1aa" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              disabled={isSending}
            >
              <Paperclip size={18} />
            </motion.button>
            <div className="model-selector" ref={dropdownRef}>
              <motion.button
                type="button"
                className="model-select-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={() => !isSending && setOpen((v) => !v)}
                disabled={isSending}
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
                {open && !isSending && (
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
            <span className="shortcut-hint">
              <kbd>{shortcutKey}</kbd>+<kbd>Enter</kbd>
            </span>

            <span className={getCounterClass()}>
              <span className="char-counter__current">{charCount}</span>
              <span>/{maxChars}</span>
            </span>

            <motion.button
              type="button"
              className="input-icon-btn"
              aria-label="Input suara"
              whileHover={{ scale: 1.1, color: "#a1a1aa" }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              disabled={isSending}
            >
              <Mic size={18} />
            </motion.button>

            <motion.button
              type="button"
              className={`submit-btn${value.trim() && !isOverLimit ? " submit-btn--active" : ""}${isSending ? " submit-btn--sending" : ""}`}
              aria-label="Kirim pesan"
              whileHover={value.trim() && !isSending && !isOverLimit ? { scale: 1.1 } : undefined}
              whileTap={value.trim() && !isSending && !isOverLimit ? { scale: 0.9 } : undefined}
              transition={{ duration: 0.15 }}
              onClick={handleSend}
              disabled={isSending || isOverLimit || !value.trim()}
            >
              {isSending ? (
                <div className="submit-spinner" />
              ) : (
                <ArrowUp size={20} />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ChatInput;
