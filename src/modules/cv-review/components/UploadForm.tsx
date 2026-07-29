import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText } from "lucide-react";

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
  onFileSelect: (file: File) => void;
  onStartAnalysis: () => void;
}

function UploadForm({
  data,
  file,
  onFileSelect,
  onStartAnalysis,
}: UploadFormProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (f && f.type === "application/pdf") {
        onFileSelect(f);
      }
    },
    [onFileSelect],
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
      if (f && f.type === "application/pdf") {
        onFileSelect(f);
      }
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

      <div
        className={`upload-dropzone${isDragging ? " upload-dropzone--active" : ""}${file ? " upload-dropzone--filled" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="upload-input-hidden"
        />

        {file ? (
          <div className="upload-file-selected">
            <FileText size={24} />
            <span className="upload-file-name">{file.name}</span>
            <span className="upload-file-size">
              {(file.size / 1024 / 1024).toFixed(1)} MB
            </span>
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
