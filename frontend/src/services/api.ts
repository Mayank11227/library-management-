import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to append JWT token
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("lms_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for generic error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("lms_token");
      localStorage.removeItem("lms_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth
export const loginAPI = async (data: any) => (await api.post("/api/v1/auth/login", data)).data;
export const logoutAPI = async () => (await api.post("/api/v1/auth/logout")).data;

// Dashboards
export const getAdminDashboard = async () => (await api.get("/api/v1/dashboard/admin")).data;
export const getStudentDashboard = async () => (await api.get("/api/v1/dashboard/student")).data;

// Students
export const getStudents = async (params?: any) => (await api.get("/api/v1/students", { params })).data;
export const getStudent = async (id: string) => (await api.get(`/api/v1/students/${id}`)).data;
export const createStudent = async (data: any) => (await api.post("/api/v1/students", data, { headers: { 'Content-Type': 'multipart/form-data' }})).data;
export const updateStudent = async (id: string, data: any) => (await api.put(`/api/v1/students/${id}`, data)).data;
export const deleteStudent = async (id: string) => (await api.delete(`/api/v1/students/${id}`)).data;

// Seats
export const getSeats = async (params?: any) => (await api.get("/api/v1/seats", { params })).data;
export const allocateSeat = async (id: string, data: any) => (await api.put(`/api/v1/seats/${id}/allocate`, data)).data;
export const releaseSeat = async (id: string) => (await api.put(`/api/v1/seats/${id}/release`)).data;
export const updateSeatStatus = async (id: string, status: string) => (await api.put(`/api/v1/seats/${id}/status`, { status })).data;

// Memberships
export const getMemberships = async (params?: any) => (await api.get("/api/v1/memberships", { params })).data;
export const createMembership = async (data: any) => (await api.post("/api/v1/memberships", data)).data;
export const renewMembership = async (id: string, data: any) => (await api.put(`/api/v1/memberships/${id}/renew`, data)).data;
export const getMembershipPlans = async () => (await api.get("/api/v1/membership-plans")).data;

// Attendance
export const getTodayAttendance = async () => (await api.get("/api/v1/attendance/today")).data;
export const scanAttendance = async (data: any) => (await api.post("/api/v1/attendance/scan", data)).data;
export const getStudentAttendance = async (params?: any) => (await api.get("/api/v1/student/attendance", { params })).data;

// Study Sessions
export const getStudySessionStats = async () => (await api.get("/api/v1/study-sessions/stats")).data;

// Payments
export const getPayments = async (params?: any) => (await api.get("/api/v1/payments", { params })).data;
export const createPayment = async (data: any) => (await api.post("/api/v1/payments", data)).data;

// Enquiries
export const getEnquiries = async (params?: any) => (await api.get("/api/v1/enquiries", { params })).data;
export const createEnquiry = async (data: any) => (await api.post("/api/v1/enquiries", data)).data;
export const updateEnquiryStatus = async (id: string, status: string) => (await api.put(`/api/v1/enquiries/${id}/status`, { status })).data;

// Reports
export const getRevenueReport = async (params?: any) => (await api.get("/api/v1/reports/revenue", { params })).data;
export const getAttendanceReport = async (params?: any) => (await api.get("/api/v1/reports/attendance", { params })).data;

// Settings
export const getSettings = async () => (await api.get("/api/v1/settings")).data;
export const updateSettings = async (data: any) => (await api.put("/api/v1/settings", data)).data;

// Gallery
export const getGalleryImages = async () => (await api.get("/api/v1/gallery")).data;
export const uploadGalleryImage = async (data: FormData) => (await api.post("/api/v1/gallery", data, { headers: { 'Content-Type': 'multipart/form-data' } })).data;
export const deleteGalleryImage = async (id: string) => (await api.delete(`/api/v1/gallery/${id}`)).data;

// Notifications
export const getNotifications = async (params?: any) => (await api.get("/api/v1/notifications", { params })).data;
export const sendNotification = async (data: any) => (await api.post("/api/v1/notifications", data)).data;
export const markNotificationRead = async (id: string) => (await api.put(`/api/v1/notifications/${id}/read`)).data;
