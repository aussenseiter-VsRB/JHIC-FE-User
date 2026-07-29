import { Folder } from "lucide-react";

interface ProjectItemProps {
  label: string;
}

function ProjectItem({ label }: ProjectItemProps) {
  return (
    <button type="button" className="project-item">
      <Folder size={14} />
      <span>{label}</span>
    </button>
  );
}

export default ProjectItem;
