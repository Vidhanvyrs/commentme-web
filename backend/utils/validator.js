const validator = {}

validator.validateSignup = (username, email, password) => {
    if (!username || !email || !password) {
        throw new Error("Username and password are required")
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email format")
    }
    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long")
    }
}

validator.validateLogin = (username, password) => {
    if (!username || !password) {
        throw new Error("Username and password are required")
    }
}

export default validator
