const express = require("express");
const authMiddleware = require("../auth/middleware");
const OpenAIService = require("../services/openaiService");
const { AiChat } = require("../models");

const router = express.Router();

// Get AI response for a question
router.post("/chat", authMiddleware, async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const answer = await OpenAIService.answerQuestion(question);

    // Check if AI is not available
    if (answer.includes("AI features are not available")) {
      return res.status(503).json({ 
        message: "AI features are not available. Please configure OpenAI API key.",
        data: { answer }
      });
    }

    // Save to database
    const aiChat = await AiChat.create({
      question,
      answer,
      userId,
    });

    res.json({
      success: true,
      data: {
        id: aiChat.id,
        question,
        answer,
        createdAt: aiChat.createdAt,
      },
    });
  } catch (error) {
    console.error("AI Chat Error:", error);
    res.status(500).json({ message: "Failed to get AI response" });
  }
});

// Generate post idea
router.post("/generate-post-idea", authMiddleware, async (req, res) => {
  try {
    const idea = await OpenAIService.generatePostIdea();
    
    // Check if AI is not available
    if (idea.includes("AI features are not available")) {
      return res.status(503).json({ 
        message: "AI features are not available. Please configure OpenAI API key.",
        data: { idea }
      });
    }
    
    res.json({
      success: true,
      data: { idea },
    });
  } catch (error) {
    console.error("Generate Post Idea Error:", error);
    res.status(500).json({ message: "Failed to generate post idea" });
  }
});

// Get prompt library response
router.post("/prompt-library", authMiddleware, async (req, res) => {
  try {
    const { promptType } = req.body;
    const userId = req.user.id;

    if (!promptType) {
      return res.status(400).json({ message: "Prompt type is required" });
    }

    const response = await OpenAIService.generatePromptResponse(promptType);

    // Check if AI is not available
    if (response.includes("AI features are not available")) {
      return res.status(503).json({ 
        message: "AI features are not available. Please configure OpenAI API key.",
        data: { response }
      });
    }

    // Save to database
    const aiChat = await AiChat.create({
      question: `Prompt Library: ${promptType}`,
      answer: response,
      category: promptType,
      userId,
    });

    res.json({
      success: true,
      data: {
        id: aiChat.id,
        promptType,
        response,
        createdAt: aiChat.createdAt,
      },
    });
  } catch (error) {
    console.error("Prompt Library Error:", error);
    res.status(500).json({ message: "Failed to get prompt response" });
  }
});

// Get user's AI chat history
router.get("/history", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const chats = await AiChat.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
      limit: 20,
    });

    res.json({
      success: true,
      data: chats,
    });
  } catch (error) {
    console.error("Get Chat History Error:", error);
    res.status(500).json({ message: "Failed to get chat history" });
  }
});

// Save/unsave a chat
router.put("/history/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { isSaved } = req.body;
    const userId = req.user.id;

    const chat = await AiChat.findOne({
      where: { id, userId },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    await chat.update({ isSaved });

    res.json({
      success: true,
      data: chat,
    });
  } catch (error) {
    console.error("Update Chat Error:", error);
    res.status(500).json({ message: "Failed to update chat" });
  }
});

module.exports = router; 