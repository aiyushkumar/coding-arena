import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach JWT token to requests if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('arena_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to format errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let message = error.response?.data?.message;
    if (!message) {
      if (!error.response || error.response.status === 500) {
        message =
          'Backend server is offline or unreachable on port 5000. Please start the backend server with "node src/server.js" in the backend directory.';
      } else {
        message = error.message || 'Something went wrong';
      }
    }
    return Promise.reject(new Error(message));
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

export const assessmentAPI = {
  getQuestions: () => api.get('/assessment/questions'),
  submitAssessment: (answers) => api.post('/assessment/submit', { answers }),
  getProfile: () => api.get('/assessment/profile')
};

export const problemAPI = {
  getProblems: (params) => api.get('/problems', { params }),
  getProblemBySlug: (slug) => api.get(`/problems/${slug}`),
  createProblem: (data) => api.post('/problems', data)
};

export const judgeAPI = {
  runCode: (data) => api.post('/judge/run', data),
  submitCode: (data) => api.post('/judge/submit', data),
  getSubmissions: (problemId) => api.get(`/judge/submissions/${problemId}`)
};

export const aiAPI = {
  getHint: (data) => api.post('/ai/hint', data)
};

export const recommendationAPI = {
  getRecommendations: (limit = 6) => api.get('/recommendations', { params: { limit } })
};

export const contestAPI = {
  getContests: () => api.get('/contests'),
  getContestById: (id) => api.get(`/contests/${id}`),
  register: (id) => api.post(`/contests/${id}/register`),
  getLeaderboard: (id) => api.get(`/contests/${id}/leaderboard`)
};

export const leaderboardAPI = {
  getGlobalLeaderboard: (params) => api.get('/leaderboard', { params })
};

export const adminAPI = {
  getDatabaseOverview: () => api.get('/admin/database')
};

export default api;
