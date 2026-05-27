/**
 * Backend endpoints (default paths based on your provided spec).
 * If your backend uses different paths, update them here only.
 */
export const ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    // Some backends use /me, some /getMe. We’ll try both.
    meCandidates: ['/api/auth/me', '/api/auth/getMe']
  },
  posts: '/api/posts',
  solutions: '/api/solutions',
  brands: '/api/brands',
  leads: '/api/leads',
  downloads: '/api/downloads',
  users: '/api/users',
  media: '/api/media'
};

