import { MessageSquare } from "lucide-react";

interface RecentItemProps {
  label: string;
}

function RecentItem({ label }: RecentItemProps) {
  return (
    <button type="button" className="recent-item" title={label}>
      <MessageSquare size={14} />
      <span>{label}</span>
    </button>
  );
}

export default RecentItem;
