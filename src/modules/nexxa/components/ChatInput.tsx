import { useState } from "react";
import { Paperclip, Mic, ArrowUp, ChevronDown } from "lucide-react";

interface ChatInputProps {
  placeholder: string;
  models: string[];
}

function ChatInput({ placeholder, models }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [selectedModel] = useState(models[0]);

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input-box">
        <textarea
          className="chat-input-field"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={1}
        />
        <div className="chat-input-tools">
          <div className="chat-input-tools-left">
            <button type="button" className="input-icon-btn" aria-label="Attach file">
              <Paperclip size={18} />
            </button>
            <div className="model-selector">
              <button type="button" className="model-select-btn">
                <span>{selectedModel}</span>
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
          <div className="chat-input-tools-right">
            <button type="button" className="input-icon-btn" aria-label="Voice input">
              <Mic size={18} />
            </button>
            <button
              type="button"
              className={`submit-btn${value.trim() ? " submit-btn--active" : ""}`}
              aria-label="Send message"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatInput;
