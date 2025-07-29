const express = require("express");
const authMiddleware = require("../auth/middleware");
const { comment, like, commentLike, user, story } = require("../models");

const router = express.Router();

// Get all comments for a story
router.get("/story/:storyId", async (req, res) => {
  try {
    const { storyId } = req.params;
    
    const comments = await comment.findAll({
      where: { storyId },
      include: [
        {
          model: user,
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ success: true, data: comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

// Add a comment to a story
router.post("/story/:storyId", authMiddleware, async (req, res) => {
  try {
    const { storyId } = req.params;
    const { comments: commentText } = req.body;
    const userId = req.user.id;
    
    if (!commentText || commentText.trim() === '') {
      return res.status(400).json({ message: "Comment text is required" });
    }
    
    const newComment = await comment.create({
      comments: commentText.trim(),
      userId,
      storyId: parseInt(storyId)
    });
    
    // Fetch the comment with user info
    const commentWithUser = await comment.findByPk(newComment.id, {
      include: [
        {
          model: user,
          attributes: ['id', 'name', 'email']
        }
      ]
    });
    
    res.status(201).json({ 
      success: true, 
      data: commentWithUser,
      message: "Comment added successfully" 
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
});

// Toggle like on a story
router.post("/like/story/:storyId", authMiddleware, async (req, res) => {
  try {
    const { storyId } = req.params;
    const userId = req.user.id;
    
    // Check if user already liked this story
    const existingLike = await like.findOne({
      where: { userId, storyId: parseInt(storyId) }
    });
    
    if (existingLike) {
      // Unlike - remove the like
      await existingLike.destroy();
      
      // Get updated like count
      const likeCount = await like.count({
        where: { storyId: parseInt(storyId) }
      });
      
      res.json({ 
        success: true, 
        liked: false, 
        likeCount,
        message: "Story unliked" 
      });
    } else {
      // Like - add the like
      await like.create({
        userId,
        storyId: parseInt(storyId)
      });
      
      // Get updated like count
      const likeCount = await like.count({
        where: { storyId: parseInt(storyId) }
      });
      
      res.json({ 
        success: true, 
        liked: true, 
        likeCount,
        message: "Story liked" 
      });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ message: "Failed to toggle like" });
  }
});

// Get like status and count for a story
router.get("/like/story/:storyId", authMiddleware, async (req, res) => {
  try {
    const { storyId } = req.params;
    const userId = req.user.id;
    
    // Check if current user liked this story
    const userLike = await like.findOne({
      where: { userId, storyId: parseInt(storyId) }
    });
    
    // Get total like count
    const likeCount = await like.count({
      where: { storyId: parseInt(storyId) }
    });
    
    res.json({ 
      success: true, 
      liked: !!userLike, 
      likeCount 
    });
  } catch (error) {
    console.error("Error fetching like status:", error);
    res.status(500).json({ message: "Failed to fetch like status" });
  }
});

// Delete a comment (only by comment author)
router.delete("/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    
    const commentToDelete = await comment.findByPk(commentId);
    
    if (!commentToDelete) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    if (commentToDelete.userId !== userId) {
      return res.status(403).json({ message: "You can only delete your own comments" });
    }
    
    await commentToDelete.destroy();
    
    res.json({ 
      success: true, 
      message: "Comment deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment" });
  }
});

// Toggle like on a comment
router.post("/like/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    
    // Check if user already liked this comment
    const existingLike = await commentLike.findOne({
      where: { userId, commentId: parseInt(commentId) }
    });
    
    if (existingLike) {
      // Unlike - remove the like
      await existingLike.destroy();
      
      // Get updated like count
      const likeCount = await commentLike.count({
        where: { commentId: parseInt(commentId) }
      });
      
      res.json({ 
        success: true, 
        liked: false, 
        likeCount,
        message: "Comment unliked" 
      });
    } else {
      // Like - add the like
      await commentLike.create({
        userId,
        commentId: parseInt(commentId)
      });
      
      // Get updated like count
      const likeCount = await commentLike.count({
        where: { commentId: parseInt(commentId) }
      });
      
      res.json({ 
        success: true, 
        liked: true, 
        likeCount,
        message: "Comment liked" 
      });
    }
  } catch (error) {
    console.error("Error toggling comment like:", error);
    res.status(500).json({ message: "Failed to toggle comment like" });
  }
});

// Get like status and count for a comment
router.get("/like/:commentId", authMiddleware, async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    
    // Check if current user liked this comment
    const userLike = await commentLike.findOne({
      where: { userId, commentId: parseInt(commentId) }
    });
    
    // Get total like count
    const likeCount = await commentLike.count({
      where: { commentId: parseInt(commentId) }
    });
    
    res.json({ 
      success: true, 
      liked: !!userLike, 
      likeCount 
    });
  } catch (error) {
    console.error("Error fetching comment like status:", error);
    res.status(500).json({ message: "Failed to fetch comment like status" });
  }
});

module.exports = router;
