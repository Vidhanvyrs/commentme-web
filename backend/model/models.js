import { User } from "./user.js"
import { CommentStore } from "./comments.js"

const models = {}

models.registerUser = async (username, email, password) => {
    try {
        const newUser = await User.create({ username, email, password })
        return newUser
    } catch (error) {
        if (error.code === 11000) {
            if (error.keyPattern.username) throw new Error("Username already exists")
            if (error.keyPattern.email) throw new Error("Email already exists")
        }
        throw error
    }
}

models.findUser = async (username) => {
    return await User.findOne({ username })
}

models.findUserByIdentifier = async (identifier) => {
    return await User.findOne({
        $or: [
            { username: identifier },
            { email: identifier }
        ]
    })
}

models.updatePassword = async (userId, hashedPassword) => {
    const user = await User.findById(userId)
    if (!user) {
        throw new Error("User not found")
    }

    user.password = hashedPassword
    await user.save()
}


models.getCodebase = async (userId) => {
    const store = await CommentStore.findOne({ userId })
    if (!store) return []
    console.log(store.comments.map(comment => comment.codebase))
    return store.comments.map(comment => comment.codebase)
}

models.getComments = async (userId, codebase) => {
    const store = await CommentStore.findOne({ userId })
    if (!store) return {}

    const codebaseName = codebase || "default"
    const codebaseEntry = store.comments.find(c => c.codebase === codebaseName)

    if (!codebaseEntry || !codebaseEntry.filecomment) return {}

    return codebaseEntry.filecomment
}

models.getSpecificComments = async (userId, codebase, key) => {
    const store = await CommentStore.findOne({ userId })
    if (!store) {
        throw new Error(`No comment found for key: ${key}`)
    }

    const codebaseName = codebase || "default"
    const codebaseEntry = store.comments.find(c => c.codebase === codebaseName)

    if (!codebaseEntry || !codebaseEntry.filecomment.get(key)) {
        throw new Error(`No comment found for key: ${key}`)
    }

    return codebaseEntry.filecomment.get(key)
}

models.deleteComment = async (userId, codebase, key) => {
    const store = await CommentStore.findOne({ userId })
    if (!store) {
        throw new Error("No comments found")
    }

    const codebaseName = codebase || "default"
    const codebaseEntry = store.comments.find(c => c.codebase === codebaseName)

    if (!codebaseEntry || !codebaseEntry.filecomment.get(key)) {
        throw new Error(`No comment found for key: ${key}`)
    }

    codebaseEntry.filecomment.delete(key)
    await store.save()
    return { message: `Comment deleted for ${key}` }
}

models.editComments = async (userId, codebase, key, value) => {
    const store = await CommentStore.findOne({ userId })
    if (!store) {
        throw new Error("No comments found")
    }

    const codebaseName = codebase || "default"
    const codebaseEntry = store.comments.find(c => c.codebase === codebaseName)

    if (!codebaseEntry || !codebaseEntry.filecomment.get(key)) {
        throw new Error(`No comment found for key: ${key}`)
    }

    codebaseEntry.filecomment.set(key, value)
    await store.save()
    return { message: `Comment updated for ${key}` }
}

models.uploadComments = async (userId, codebase, commentsMap) => {
    let store = await CommentStore.findOne({ userId })

    if (!store) {
        store = await CommentStore.create({ userId, comments: [] })
    }

    const codebaseName = codebase || "default"
    let codebaseIndex = store.comments.findIndex(c => c.codebase === codebaseName)

    if (codebaseIndex === -1) {
        store.comments.push({
            codebase: codebaseName,
            filecomment: new Map()
        })
        codebaseIndex = store.comments.length - 1
        await store.save()
        store = await CommentStore.findById(store._id)
    }

    const codebaseEntry = store.comments[codebaseIndex]

    // Ensure filecomment is a Map (safety check)
    if (!(codebaseEntry.filecomment instanceof Map)) {
        codebaseEntry.filecomment = new Map(Object.entries(codebaseEntry.filecomment || {}))
    }

    // Merge new comments
    for (const [key, value] of Object.entries(commentsMap)) {
        codebaseEntry.filecomment.set(key, value)
    }

    store.markModified(`comments.${codebaseIndex}.filecomment`)
    await store.save()
    return { message: `Comments uploaded successfully for ${codebaseName}` }
}

export default models
