require('dotenv').config();
const express = require("express");
const corsMiddleWare = require("cors");
// Auth middleware: our own code. Checks for the existence of a token in a header called `authentication`.
const authMiddleWare = require("./auth/middleware");
const authRouter = require("./routers/auth");
const storyRouter = require("./routers/stories");
const aiRouter = require("./routers/ai");
const marketplaceRouter = require("./routers/marketplace");
const commentsRouter = require("./routers/comments");
const { PORT } = require("./config/constants");
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Create an express app
const app = express();

/**
 * Middlewares
 *
 * It is advisable to configure your middleware before configuring the routes
 * If you configure routes before the middleware, these routes will not use them
 *
 */

// CORS middleware:  * Since our api is hosted on a different domain than our client
// we are are doing "Cross Origin Resource Sharing" (cors)
// Cross origin resource sharing is disabled by express by default
app.use(corsMiddleWare());

// express.json():be able to read request bodies of JSON requests a.k.a. body-parser
const bodyParserMiddleWare = express.json();
app.use(bodyParserMiddleWare);

/**
 * Routes
 *
 * Define your routes and attach our routers here (now that middlewares are configured)
 */

app.use("/auth", authRouter);
app.use("/stories", storyRouter);
app.use("/ai", aiRouter);
app.use("/marketplace", marketplaceRouter);
app.use("/comments", commentsRouter);

// Add this test route
app.get("/", async (req, res, next) => {
  try {
    res.json({
      status: "Server is running",
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'development',
      nodeVersion: process.version
    });  // This was missing the closing brace and parenthesis
  } catch (error) {
    console.error('Root route error:', error);
    next(error);
  }
});

// POST endpoint which requires a token for testing purposes, can be removed
app.post("/authorized_post_request", authMiddleWare, (req, res) => {
  // accessing user that was added to req by the auth middleware
  const user = req.user;
  // don't send back the password hash
  delete user.dataValues["password"];

  res.json({
    youPosted: {
      ...req.body,
    },
    userFoundWithToken: {
      ...user.dataValues,
    },
  });
});
// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message
  });
});

// Start server
const server = app.listen(4000, '0.0.0.0', () => {
  const { address, port } = server.address();
  console.log(`Server is running on http://${address}:${port}`);
}).on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
