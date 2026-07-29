import {
  Sparkles,
  PanelLeftClose,
  Plus,
  Search,
  MessageSquare,
  FolderKanban,
  Library,
  Code,
  Compass,
  Settings,
} from "lucide-react";

import RecentItem from "./RecentItem";
import ProjectItem from "./ProjectItem";
import data from "../../modules/nexxa/nexxa.json";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navIconMap: Record<string, typeof Search> = {
  Search,
  Chats: MessageSquare,
  Projects: FolderKanban,
  Library,
  Code,
};

function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside className={`sidebar${collapsed ? " sidebar--collapsed" : ""}`}>
      <div className="sidebar-inner">
        <div className="sidebar-header">
          {!collapsed && (
            <div className="sidebar-logo">
              <Sparkles size={20} className="sidebar-logo-icon" />
              <span className="sidebar-logo-text">{data.appName}</span>
            </div>
          )}
          <button
            type="button"
            className="icon-btn sidebar-collapse-btn"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        {!collapsed && (
          <button type="button" className="new-chat-btn">
            <Plus size={16} />
            <span>{data.newChat}</span>
          </button>
        )}

        <nav className="sidebar-nav">
          {data.navItems.map((label) => {
            const Icon = navIconMap[label];
            return (
              <button key={label} type="button" className="nav-item">
                {Icon && <Icon size={18} />}
                {!collapsed && <span>{label}</span>}
              </button>
            );
          })}
        </nav>

        {!collapsed && (
          <>
            <div className="sidebar-section">
              <div className="sidebar-section-title">{data.gptsTitle}</div>
              <button type="button" className="nav-item">
                <Compass size={18} />
                <span>{data.exploreGpts}</span>
              </button>
            </div>

            <div className="sidebar-section">
              <div className="sidebar-section-title">{data.projectsTitle}</div>
              {data.projects.map((project) => (
                <ProjectItem key={project} label={project} />
              ))}
            </div>

            <div className="sidebar-section">
              <div className="sidebar-section-title">{data.recentsTitle}</div>
              {data.recents.length === 0 ? (
                <div className="sidebar-empty">No recent chats</div>
              ) : (
                data.recents.map((recent) => (
                  <RecentItem key={recent} label={recent} />
                ))
              )}
            </div>
          </>
        )}
      </div>

      {!collapsed && (
        <div className="sidebar-bottom">
          <div className="promo-card">
            <div className="promo-header">
              <span className="promo-title">{data.promoTitle}</span>
              <span className="promo-badge">{data.promoBadge}</span>
            </div>
            <button type="button" className="promo-cta">
              {data.promoCta}
            </button>
          </div>

          <div className="user-footer">
            <div className="user-avatar">
              {data.userName.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="user-name">{data.userName}</span>
            </div>
            <button type="button" className="icon-btn" aria-label="Settings">
              <Settings size={16} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
