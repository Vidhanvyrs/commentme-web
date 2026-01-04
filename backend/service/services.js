import validator from "../utils/validator.js"
import models from "../model/models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const services = {}

services.signup = async (username, email, password) => {
    try {
        validator.validateSignup(username, email, password)
        const hashedPassword = await bcrypt.hash(password, 10)
        const userId = await models.registerUser(username, email, hashedPassword)
        return userId
    } catch (error) {
        throw error
    }
}

services.login = async (username, password) => {
    try {
        validator.validateLogin(username, password)
        const user = await models.findUser(username)
        if (!user) {
            throw new Error("Invalid username or password")
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error("Invalid username or password")
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )
        return { token, userId: user._id }
    } catch (error) {
        throw error
    }
}

services.forgetPassword = async (identifier, newPassword, confirmPassword) => {
    try {
        if (!identifier || !newPassword || !confirmPassword) {
            throw new Error("All fields are required")
        }

        if (newPassword !== confirmPassword) {
            throw new Error("Passwords do not match")
        }

        if (newPassword.length < 6) {
            throw new Error("Password must be at least 6 characters long")
        }

        const user = await models.findUserByIdentifier(identifier)
        if (!user) {
            throw new Error("User not found")
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)

        await models.updatePassword(user._id, hashedPassword)

        return { message: "Password updated successfully" }
    } catch (error) {
        throw error
    }
}


services.getCodebase = async (userId) => {
    try {
        console.log(userId)
        return await models.getCodebase(userId)
    } catch (error) {
        throw error
    }
}

services.getComments = async (userId, codebase) => {
    try {
        return await models.getComments(userId, codebase)
    } catch (error) {
        throw error
    }
}

services.getSpecificComment = async (userId, codebase, key) => {
    try {
        return await models.getSpecificComments(userId, codebase, key)
    } catch (error) {
        throw error
    }
}


services.deleteComment = async (userId, codebase, key) => {
    try {
        return await models.deleteComment(userId, codebase, key)
    } catch (error) {
        throw error
    }
}

services.editComments = async (userId, codebase, key, value) => {
    try {
        return await models.editComments(userId, codebase, key, value)
    } catch (error) {
        throw error
    }
}

services.uploadComments = async (userId, codebase, commentsMap) => {
    try {
        return await models.uploadComments(userId, codebase, commentsMap)
    } catch (error) {
        throw error
    }
}

export default services
