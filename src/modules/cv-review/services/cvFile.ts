import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import mammoth from "mammoth/mammoth.browser";

GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

export interface ExtractedCv {
  text: string;
  wordCount: number;
}

export function extractCvFile(file: File): Promise<ExtractedCv> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".pdf")) {
    return extractPdf(file);
  }
  if (name.endsWith(".docx")) {
    return extractDocx(file);
  }
  if (name.endsWith(".txt") || name.endsWith(".md") || name.endsWith(".markdown")) {
    return extractText(file);
  }
  return Promise.reject(new Error("Format file tidak didukung — gunakan PDF, DOCX, TXT, atau MD."));
}

function countWords(s: string): number {
  const words = s.trim().split(/\s+/);
  return words.length > 0 && words[0] !== "" ? words.length : 0;
}

async function extractText(file: File): Promise<ExtractedCv> {
  const text = (await file.text()).trim();
  if (!text) {
    return Promise.reject(new Error("File kosong."));
  }
  return { text, wordCount: countWords(text) };
}

async function extractPdf(file: File): Promise<ExtractedCv> {
  const data = await file.arrayBuffer();
  const loadingTask = getDocument({ data });
  const pdf = await loadingTask.promise;
  try {
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");
      text += pageText + "\n";
    }
    const trimmed = text.trim();
    if (!trimmed) {
      return Promise.reject(new Error("Tidak ada teks yang dapat diekstrak dari PDF — scan gambar belum didukung."));
    }
    return { text: trimmed, wordCount: countWords(trimmed) };
  } finally {
    await loadingTask.destroy();
  }
}

async function extractDocx(file: File): Promise<ExtractedCv> {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  const trimmed = result.value.trim();
  if (!trimmed) {
    return Promise.reject(new Error("Tidak ada teks yang ditemukan di DOCX."));
  }
  return { text: trimmed, wordCount: countWords(trimmed) };
}
