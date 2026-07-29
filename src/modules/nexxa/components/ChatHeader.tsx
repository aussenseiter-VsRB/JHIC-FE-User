import { History, Settings } from "lucide-react";

function ChatHeader() {
  return (
    <header className="chat-header">
      <div className="chat-header-actions">
        <button type="button" className="icon-btn" aria-label="History">
          <History size={18} />
        </button>
        <button type="button" className="icon-btn" aria-label="Settings">
          <Settings size={18} />
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;
