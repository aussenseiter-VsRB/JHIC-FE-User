import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content?: string;
  isTyping?: boolean;
}

function ChatMessage({ role, content, isTyping = false }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <motion.div
      className={`chat-message ${isUser ? "chat-message--user" : "chat-message--assistant"}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="chat-message-avatar">
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>
      <div className={`chat-message-bubble ${isTyping ? "chat-message-bubble--typing" : ""}`}>
        {isTyping ? (
          <div className="bounce-balls">
            <span className="bounce-ball bounce-ball-1" />
            <span className="bounce-ball bounce-ball-2" />
            <span className="bounce-ball bounce-ball-3" />
          </div>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </motion.div>
  );
}

export default ChatMessage;
