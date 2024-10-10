const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Social = require('../models/social_schema');

// GET all chats
router.get('/', async (req, res) => {
    try {
        const chats = await Social.find();
        res.status(200).json({ chats: chats.length > 0 ? chats : [] });
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ error: 'An error occurred while fetching chats.' });
    }
});

// POST a new chat
router.post('/', async (req, res) => {
    const { message, picture, profileName, profilePicture } = req.body;

    // Validate the request body
    if (!message || !profileName) {
        return res.status(400).json({ error: 'Message and profile name are required.' });
    }

    try {
        const chat = new Social({
            message,
            picture,
            profileName,
            profilePicture
        });

        const result = await chat.save(); // Saves the chat
        res.status(201).json({ message: 'Chat created successfully', chat: result });
    } catch (error) {
        console.error('Error saving chat:', error);
        res.status(500).json({ error: 'An error occurred while saving the chat.' });
    }
});

// DELETE a chat
router.delete('/:id', async (req, res) => {
    try {
        const result = await Social.findByIdAndDelete(req.params.id);
        if (result) {
            res.status(200).json({ message: 'Chat deleted successfully!' });
        } else {
            res.status(404).json({ error: 'Chat not found!' });
        }
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).json({ error: 'An error occurred while deleting the chat.' });
    }
});

module.exports = router; // Export the router
