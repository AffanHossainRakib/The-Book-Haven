// Design System Constants for The Book Haven

export const COLORS = {
  primary: {
    // Indigo blue - professional and elegant
    light: "indigo-400",
    DEFAULT: "indigo-600",
    dark: "indigo-700",
    darker: "indigo-900",
  },
  accent: {
    // Teal - fresh and vibrant
    light: "teal-400",
    DEFAULT: "teal-500",
    dark: "teal-600",
  },
  gradient: {
    primary: "from-indigo-600 to-teal-500",
    hero: "from-indigo-900 via-indigo-700 to-teal-600",
    card: "from-indigo-500/10 via-teal-500/10 to-blue-500/10",
    navbar: "from-white via-indigo-50 to-teal-50",
    darkNavbar: "from-slate-900 via-indigo-950 to-slate-900",
  },
  glassmorphism: {
    bg: "from-white/40 to-white/10",
    border: "border-white/20",
    backdrop: "backdrop-blur-lg",
    darkBg: "from-slate-800/40 to-slate-900/40",
    darkBorder: "border-slate-700/30",
  },
  neutral: {
    light: "slate-50",
    DEFAULT: "slate-100",
    dark: "slate-700",
    darker: "slate-900",
  },
  dark: {
    bg: {
      primary: "slate-900",
      secondary: "slate-800",
      card: "slate-800/50",
    },
    text: {
      primary: "slate-100",
      secondary: "slate-300",
      muted: "slate-400",
    },
    border: "slate-700",
  },
};

export const ANIMATIONS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  cardHover: {
    whileHover: { y: -8, scale: 1.02 },
    transition: { duration: 0.3 },
  },
};

export const ENDPOINTS = {
  books: {
    all: "/all-books",
    latest: "/latest-books",
    topRated: "/top-rated-books",
    single: (id) => `/book/${id}`,
    myBooks: "/my-books",
    create: "/books",
    update: (id) => `/book/${id}`,
    delete: (id) => `/book/${id}`,
  },
  comments: {
    get: (id) => `/book/${id}/comments`,
    create: (id) => `/book/${id}/comments`,
  },
};
