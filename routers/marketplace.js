const express = require("express");
const authMiddleware = require("../auth/middleware");
const { Marketplace, User } = require("../models");

const router = express.Router();

// Get all marketplace listings
router.get("/", async (req, res) => {
  try {
    const listings = await Marketplace.findAll({
      where: { isActive: true },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: listings,
    });
  } catch (error) {
    console.error("Get Marketplace Listings Error:", error);
    res.status(500).json({ message: "Failed to get marketplace listings" });
  }
});

// Get marketplace listing by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await Marketplace.findOne({
      where: { id, isActive: true },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error("Get Marketplace Listing Error:", error);
    res.status(500).json({ message: "Failed to get marketplace listing" });
  }
});

// Create new marketplace listing
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      imageUrl,
      condition,
      location,
      contactInfo,
    } = req.body;
    const userId = req.user.id;

    if (!title || !description || !category || !price) {
      return res.status(400).json({
        message: "Title, description, category, and price are required",
      });
    }

    const listing = await Marketplace.create({
      title,
      description,
      category,
      price,
      imageUrl,
      condition: condition || "good",
      location,
      contactInfo,
      userId,
    });

    const listingWithUser = await Marketplace.findOne({
      where: { id: listing.id },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });

    res.status(201).json({
      success: true,
      data: listingWithUser,
    });
  } catch (error) {
    console.error("Create Marketplace Listing Error:", error);
    res.status(500).json({ message: "Failed to create marketplace listing" });
  }
});

// Update marketplace listing
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = req.body;

    const listing = await Marketplace.findOne({
      where: { id, userId },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    await listing.update(updateData);

    const updatedListing = await Marketplace.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
    });

    res.json({
      success: true,
      data: updatedListing,
    });
  } catch (error) {
    console.error("Update Marketplace Listing Error:", error);
    res.status(500).json({ message: "Failed to update marketplace listing" });
  }
});

// Delete marketplace listing (soft delete)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const listing = await Marketplace.findOne({
      where: { id, userId },
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    await listing.update({ isActive: false });

    res.json({
      success: true,
      message: "Listing deleted successfully",
    });
  } catch (error) {
    console.error("Delete Marketplace Listing Error:", error);
    res.status(500).json({ message: "Failed to delete marketplace listing" });
  }
});

// Get user's marketplace listings
router.get("/user/listings", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const listings = await Marketplace.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });

    res.json({
      success: true,
      data: listings,
    });
  } catch (error) {
    console.error("Get User Listings Error:", error);
    res.status(500).json({ message: "Failed to get user listings" });
  }
});

module.exports = router; 