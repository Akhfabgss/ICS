import {
  Truck,
  Search,
  ShieldCheck,
  QrCode,
  CreditCard,
  Package,
  Car,
  Coins,
  Sparkles,
  BookOpen,
  PackageCheck,
  Gamepad2,
  Boxes,
  type LucideIcon,
} from 'lucide-react';

// ============================================================================
// 1. ALUR KERJA GRADING (Halaman: main/page.tsx)
// [NOTES SUPABASE]: Belum ada tabel khusus di Supabase (Konten statis UI Company Profile)
// ============================================================================
export interface WorkflowStep {
  num: string;
  title: string;
  desc: string;
  icon: LucideIcon;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    num: '1',
    title: 'Submit & Record',
    desc: 'Kirim atau serahkan kartu dan barang koleksi favoritmu secara online atau melalui Drop Point resmi ICS di Bogor atau Jakarta.',
    icon: Truck,
  },
  {
    num: '2',
    title: 'Microscopic Inspection',
    desc: 'Pemeriksaan fisik 4 parameter (Centering, Corners, Edges, Surface) menggunakan mikroskop optik presisi tinggi.',
    icon: Search,
  },
  {
    num: '3',
    title: 'Sonic Encapsulation',
    desc: 'Enkapsulasi kartu ke dalam slab akrilik custom berteknologi Sonic-Welded yang kedap udara, dilindungi label hologram & NFC.',
    icon: ShieldCheck,
  },
  {
    num: '4',
    title: 'Digital Passport Live',
    desc: 'Sertifikat digital terbit permanen di database ICS. Bebas verifikasi via QR Code & Tap NFC kapan saja.',
    icon: QrCode,
  },
];

// ============================================================================
// 2. KATEGORI LAYANAN UTAMA (Halaman: main/page.tsx)
// [NOTES SUPABASE]:
// - `tcg_type` disamakan dengan kolom `tcg_type` di tabel `public.card_registry`
// - `status`, `badge_text`, `features`, `cta_label`, `cta_href` adalah tambahan lokal
// ============================================================================
export interface ServiceCategoryShowcase {
  id: string;
  tcg_type: string; 
  title: string;
  description: string;
  status: 'active' | 'coming_soon' | 'planned'; // Tambahan lokal
  badge_text: string; // Tambahan lokal
  is_featured: boolean; // Tambahan lokal 
  icon: LucideIcon;
  feature_heading: string; // Tambahan lokal
  features: string[]; // Tambahan lokal
  cta_label: string; // Tambahan lokal
  cta_href?: string; // Tambahan lokal
}

export const SERVICE_CATEGORIES_SHOWCASE: ServiceCategoryShowcase[] = [
  {
    id: 'tcg',
    tcg_type: 'TCG',
    title: 'TCG & Trading Cards',
    description: 'Pokémon TCG, One Piece Card Game, Yu-Gi-Oh!, Magic: The Gathering, Union Arena, and Sports Cards.',
    status: 'active',
    badge_text: 'ACTIVE / PRIORITY',
    is_featured: true,
    icon: CreditCard,
    feature_heading: 'Fitur Tersedia Lengkap:',
    features: [
      'Full Micro-Optics Grading & Sub-grades',
      'Sonic-Welded Acrylic Slabs & Dual NFC',
      'Integrasi Set Registry & Leaderboard Nasional',
    ],
    cta_label: 'Kirim Kartu Sekarang',
    cta_href: '/pricing',
  },
  {
    id: 'action-figure',
    tcg_type: 'ACTION_FIGURE',
    title: 'Action Figure',
    description: 'Hot Toys, Bearbrick 1000%/400%, Funko Pop! Grails, Designer Toys, Sofubi, dan Figurine Eksklusif.',
    status: 'coming_soon',
    badge_text: 'COMING SOON — Q3 2026',
    is_featured: false,
    icon: Package,
    feature_heading: 'Spesifikasi Layanan:',
    features: [
      'Verifikasi Box, Seal Keaslian & Cetakan Cat',
      'Case Akrilik Custom UV-Proof dengan Lock Hologram',
      'Sertifikasi Serial Number Produsen Resmi',
    ],
    cta_label: 'Ingatkan Saat Rilis',
  },
    {
    id: 'comic',
    tcg_type: 'COMICS',
    title: 'Comics & Manga Grading',
    description: 'Komik Vintage Marvel & DC Key Issues, Manga Jepang Cetakan Pertama (1st Print), Edisi Variant Cover, & Tanda Tangan Kreator.',
    status: 'planned',
    badge_text: 'PLANNED EXPANSION',
    is_featured: false,
    icon: BookOpen, 
    feature_heading: 'Spesifikasi Layanan:',
    features: [
      'Paper Quality, Spine Roll & Cover Gloss Grading',
      'Otentikasi Tanda Tangan Kreator & Witnessed COA',
      'Archival Acid-Free Encapsulation UV-Proof',
    ],
    cta_label: 'Dalam Pengembangan',
  },
];

// ============================================================================
// 3. KATEGORI TAB & PAKET HARGA (Halaman: main/pricing/page.tsx)
// [NOTES SUPABASE]:
// - Belum ada tabel `pricing_tiers` di Supabase (sepenuhnya tambahan lokal)
// - Jika nanti tabel `submissions` punya kolom `service_tier` / `price`, gunakan `slug` & `price` ini
// ============================================================================
export interface PricingCategoryTab {
  id: string;
  tcg_type: string; // Selaras dengan `tcg_type` di `card_registry`
  label: string;
  icon: LucideIcon;
  active: boolean;
}

export const PRICING_CATEGORIES: PricingCategoryTab[] = [
  { id: 'tcg', tcg_type: 'TCG', label: 'Card / TCG', icon: CreditCard, active: true },
  { id: 'figure', tcg_type: 'ACTION_FIGURE', label: 'Action Figure', icon: Package, active: false },
  { id: 'comics', tcg_type: 'COMICS', label: 'Comic', icon: BookOpen, active: false },
  { id: 'photocard', tcg_type: 'PHOTOCARD', label: 'Photocard', icon: Sparkles, active: false },
  { id: 'retro-games', tcg_type: 'RETRO_GAMES', label: 'Retro Video Games', icon: Gamepad2, active: false },
  { id: 'lego', tcg_type: 'LEGO', label: 'LEGO Minifigures', icon: Boxes, active: false },
  { id: 'coins', tcg_type: 'COINS', label: 'Coins & Banknotes', icon: Coins, active: false },
];

export interface PricingTier {
  id: string;
  slug: string;
  name: string;
  badge: string;
  badge_style: 'amber' | 'red' | 'blue'; // Tambahan lokal untuk warna badge
  sla_code: string;
  sla_note: string;
  description: string;
  price: number;
  price_formatted: string;
  unit: string;
  is_featured: boolean; // Tambahan lokal
  featured_label?: string;
  features: string[];
  cta_label: string;
  cta_href: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'tier-founders',
    slug: 'founders',
    name: "ICS Founder's Batch",
    badge: 'KUOTA TERBATAS',
    badge_style: 'amber',
    sla_code: 'BATCH 01',
    sla_note: 'SLA Pengerjaan Perkenalan',
    description: 'Cocok untuk 20–30 kartu pertama. Membantu menguji proses operasional dan membangun portofolio awal.',
    price: 150000,
    price_formatted: 'Rp 150.000',
    unit: '/ kartu',
    is_featured: false,
    features: [
      'Grading & Inspeksi 4 Parameter (Centering, Corners, Edges, Surface)',
      'Slab Akrilik Pelindung + Label Unik ICS',
      'Nomor Sertifikat & QR Code Verification',
      'Pencatatan Permanen di Database Digital ICS',
    ],
    cta_label: "Pesan Tier Founder's",
    cta_href: '/order/founders',
  },
  {
    id: 'tier-standard',
    slug: 'standard',
    name: 'ICS Standard',
    badge: 'LAYANAN STANDAR',
    badge_style: 'red',
    sla_code: '14–21 HARI',
    sla_note: 'Standard Turnaround (14–21 Hari Kerja)',
    description: 'Layanan grading standar yang disarankan dengan proses operasional yang stabil, presisi, dan konsisten.',
    price: 199000,
    price_formatted: 'Rp 199.000',
    unit: '/ kartu',
    is_featured: true,
    featured_label: 'RECOMMENDED / UTAMA',
    features: [
      "Semua fitur yang ada di Founder's Batch",
      'Stiker Segel Hologram Keamanan (Anti-Tamper)',
      'Tag Dual NFC & QR Code Verification',
      'Foto Dokumentasi HD Forensik di Database ICS',
    ],
    cta_label: 'Pesan Paket Standard',
    cta_href: '/order/standard',
  },
  {
    id: 'tier-priority',
    slug: 'priority',
    name: 'ICS Priority',
    badge: 'EXPRESS SLA',
    badge_style: 'blue',
    sla_code: '3–7 HARI',
    sla_note: 'Priority Turnaround (3–7 Hari Kerja)',
    description: 'Layanan prioritas bagi kamu yang membutuhkan proses pengerjaan dan penyelesaian lebih cepat.',
    price: 249000,
    price_formatted: 'Rp 249.000',
    unit: '/ kartu',
    is_featured: false,
    features: [
      'Semua fitur lengkap di paket Standard',
      'Antrean Pengerjaan Prioritas (SLA Tercepat)',
      'Penanganan Khusus Aset Koleksi Bernilai Tinggi',
      'Notifikasi Pembaruan Status Real-Time via WA/Email',
    ],
    cta_label: 'Pesan Paket Priority',
    cta_href: '/order/priority',
  },
];

export interface PricingFaq {
  q: string;
  a: string;
}

export const PRICING_FAQS: PricingFaq[] = [
  {
    q: "Apa perbedaan mendasar Founder's Batch vs Standard?",
    a: "Founder's Batch adalah paket perkenalan berkuota terbatas (20–30 kartu awal) dengan harga promo Rp150.000 untuk membangun portofolio awal. Layanan Standard (Rp199.000) adalah tarif operasional reguler dengan jaminan pengerjaan yang stabil.",
  },
  {
    q: 'Berapa lama estimasi pengerjaan untuk masing-masing tier?',
    a: 'SLA Standard membutuhkan waktu 14–21 hari kerja. Untuk tier Priority (Rp249.000), estimasi pengerjaan dipercepat menjadi 3–7 hari kerja.',
  },
  {
    q: 'Kapan kategori Action Figure dan lainnya dibuka?',
    a: 'Kategori Action Figure dijadwalkan masuk tahap beta pada Q3 2026. Anda dapat mendaftarkan email di halaman Services untuk notifikasi awal.',
  },
  {
    q: 'Apakah ada jaminan kartu saya mendapatkan grade 10?',
    a: 'Tidak. ICS melakukan penilaan secara independen dan objektif berdasarkan kriteria fisik asli tanpa dipengaruhi oleh permintaan pelanggan atau harga pasar kartu.',
  },
];

// ============================================================================
// 4. STANDAR SKALA GRADING 1–10 (Halaman: main/grading-standar/page.tsx)
// [NOTES SUPABASE]:
// - `final_grade` & `grade_label` disamakan dengan kolom di `public.card_registry`
// - `score_display`, `badge_bg`, `subtitle`, `description`, `tag`, `psa`, `bgs`, `cgc`, `category_group` adalah tambahan lokal
// ============================================================================
export interface GradingScaleItem {
  final_grade: number; // Selaras dengan kolom `final_grade` di `card_registry`
  score_display: string; // Tambahan lokal (untuk rentang seperti '8.0 - 8.5')
  grade_label: string; // Selaras dengan kolom `grade_label` di `card_registry`
  badge_bg: string; // Tambahan lokal
  title: string; // Tambahan lokal
  subtitle: string; // Tambahan lokal
  description: string; // Tambahan lokal
  tag: string; // Tambahan lokal
  psa: string; // Tambahan lokal (komparasi eksternal)
  bgs: string; // Tambahan lokal (komparasi eksternal)
  cgc: string; // Tambahan lokal (komparasi eksternal)
  category_group: 'high' | 'mid' | 'low'; // Tambahan lokal untuk filter tab
}

export const GRADING_SCALE_LIST: GradingScaleItem[] = [
  {
    final_grade: 10.0,
    score_display: '10',
    grade_label: 'PERFECT',
    badge_bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    title: 'Gem Mint / Perfect',
    subtitle: 'Pristine Condition',
    description: 'Kartu dalam kondisi sempurna tanpa cacat fisik apa pun. Centering sangat presisi (50/50 hingga 55/45), 4 sudut tajam sempurna di bawah 30x optik zoom, tepi bersih bebas whiteline/chipping, dan permukaan mengkilap tanpa noda pabrik.',
    tag: 'Grade Sempurna Kolektor • Investasi Tertinggi',
    psa: 'PSA 10',
    bgs: 'BGS 9.5 - 10',
    cgc: 'CGC 10',
    category_group: 'high',
  },
  {
    final_grade: 9.5,
    score_display: '9.5',
    grade_label: 'MINT+',
    badge_bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    title: 'Mint+',
    subtitle: 'Near Perfect',
    description: 'Kondisi kartu hampir tanpa cela. Hanya memiliki 1 cacat mikroskopis terisolasi (misal centering sedikit bergeser 60/40 atau garis halus cetakan pabrik/print-line yang sangat samar hanya terlihat di bawah sinar UV).',
    tag: 'Top Registry Grade Tier',
    psa: 'PSA 9.5',
    bgs: 'BGS 9.5',
    cgc: 'CGC 9.5',
    category_group: 'high',
  },
  {
    final_grade: 9.0,
    score_display: '9.0',
    grade_label: 'MINT',
    badge_bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    title: 'Mint',
    subtitle: 'Superb High-Grade',
    description: 'Kartu dalam kondisi sangat prima. Memiliki 1 cacat minor yang sangat tipis (seperti spek putih mikro di salah satu sudut), namun secara kasat mata tetap terlihat sempurna dan mempertahankan kilau foil asli.',
    tag: 'High Premium Investment Grade',
    psa: 'PSA 9',
    bgs: 'BGS 9.0',
    cgc: 'CGC 9.0',
    category_group: 'high',
  },
  {
    final_grade: 8.5,
    score_display: '8.0 - 8.5',
    grade_label: 'NM-MT',
    badge_bg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30',
    title: 'Near Mint / Mint (NM-MT)',
    subtitle: 'Excellent High-Grade',
    description: 'Kartu tampak sangat bersih. Di bawah pemeriksaan mikroskopik, terlihat 1-2 cacat ringan seperti whiteline tipis di tepi (edges) atau flek halus pada permukaan lapisan foil pelindung.',
    tag: 'Koleksi Terawat Prima',
    psa: 'PSA 8 - 8.5',
    bgs: 'BGS 8 - 8.5',
    cgc: 'CGC 8 - 8.5',
    category_group: 'high',
  },
  {
    final_grade: 7.0,
    score_display: '7.0',
    grade_label: 'NM',
    badge_bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    title: 'Near Mint (NM)',
    subtitle: 'High-Grade Condition',
    description: 'Kartu menunjukkan tanda penanganan fisik sangat minim. Terlihat whiteline ringan di sudut/tepi atau bekas gesekan halus, tanpa ada lipatan (crease) atau kerusakan struktur inti kertas.',
    tag: 'Standar Pasar Binder Klasik',
    psa: 'PSA 7',
    bgs: 'BGS 7.0',
    cgc: 'CGC 7.0',
    category_group: 'mid',
  },
  {
    final_grade: 6.0,
    score_display: '5.0 - 6.5',
    grade_label: 'EX / EX-MT',
    badge_bg: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30',
    title: 'Excellent (EX) / Excellent-Mint (EX-MT)',
    subtitle: 'Mid-Grade / Lightly Played',
    description: 'Terdapat bekas pemakaian fisik yang jelas terlihat, seperti sudut yang mulai tumpul, pengelupasan warna tipis di tepi, atau goresan halus di permukaan tanpa mengurangi nilai historis kartu.',
    tag: 'Kondisi Kartu Koleksi Vintage',
    psa: 'PSA 5 - 6',
    bgs: 'BGS 5.0 - 6.5',
    cgc: 'CGC 5.0 - 6.5',
    category_group: 'mid',
  },
  {
    final_grade: 4.0,
    score_display: '3.0 - 4.5',
    grade_label: 'VG / GOOD',
    badge_bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/30',
    title: 'Very Good (VG) / Good (G)',
    subtitle: 'Played Condition',
    description: 'Kartu menunjukkan bekas penanganan nyata. Terdapat tumpul sudut, fading warna, atau cetakan lipatan halus (minor crease) yang tidak merusak keutuhan struktur lembaran kartu.',
    tag: 'Otentisitas & Preservasi Slab',
    psa: 'PSA 3 - 4',
    bgs: 'BGS 3.0 - 4.5',
    cgc: 'CGC 3.0 - 4.5',
    category_group: 'low',
  },
  {
    final_grade: 2.0,
    score_display: '1.0 - 2.5',
    grade_label: 'POOR / FAIR',
    badge_bg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    title: 'Poor / Fair',
    subtitle: 'Heavily Damaged',
    description: 'Kartu mengalami kerusakan fisik signifikan seperti lipatan parah (heavy crease), noda, atau pengelupasan kertas. Keaslian kartu tetap terverifikasi secara forensik dan terlindungi permanen dalam cangkang akrilik.',
    tag: 'Autentikasi Terjamin & Terkunci',
    psa: 'PSA 1 - 2',
    bgs: 'BGS 1.0 - 2.5',
    cgc: 'CGC 1.0 - 2.5',
    category_group: 'low',
  },
];

// ============================================================================
// 5. ROADMAP EKSPANSI LAYANAN (Halaman: main/services/page.tsx)
// [NOTES SUPABASE]: Belum ada tabel roadmap di Supabase (Sepenuhnya tambahan lokal)
// ============================================================================
export interface UpcomingCategoryItem {
  id: string;
  tcg_type: string; // Selaras dengan format kode `tcg_type` di `card_registry`
  title: string;
  status: string;
  status_color: string;
  icon: LucideIcon;
  description: string;
  target: string;
}

export const UPCOMING_CATEGORIES: UpcomingCategoryItem[] = [
  {
    id: 'action-figure',
    tcg_type: 'ACTION_FIGURE',
    title: 'Action Figure',
    status: 'IN DEVELOPMENT',
    status_color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    icon: PackageCheck,
    description: 'Pemeriksaan moulding orisinal pabrikan, ketegangan persendian joints, kelengkapan blister, dan sertifikasi stamping.',
    target: 'Target: Q3 2026',
  },
  {
    id: 'comic-manga',
    tcg_type: 'COMICS',
    title: 'Comic & Manga',
    status: 'COMING SOON',
    status_color: 'bg-elevated-putih text-muted-hitam border-line-putih',
    icon: BookOpen,
    description: 'Kelenturan kertas, retensi gloss cover, deteksi spine roll, karat staples vintage, dan enkapsulasi archival acid-free.',
    target: 'Target: Q4 2026',
  },
{
    id: 'photocard',
    tcg_type: 'PHOTOCARD',
    title: 'Photocard (K-Pop & Idol)',
    status: 'COMING SOON',
    status_color: 'bg-elevated-putih text-muted-hitam border-line-putih',
    icon: Sparkles,
    description: 'Penilaian kartu idola resmi agensi vs fanmade, analisis album press mark, dan proteksi micro-slab ultrasonik compact.',
    target: 'Target: Q3 2026',
  },
  {
    id: 'retro-games',
    tcg_type: 'RETRO_GAMES',
    title: 'Retro Video Games',
    status: 'COMING SOON',
    status_color: 'bg-elevated-putih text-muted-hitam border-line-putih',
    icon: Gamepad2,
    description: 'Kondisi cartridge/disc optik, keaslian segel pabrik (H-seam seal & vent holes), serta casing display akrilik presisi.',
    target: 'Target: Q4 2026',
  },
  {
    id: 'lego',
    tcg_type: 'LEGO',
    title: 'LEGO Minifigures',
    status: 'COMING SOON',
    status_color: 'bg-elevated-putih text-muted-hitam border-line-putih',
    icon: Boxes,
    description: 'Keaslian part ber-logo resmi, keutuhan print torso mikro, kelenturan joints, dan verifikasi segel tape kardus.',
    target: 'Target: Q4 2026',
  },
  {
    id: 'coins-banknotes',
    tcg_type: 'COINS',
    title: 'Coins & Banknotes',
    status: 'COMING SOON',
    status_color: 'bg-elevated-putih text-muted-hitam border-line-putih',
    icon: Coins,
    description: 'Identifikasi varian cetak koin kuno & uang kertas, uji kilau lustre kertas, serta spektrometri non-destruktif paduan logam.',
    target: 'Target: 2027',
  },
];