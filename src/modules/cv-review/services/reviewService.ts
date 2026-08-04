import { request } from "../../../api/client";
import { getToken } from "../../login/services/loginService";

export interface SuggestionItem {
  icon: "check" | "warning" | "error";
  title: string;
  description: string;
  category?: "ats" | "grammar" | "format" | "content";
  priority?: "high" | "medium" | "low";
  beforeAfter?: {
    before: string;
    after: string;
  };
}

export interface ReviewResult {
  score: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  completeness: {
    contact: boolean;
    profile: boolean;
    experience: boolean;
    education: boolean;
    skills: boolean;
  };
  grammar: {
    issues: number;
    details: string[];
  };
  format: {
    score: number;
    details: string[];
  };
  ats: {
    status: "good" | "needs_improvement";
    issues: string[];
  };
  quickStats: {
    pages: number;
    words: number;
    lastUpdated: string;
  };
  suggestions: SuggestionItem[];
}

export const LOADING_STAGES = [
  "Membaca struktur CV...",
  "Memindai elemen ATS & kelengkapan...",
  "Mengevaluasi tata bahasa & kuantifikasi hasil...",
];

export class CvReviewError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface BackendAuditSummary {
  score: number;
  tier_label: string;
  grade_label: string;
  summary_text: string;
  key_strengths: string[];
  key_improvements: string[];
}

interface BackendMetrics {
  format_score: number;
  ats_status: string;
}

interface BackendGrammarIssue {
  text: string;
  suggestion: string;
  location: string;
}

interface BackendRecommendation {
  id: number;
  priority: string;
  category: string;
  section: string;
  title: string;
  description: string;
  before_text?: string;
  after_text?: string;
  has_example: boolean;
}

interface BackendStrengthDetail {
  id: number;
  category: string;
  title: string;
  description: string;
}

interface BackendNormalizedOutput {
  audit_summary: BackendAuditSummary;
  metrics: BackendMetrics;
  grammar_issues: BackendGrammarIssue[];
  recommendations: BackendRecommendation[];
  strengths_detail: BackendStrengthDetail[];
}

const categoryMap: Record<string, SuggestionItem["category"]> = {
  content: "content",
  ats_format: "ats",
  structure: "format",
  keywords: "content",
};

function mapSuggestions(recs: BackendRecommendation[]): SuggestionItem[] {
  return recs.map((r) => ({
    icon: r.priority === "Urgent" ? "error" : "warning",
    title: r.title,
    description: r.description,
    category: categoryMap[r.category] ?? "content",
    priority: r.priority === "Urgent" ? "high" : "medium",
    beforeAfter:
      r.has_example && (r.before_text || r.after_text)
        ? { before: r.before_text || "", after: r.after_text || "" }
        : undefined,
  }));
}

function mapToReviewResult(
  data: BackendNormalizedOutput,
  wordCount: number,
  pageCount: number,
): ReviewResult {
  const formatDetails = data.strengths_detail
    .filter((s) => s.category === "ats_format" || s.category === "structure")
    .map((s) => `${s.title}: ${s.description}`);
  const atsIssues = data.strengths_detail
    .filter((s) => s.category === "ats_format")
    .map((s) => `${s.title}: ${s.description}`);

  return {
    score: data.audit_summary.score,
    summary: data.audit_summary.summary_text,
    strengths: data.audit_summary.key_strengths,
    weaknesses: data.audit_summary.key_improvements,
    completeness: {
      contact: true,
      profile: true,
      experience: true,
      education: true,
      skills: true,
    },
    grammar: {
      issues: data.grammar_issues.length,
      details: data.grammar_issues.map(
        (g) => `${g.location}: ${g.suggestion || g.text}`,
      ),
    },
    format: {
      score: data.metrics.format_score,
      details: formatDetails,
    },
    ats: {
      status: data.metrics.ats_status === "good" ? "good" : "needs_improvement",
      issues: atsIssues,
    },
    quickStats: {
      pages: pageCount,
      words: wordCount,
      lastUpdated: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
    suggestions: mapSuggestions(data.recommendations),
  };
}

export async function reviewCv(
  cvText: string,
  wordCount: number,
  pageCount: number,
): Promise<ReviewResult> {
  const res = await request("/nexxa/cv-review", {
    method: "POST",
    token: getToken(),
    body: { cv_text: cvText, word_count: wordCount, page_count: pageCount },
  });

  if (!res.ok) {
    throw new CvReviewError(
      res.status,
      res.error || "Gagal melakukan analisis CV.",
    );
  }

  return mapToReviewResult(res.data as BackendNormalizedOutput, wordCount, pageCount);
}
