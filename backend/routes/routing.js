import express from 'express'
import services from '../service/services.js'
import auth from '../middleware/auth.js'

const router = express.Router()

console.log("Available service functions:", Object.keys(services))


router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body
        const signupUser = await services.signup(username, email, password)
        if (signupUser) {
            res.status(200).json({ message: "User created successfully", userId: signupUser._id })
        }
    } catch (error) {
        res.status(400).json({ message: error.message || "Internal Server Error" })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const result = await services.login(username, password)

        // Set refresh token as HTTP-only cookie
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })

        // Return access token in response body
        res.status(200).json({
            accessToken: result.accessToken,
            userId: result.userId
        })
    } catch (error) {
        res.status(401).json({ message: error.message || "Authentication failed" })
    }
})

router.post('/refresh', async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken
        const result = await services.refreshAccessToken(refreshToken)
        res.status(200).json(result)
    } catch (error) {
        res.status(401).json({ message: error.message || "Token refresh failed" })
    }
})

router.post('/logout', auth, async (req, res) => {
    try {
        const result = await services.logout()
        // Clear refresh token cookie
        res.clearCookie('refreshToken')
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/forgot-password', async (req, res) => {
    try {
        const { identifier, newPassword, confirmPassword } = req.body
        const result = await services.forgetPassword(
            identifier,
            newPassword,
            confirmPassword
        )
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})


router.get('/codebases', auth, async (req, res) => {
    try {
        const codebase = await services.getCodebase(req.user.userId)
        res.status(200).json(codebase)
    } catch (error) {
        res.status(500).json({ message: "Error fetching codebase" })
    }
})

router.get('/comments', auth, async (req, res) => {
    try {
        const { codebase } = req.query
        const comments = await services.getComments(req.user.userId, codebase)
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ message: "Error fetching comments" })
    }
})

router.get('/comments/:key', auth, async (req, res) => {
    try {
        const { key } = req.params
        const { codebase } = req.query
        const comment = await services.getSpecificComment(req.user.userId, codebase, key)
        res.status(200).json({ key, comment })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.delete('/comments/:key', auth, async (req, res) => {
    try {
        const { key } = req.params
        const { codebase } = req.query
        const result = await services.deleteComment(req.user.userId, codebase, key)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.put('/comments/:key', auth, async (req, res) => {
    try {
        const { key } = req.params
        const { codebase } = req.query
        const { value } = req.body
        const result = await services.editComments(req.user.userId, codebase, key, value)
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.post('/comments/upload', auth, async (req, res) => {
    try {
        const { codebase, comments } = req.body
        const result = await services.uploadComments(req.user.userId, codebase, comments)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message || "Error uploading comments" })
    }
})

export default router