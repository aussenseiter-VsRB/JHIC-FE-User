import type { LucideIcon } from "lucide-react";

interface ShortcutChipProps {
  icon: LucideIcon;
  label: string;
}

function ShortcutChip({ icon: Icon, label }: ShortcutChipProps) {
  return (
    <button type="button" className="shortcut-chip">
      <Icon size={14} />
      <span>{label}</span>
    </button>
  );
}

export default ShortcutChip;
