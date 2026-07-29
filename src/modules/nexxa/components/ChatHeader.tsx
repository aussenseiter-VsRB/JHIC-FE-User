import { History, Settings } from "lucide-react";

interface ChatHeaderProps {
  plan: string;
  planAction: string;
}

function ChatHeader({ plan, planAction }: ChatHeaderProps) {
  return (
    <header className="chat-header">
      <button type="button" className="plan-badge">
        {plan} <span className="plan-action">· {planAction}</span>
      </button>
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
