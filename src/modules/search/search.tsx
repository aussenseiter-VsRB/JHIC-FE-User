import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Search as SearchIcon, Clock, MessageSquare, X } from "lucide-react";
import data from "./search.json";
import "./css/search.css";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return <>{text}</>;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="search-highlight">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

const headerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const resultItemAnim: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

const iconHover: Variants = {
  hover: { scale: 1.15, rotate: -8, transition: { duration: 0.2, ease: "easeOut" } },
};

function Search() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = query.trim()
    ? data.chats.filter(
        (chat) =>
          chat.title.toLowerCase().includes(query.toLowerCase()) ||
          chat.snippet.toLowerCase().includes(query.toLowerCase()),
      )
    : data.chats;

  return (
    <div className="search-page">
      <motion.div
        className="search-header"
        variants={headerStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="search-title" variants={headerItem}>
          Cari
        </motion.h1>

        <motion.div className="search-input-wrapper" variants={headerItem}>
          <motion.span
            className="search-input-icon"
            animate={{ color: focused ? "#a1a1aa" : "#52525b" }}
            transition={{ duration: 0.15 }}
          >
            <SearchIcon size={18} />
          </motion.span>
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Cari riwayat konsultasi..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                key="clear"
                type="button"
                className="search-clear-btn"
                onClick={() => setQuery("")}
                aria-label="Hapus pencarian"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                whileHover={{ scale: 1.1, backgroundColor: "#27272a" }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          className="search-result-count"
          variants={headerItem}
        >
          {filtered.length} dari {data.chats.length} konsultasi
        </motion.p>
      </motion.div>

      <motion.div
        className="search-results"
        variants={headerStagger}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              className="search-empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SearchIcon size={32} />
              <p>Konsultasi tidak ditemukan</p>
              <span>Coba kata kunci lainnya</span>
            </motion.div>
          ) : (
            filtered.map((chat) => (
              <motion.button
                key={chat.id}
                type="button"
                className="search-result-item"
                layout
                variants={resultItemAnim}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover="hover"
              >
                <div className="search-result-top">
                  <h3 className="search-result-title">
                    {highlightMatch(chat.title, query)}
                  </h3>
                  <span className="search-result-date">
                    <motion.span style={{ display: "inline-flex" }} variants={iconHover}>
                      <Clock size={12} />
                    </motion.span>
                    {formatDate(chat.date)}
                  </span>
                </div>
                <p className="search-result-snippet">
                  {highlightMatch(chat.snippet, query)}
                </p>
                <div className="search-result-meta">
                  <motion.span style={{ display: "inline-flex" }} variants={iconHover}>
                    <MessageSquare size={12} />
                  </motion.span>
                  <span>{chat.messages} pesan</span>
                </div>
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default Search;