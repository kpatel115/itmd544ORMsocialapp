const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Assuming you have set up GraphQL and it's using '/api' endpoint
// app.use('/api', graphqlHTTP({ schema, rootValue: resolver, graphiql: true }));

app.listen(process.env.PORT || 4000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
});

// Example of a CRUD operation for User model using Prisma

// POST User
app.post('/api/users', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: req.body
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// POST Post
app.post('/api/posts', async (req, res) => {
    try {
        const post = await prisma.post.create({
            data: req.body
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST Comments
app.post('/api/comments', async (req, res) => {
    try {
        const comment = await prisma.comment.create({
            data: req.body
        });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET Users
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Get Comments
app.get('/api/comments', async (req, res) => {
    try {
        const comment = await prisma.comment.findMany();
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET Specific User
app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const user = await prisma.user.findUniqueOrThrow({
            where: { 
                id: parseInt(id) 
            },
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET Specific Post
app.get('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const post = await prisma.post.findUniqueOrThrow({
            where: { 
                id: parseInt(id) 
            },
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update User
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.update({
            where: { id: parseInt(id) },
            data: req.body
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Update Post
app.put('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: req.body
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Update Comment
app.put('/api/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await prisma.comment.update({
            where: { id: parseInt(id) },
            data: req.body
        });
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Delete User
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.user.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: "User successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Post
app.delete('/api/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.post.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: "Post successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Comment
app.delete('/api/comments/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.post.delete({
            where: { id: parseInt(id) }
        });
        res.status(200).json({ message: "Post successfully deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Start web Server
// The server is already started above, no need to start it again here
