import { motion } from "framer-motion";
import { History, Settings } from "lucide-react";

function ChatHeader() {
  return (
    <header className="chat-header">
      <motion.div
        className="chat-header-actions"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <motion.button
          type="button"
          className="icon-btn"
          aria-label="Riwayat"
          whileHover={{ scale: 1.15, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15 }}
        >
          <History size={18} />
        </motion.button>
        <motion.button
          type="button"
          className="icon-btn"
          aria-label="Pengaturan"
          whileHover={{ scale: 1.15, rotate: 45 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.15 }}
        >
          <Settings size={18} />
        </motion.button>
      </motion.div>
    </header>
  );
}

export default ChatHeader;
