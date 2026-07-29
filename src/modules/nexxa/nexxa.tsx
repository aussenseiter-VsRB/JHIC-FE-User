import { useState } from "react";
import { Image, PenLine, Terminal, Search } from "lucide-react";
import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import Greeting from "./components/Greeting";
import ChatInput from "./components/ChatInput";
import ShortcutChip from "./components/ShortcutChip";
import data from "./nexxa.json";
import "./css/nexxa.css";

const shortcutIconMap: Record<string, typeof Image> = {
  "Create an Image": Image,
  "Smart Writing": PenLine,
  "AI Coding": Terminal,
  "Deep Research": Search,
};

function Nexxa() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="nexxa">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((v) => !v)}
      />
      <main className="main-content">
        <ChatHeader plan={data.plan} planAction={data.planAction} />
        <div className="main-center">
          <Greeting name={data.userName} />
          <ChatInput
            placeholder={data.inputPlaceholder}
            models={data.models}
          />
          <div className="shortcut-chips">
            {data.shortcuts.map((label) => {
              const Icon = shortcutIconMap[label];
              return Icon ? (
                <ShortcutChip key={label} icon={Icon} label={label} />
              ) : null;
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Nexxa;
