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
  suggestions: {
    icon: "check" | "warning" | "error";
    title: string;
    description: string;
  }[];
}

export const LOADING_STAGES = [
  "Membaca struktur CV...",
  "Mengecek kelengkapan bagian...",
  "Mengevaluasi konten dan format...",
];

export async function analyzeCv(): Promise<ReviewResult> {
  await new Promise((resolve) => setTimeout(resolve, 4000));

  return {
    score: 72,
    summary:
      "CV Anda cukup baik, namun ada beberapa area yang perlu ditingkatkan agar lebih optimal.",
    strengths: [
      "Pengalaman kerja ditulis dengan jelas dan terstruktur",
      "Bagian pendidikan lengkap dengan IPK",
      "Skill teknis relevan dengan posisi yang dilamar",
    ],
    weaknesses: [
      "Ringkasan profil tidak ada",
      "Beberapa kalimat menggunakan tenses tidak konsisten",
      "Tata letak menggunakan tabel yang bisa mengganggu ATS",
    ],
    completeness: {
      contact: true,
      profile: false,
      experience: true,
      education: true,
      skills: true,
    },
    grammar: {
      issues: 4,
      details: [
        "Penggunaan tenses tidak konsisten",
        "Terdapat typo pada beberapa kata",
        "Kalimat tidak lengkap di bagian pengalaman",
        "Spasi ganda di beberapa tempat",
      ],
    },
    format: {
      score: 65,
      details: [
        "Panjang CV 2 halaman — masih dalam batas wajar",
        "Font tidak konsisten (campuran sans-serif dan serif)",
        "Tabel digunakan untuk layout yang bisa bermasalah",
      ],
    },
    ats: {
      status: "needs_improvement",
      issues: [
        "Menggunakan tabel untuk layout kolom",
        "Kontak berada di header tabel yang sulit terbaca",
      ],
    },
    quickStats: {
      pages: 2,
      words: 580,
      lastUpdated: "15 Juni 2026",
    },
    suggestions: [
      {
        icon: "error",
        title: "Tambahkan ringkasan profil",
        description:
          "Buat 2-3 kalimat di bagian atas yang merangkum siapa Anda dan apa yang bisa Anda tawarkan.",
      },
      {
        icon: "warning",
        title: "Perbaiki konsistensi tenses",
        description:
          "Gunakan past tense untuk pengalaman lama dan present tense untuk pekerjaan saat ini.",
      },
      {
        icon: "warning",
        title: "Hindari tabel untuk layout",
        description:
          "Ganti tabel dengan layout berbasis section agar terbaca sistem ATS.",
      },
      {
        icon: "warning",
        title: "Konsistenkan jenis font",
        description:
          "Gunakan satu jenis font (seperti Calibri atau Arial) di seluruh dokumen.",
      },
      {
        icon: "check",
        title: "Kontak sudah lengkap",
        description:
          "Nomor telepon, email, dan LinkedIn sudah tercantum dengan baik.",
      },
      {
        icon: "check",
        title: "Pengalaman kerja terstruktur rapi",
        description:
          "Gunakan format yang sama untuk setiap entri pengalaman kerja.",
      },
    ],
  };
}
