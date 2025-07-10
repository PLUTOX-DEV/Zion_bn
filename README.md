# Menu Backend API

This is a Node.js backend API for managing menu items. It uses Express.js for routing, MongoDB (with Mongoose) for the database, and Multer for image uploads.

## Features

- Add new menu items with name, description, price, and image upload
- Fetch all menu items sorted by creation date (most recent first)
- Delete menu items by ID
- Images are uploaded and served from the `uploads/` directory

## Technologies

- Node.js
- Express.js
- MongoDB & Mongoose
- Multer (for image uploads)
- dotenv (for environment variables)

## Setup

1. Clone the repo:

```bash
git clone <your-repo-url>
cd server
