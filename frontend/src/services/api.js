const API_URL = 'http://localhost:8080'; // Adjust if your backend runs on a different port

const api = {
    login: async (username, password) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }
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
    }
};

export default api;
