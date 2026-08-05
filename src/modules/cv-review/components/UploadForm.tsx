import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, AlertCircle, CheckCircle } from "lucide-react";

interface UploadFormProps {
  data: {
    title: string;
    description: string;
    dropzoneText: string;
    browseText: string;
    fileRestriction: string;
    selectButton: string;
    analyzeButton: string;
  };
  file: File | null;
  errorMsg?: string | null;
  onFileSelect: (file: File | null) => void;
  onStartAnalysis: () => void;
}

const MAX_FILE_SIZE_MB = 5;
const ALLOWED_EXTENSIONS = [".pdf", ".docx", ".txt", ".md", ".markdown"];

function UploadForm({
  data,
  file,
  errorMsg,
  onFileSelect,
  onStartAnalysis,
}: UploadFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const displayedError = errorMsg ?? localError;

  const validateAndSetFile = useCallback(
    (f: File) => {
      setLocalError(null);
      const name = f.name.toLowerCase();
      if (!ALLOWED_EXTENSIONS.some((ext) => name.endsWith(ext))) {
        setLocalError("Format file tidak didukung — gunakan PDF, DOCX, TXT, atau MD.");
        return;
      }
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setLocalError(
          `Ukuran file melebihi batas maksimal ${MAX_FILE_SIZE_MB} MB`,
        );
        return;
      }
      onFileSelect(f);
    },
    [onFileSelect],
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f) {
        validateAndSetFile(f);
      }
      // Reset input value to allow selecting same file again if needed
      e.target.value = "";
    },
    [validateAndSetFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const f = e.dataTransfer.files[0];
      if (f) {
        validateAndSetFile(f);
      }
    },
    [validateAndSetFile],
  );

  const handleRemoveFile = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onFileSelect(null);
      setLocalError(null);
    },
    [onFileSelect],
  );

  return (
    <div className="upload-form">
      <div className="upload-form-header">
        <div className="upload-form-icon">
          <FileText size={32} />
        </div>
        <h1 className="upload-form-title">{data.title}</h1>
        <p className="upload-form-desc">{data.description}</p>
      </div>

      <AnimatePresence>
        {displayedError && (
          <motion.div
            className="upload-error-alert"
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
          >
            <AlertCircle size={18} className="upload-error-icon" />
            <span>{displayedError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`upload-dropzone${isDragging ? " upload-dropzone--active" : ""}${file ? " upload-dropzone--filled" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!file ? handleClick : undefined}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt,.md,.markdown,application/pdf"
          onChange={handleFileChange}
          className="upload-input-hidden"
        />

        {file ? (
          <div className="upload-file-selected-card">
            <div className="upload-file-info">
              <div className="upload-file-badge">
                <FileText size={24} />
              </div>
              <div className="upload-file-meta">
                <span className="upload-file-name" title={file.name}>
                  {file.name}
                </span>
                <span className="upload-file-size">
                  {(file.size / 1024 / 1024).toFixed(2)} MB • Dokumen
                </span>
              </div>
            </div>
            <div className="upload-file-status">
              <span className="upload-ready-badge">
                <CheckCircle size={14} /> Siap Dianalisis
              </span>
              <button
                type="button"
                className="upload-remove-btn"
                onClick={handleRemoveFile}
                title="Hapus File"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="upload-dropzone-icon">
              <Upload size={36} />
            </div>
            <p className="upload-dropzone-text">{data.dropzoneText}</p>
            <p className="upload-browse-text">{data.browseText}</p>
            <button
              type="button"
              className="upload-select-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
            >
              {data.selectButton}
            </button>
            <p className="upload-restriction">{data.fileRestriction}</p>
          </>
        )}
      </div>

      <motion.button
        type="button"
        className="upload-analyze-btn"
        disabled={!file}
        whileHover={file ? { scale: 1.02 } : {}}
        whileTap={file ? { scale: 0.98 } : {}}
        onClick={onStartAnalysis}
      >
        {data.analyzeButton}
      </motion.button>
    </div>
  );
}

export default UploadForm;
