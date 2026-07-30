export interface CompanyMatch {
  company: string;
  match: number;
  reason: string;
  tags: string[];
}

export interface CvAnalysisResult {
  name: string;
  skills: string[];
  recommendations: CompanyMatch[];
}

export interface TeacherApproval {
  id: string;
  name: string;
  role: string;
  status: "pending" | "approved" | "rejected";
  updatedAt: string;
}

export interface Notification {
  id: number;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
}

const mockAnalysisResult: CvAnalysisResult = {
  name: "Ahmad Fatanala",
  skills: [
    "React",
    "TypeScript",
    "UI/UX Design",
    "Git",
    "Tailwind CSS",
    "Node.js",
  ],
  recommendations: [
    {
      company: "PT Teknologi Maju",
      match: 92,
      reason:
        "Profil frontend developer Anda sangat sesuai dengan kebutuhan tech stack React & TypeScript di PT Teknologi Maju",
      tags: ["Frontend", "React", "TypeScript"],
    },
    {
      company: "PT Startup Digital",
      match: 85,
      reason:
        "Kemampuan UI/UX Design Anda cocok untuk posisi product development di perusahaan startup digital",
      tags: ["UI/UX", "Design", "Startup"],
    },
    {
      company: "PT Kreatif Solusi",
      match: 78,
      reason:
        "Pengalaman dengan Tailwind CSS dan Node.js mendukung kebutuhan full-stack developer di perusahaan ini",
      tags: ["Fullstack", "Node.js", "Tailwind"],
    },
  ],
};

const mockApprovals: TeacherApproval[] = [
  {
    id: "wali",
    name: "Wali Kelas",
    role: "Wali Kelas",
    status: "approved",
    updatedAt: "2 jam lalu",
  },
  {
    id: "kesiswaan",
    name: "Kesiswaan",
    role: "Kesiswaan",
    status: "pending",
    updatedAt: "—",
  },
  {
    id: "gurubk",
    name: "Guru BK",
    role: "Guru BK",
    status: "approved",
    updatedAt: "30 menit lalu",
  },
  {
    id: "kaprodi",
    name: "Kaprodi",
    role: "Ketua Program Keahlian",
    status: "pending",
    updatedAt: "—",
  },
];

const mockNotifications: Notification[] = [
  {
    id: 1,
    message: "Surat PKL berhasil dibuat dan dikirim ke Wali Kelas untuk direview",
    time: "Baru saja",
    type: "info",
  },
  {
    id: 2,
    message: "Wali Kelas telah menyetujui surat PKL Anda",
    time: "2 jam lalu",
    type: "success",
  },
  {
    id: 3,
    message: "Surat PKL diteruskan ke Guru BK untuk verifikasi lanjutan",
    time: "2 jam lalu",
    type: "info",
  },
  {
    id: 4,
    message: "Guru BK telah menyetujui surat PKL Anda",
    time: "30 menit lalu",
    type: "success",
  },
  {
    id: 5,
    message: "Menunggu persetujuan dari Kesiswaan dan Kaprodi",
    time: "30 menit lalu",
    type: "warning",
  },
];

export const LOADING_STAGES = [
  "Membaca dan mengekstrak data CV...",
  "Menganalisis skill & kompetensi...",
  "Mencocokkan dengan database perusahaan mitra...",
  "Menyusun rekomendasi terbaik...",
];

export function analyzeCvMatch(): Promise<CvAnalysisResult> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAnalysisResult), 3600);
  });
}

export function getApprovalProgress(): Promise<TeacherApproval[]> {
  return Promise.resolve(mockApprovals);
}

export function getNotifications(): Promise<Notification[]> {
  return Promise.resolve(mockNotifications);
}
