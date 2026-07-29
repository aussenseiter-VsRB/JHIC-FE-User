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

export async function analyzeCv(): Promise<ReviewResult> {
  await new Promise((resolve) => setTimeout(resolve, 3600));

  return {
    score: 76,
    summary:
      "CV Anda memiliki pondasi pengalaman yang kuat, namun membutuhkan optimalisasi pada ringkasan profil, struktur ATS, dan kuantifikasi pencapaian.",
    strengths: [
      "Pengalaman kerja kronologis tersusun dengan urutan rapi",
      "Informasi kontak dasar (Email & LinkedIn) lengkap",
      "Pendidikan dan riwayat akademis tercantum jelas",
    ],
    weaknesses: [
      "Belum memiliki ringkasan profil (Professional Summary)",
      "Penggunaan tabel pada tata letak menyulitkan parser ATS",
      "Poin tugas kurang mengkuantifikasi hasil dengan angka/metrik",
    ],
    completeness: {
      contact: true,
      profile: false,
      experience: true,
      education: true,
      skills: true,
    },
    grammar: {
      issues: 3,
      details: [
        "Penggunaan kata kerja kurang berorientasi aksi (Action Verbs)",
        "Terdapat typo minor pada deskripsi posisi kedua",
        "Penggunaan bahasa Indonesia & Inggris tercampur dalam satu section",
      ],
    },
    format: {
      score: 70,
      details: [
        "Panjang CV 2 halaman — efisien dan ideal",
        "Penggunaan font standar dapat dibaca dengan mudah",
        "Menggunakan elemen tabel yang berisiko pada sistem ATS",
      ],
    },
    ats: {
      status: "needs_improvement",
      issues: [
        "Layout menggunakan dua kolom berbantu tabel",
        "Header kontak berada dalam elemen grafik/tabel",
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
        title: "Tambahkan Ringkasan Profil Profesional (Executive Summary)",
        description:
          "Tuliskan 2-3 kalimat di bagian atas CV yang merangkum keahlian utama, pengalaman bertahun-tahun, dan nilai tambah Anda.",
        category: "content",
        priority: "high",
        beforeAfter: {
          before: "(Bagian ringkasan profil belum ada)",
          after:
            "Frontend Engineer berpengalaman 3+ tahun dalam membangun web scalable berbasis React & TypeScript. Terbukti meningkatkan performa LCP hingga 40% dan mengelola UI library internal.",
        },
      },
      {
        icon: "warning",
        title: "Kuantifikasi Pencapaian Kerja dengan Metrik / Angka",
        description:
          "Ganti deskripsi tugas pasif menjadi kalimat berorientasi hasil yang menggunakan angka konkret.",
        category: "content",
        priority: "high",
        beforeAfter: {
          before: "Bertanggung jawab membuat tampilan aplikasi dan memperbaiki bug.",
          after:
            "Mengembangkan 15+ komponen UI reusable dengan React & Tailwind, serta menyelesaikan 40+ tiket bug dengan SLA 99.5%.",
        },
      },
      {
        icon: "warning",
        title: "Ubah Layout Berbasis Tabel Menjadi Format Standard Single/Clean Column",
        description:
          "Sistem ATS sering gagal memparsing teks yang berada di dalam tabel kompleks atau multi-kolom.",
        category: "ats",
        priority: "high",
        beforeAfter: {
          before: "Layout dipisah menggunakan <table> 2 kolom.",
          after:
            "Layout menggunakan alur linier vertikal dengan heading standar (Experience, Education, Skills).",
        },
      },
      {
        icon: "warning",
        title: "Gunakan Action Verbs (Kata Kerja Aksi) di Setiap Poin",
        description:
          "Awali setiap poin pengalaman dengan kata kerja aktif seperti 'Merancang', 'Mengoptimalkan', 'Memimpin', atau 'Mengimplementasikan'.",
        category: "grammar",
        priority: "medium",
        beforeAfter: {
          before: "Melakukan integrasi API pembayaran di website.",
          after:
            "Mengintegrasikan 3 payment gateway (Midtrans, Xendit, Stripe) yang memproses 10,000+ transaksi bulanan.",
        },
      },
      {
        icon: "check",
        title: "Kelengkapan Informasi Kontak Sudah Sangat Baik",
        description:
          "Email profesional, nomor WhatsApp, domisili, dan tautan profil LinkedIn sudah terpasang dengan rapi.",
        category: "format",
        priority: "low",
      },
      {
        icon: "check",
        title: "Urutan Riwayat Kerja Terstruktur (Reverse Chronological)",
        description:
          "Posisi terbaru ditampilkan paling atas, mempermudah recruiter membaca perjalanan karir Anda.",
        category: "format",
        priority: "low",
      },
    ],
  };
}
