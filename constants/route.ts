/* =======================
   API ROUTES
   ======================= */
export const API_AUTH_LOGIN = "/api/auth/login";
export const API_AUTH_LOGOUT = "/api/auth/logout";
export const API_AUTH_REGISTER = "/api/auth/register";
export const API_STUDENT = "/api/student";
export const API_ADMIN = "/api/admin";

/* =======================
   ADMIN ROUTES
   ======================= */
export const ADMIN_DASHBOARD = "/admin";
export const ADMIN_USERS = "/admin/pengguna";
export const ADMIN_MATERIAL = "/admin/materi";
export const ADMIN_MATERIAL_ADD = "/admin/materi/tambah";
export const ADMIN_QUIZZES = "/admin/soal";
export const ADMIN_QUIZZES_ADD = "/admin/soal/tambah";

/* =======================
   STUDENT ROUTES
   ======================= */
export const STUDENT_DASHBOARD = "/";
export const STUDENT_MATERIAL = "/materi";
export const STUDENT_QUIZZES = "/latihan-soal";
export const STUDENT_PROGRESS = "/progres-belajar";
export const STUDENT_NOTIFICATIONS = "/notifikasi";
export const STUDENT_GAMES = "/permainan";
export const STUDENT_ABOUT_US = "/tentang-kami";

/* =======================
   PUBLIC ROUTES
   ======================= */
export const HOME = "/";
export const LOGIN = "/masuk";
export const REGISTER = "/daftar";

/* =======================
   TOKEN
   ======================= */
export const REFRESH_TOKEN = "refresh_token";
export const SESSION_TOKEN = "session_token";
export const USER_INFO = "user_info";