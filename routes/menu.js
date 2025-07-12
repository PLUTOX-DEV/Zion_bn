const express = require("express");
const router = express.Router();
const MenuItem = require("../models/Menu");

// 📥 GET all menu items
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 📥 GET single menu item
router.get("/:id", async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ➕ POST new menu item (JSON with imgUrl)
router.post("/", async (req, res) => {
  try {
    const { name, description, price, imgUrl } = req.body;

    if (!name || !description || !price || !imgUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new MenuItem({
      name,
      description,
      price: parseFloat(price),
      imgUrl, // already a URL string
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 🗑️ DELETE menu item
router.delete("/:id", async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Menu item not found" });

    await item.deleteOne();
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
