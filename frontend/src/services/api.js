const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// In-memory token storage
let accessToken = null;

const api = {
    // Token management
    setAccessToken: (token) => {
        accessToken = token;
    },

    getAccessToken: () => {
        return accessToken;
    },

    clearAccessToken: () => {
        accessToken = null;
    },

    // Refresh access token using refresh token in cookie
    refresh: async () => {
        try {
            const response = await fetch(`${API_URL}/refresh`, {
                method: 'POST',
                credentials: 'include', // Important: sends cookies
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Token refresh failed');
            }
            api.setAccessToken(data.accessToken);
            return data;
        } catch (error) {
            api.clearAccessToken();
            throw error;
        }
    },

    // Enhanced fetch with auto-retry on 401
    fetchWithAuth: async (url, options = {}) => {
        // Add authorization header if token exists
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (accessToken) {
            headers['Authorization'] = `Bearer ${accessToken}`;
        }

        const response = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
        });

        // If 401 and we haven't already retried, try to refresh
        if (response.status === 401 && !options._retry) {
            try {
                await api.refresh();
                // Retry the original request
                return api.fetchWithAuth(url, { ...options, _retry: true });
            } catch (refreshError) {
                // Refresh failed, redirect to login
                window.location.href = '/login';
                throw refreshError;
            }
        }

        return response;
    },

    login: async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Important: receives cookies
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
            // Store access token in memory
            api.setAccessToken(data.accessToken);
            return data;
        } catch (error) {
            throw error;
        }
    },

    signup: async (username, email, password) => {
        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    logout: async () => {
        try {
            const response = await api.fetchWithAuth(`${API_URL}/logout`, {
                method: 'POST',
            });
            const data = await response.json();
            api.clearAccessToken();
            return data;
        } catch (error) {
            api.clearAccessToken();
            throw error;
        }
    },

    // Protected endpoints
    getCodebases: async () => {
        try {
            const response = await api.fetchWithAuth(`${API_URL}/codebases`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch codebases');
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    getComments: async (codebase) => {
        try {
            const response = await api.fetchWithAuth(`${API_URL}/comments?codebase=${codebase}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch comments');
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    updateComment: async (lineRange, codebase, value) => {
        try {
            const response = await api.fetchWithAuth(`${API_URL}/comments/${lineRange}?codebase=${codebase}`, {
                method: 'PUT',
                body: JSON.stringify({ value }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update comment');
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    // AI Features
    summarize: async (text) => {
        try {
            const response = await api.fetchWithAuth(`${API_URL}/ai/summarize`, {
                method: 'POST',
                body: JSON.stringify({ text }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Summarization failed');
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    translate: async (text, targetLanguage) => {
        try {
            const response = await api.fetchWithAuth(`${API_URL}/ai/translate`, {
                method: 'POST',
                body: JSON.stringify({ text, targetLanguage }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Translation failed');
            }
            return data;
        } catch (error) {
            throw error;
        }
    },

    explain: async (text) => {
        try {
            const response = await api.fetchWithAuth(`${API_URL}/ai/explain`, {
                method: 'POST',
                body: JSON.stringify({ text }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Explanation failed');
            }
            return data;
        } catch (error) {
            throw error;
        }
    }
};

export default api;
