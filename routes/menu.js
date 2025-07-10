const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const MenuItem = require("../models/Menu");

// ⚙️ Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${Date.now()}_${file.originalname.replace(/\s+/g, "_")}`
    );
  },
});
const upload = multer({ storage });

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

// ➕ POST new menu item
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (!name || !description || !price || !req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new MenuItem({
      name,
      description,
      price: parseFloat(price),
      imgUrl: "/" + req.file.path.replace(/\\/g, "/"), // serve path
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

    // Optionally delete image file
    if (item.imgUrl) {
      const imgPath = path.join(__dirname, "..", item.imgUrl);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await item.deleteOne();
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
