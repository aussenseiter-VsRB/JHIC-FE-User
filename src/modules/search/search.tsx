import { useState, useRef, useEffect } from "react";
import { Search as SearchIcon, Clock, MessageSquare, X } from "lucide-react";
import data from "./search.json";
import "./css/search.css";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
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

function Search() {
  const [query, setQuery] = useState("");
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
      <div className="search-header">
        <h1 className="search-title">Search</h1>
        <div className="search-input-wrapper">
          <SearchIcon size={18} className="search-input-icon" />
          <input
            ref={inputRef}
            type="text"
            className="search-input"
            placeholder="Search chat history..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <p className="search-result-count">
          {filtered.length} of {data.chats.length} conversations
        </p>
      </div>

      <div className="search-results">
        {filtered.length === 0 ? (
          <div className="search-empty">
            <SearchIcon size={32} />
            <p>No conversations found</p>
            <span>Try a different search term</span>
          </div>
        ) : (
          filtered.map((chat) => (
            <button key={chat.id} type="button" className="search-result-item">
              <div className="search-result-top">
                <h3 className="search-result-title">
                  {highlightMatch(chat.title, query)}
                </h3>
                <span className="search-result-date">
                  <Clock size={12} />
                  {formatDate(chat.date)}
                </span>
              </div>
              <p className="search-result-snippet">
                {highlightMatch(chat.snippet, query)}
              </p>
              <div className="search-result-meta">
                <MessageSquare size={12} />
                <span>{chat.messages} messages</span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;
