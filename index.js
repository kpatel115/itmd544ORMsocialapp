const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Assuming you have set up GraphQL and it's using '/api' endpoint
// app.use('/api', graphqlHTTP({ schema, rootValue: resolver, graphiql: true }));

app.listen(process.env.PORT || 3000, () => {
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

// GET Users
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
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

// Start web Server
// The server is already started above, no need to start it again here
