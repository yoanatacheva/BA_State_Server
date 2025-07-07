// Loads .env and then .env.${NODE_ENV} automatically
require('dotenv').config();

const { createServer } = require("http");
const { Server } = require("socket.io");
const { presets } = require("./presets.js");

// Use environment variable for PORT, default to 4000 if not set
const PORT = process.env.PORT || 4000;

// Parse allowed origins from environment variable
const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || "";
// Ensure splitting works even if the variable isn't set
const allowedOrigins = allowedOriginsEnv ? allowedOriginsEnv.split(',').map(origin => origin.trim()).filter(Boolean) : [];

// Fallback for safety if no origins are defined in env after loading
if (allowedOrigins.length === 0) {
  console.warn("WARN: No ALLOWED_ORIGINS defined in environment variables or .env files. Falling back to default localhost origins.");
  allowedOrigins.push("http://localhost:3000", "http://localhost:3001", "http://localhost:3002");
}

console.log("Allowed CORS Origins:", allowedOrigins);

let theme = { ...presets.Default };

const INACTIVITY_TIMEOUT = 3 * 60 * 1000;
let inactivityTimer = null;
const PRESET_CYCLE = ["Warm", "Cold", "Joyful", "Carbon"];

function applyRandomPreset() {
  const randomKey = PRESET_CYCLE[Math.floor(Math.random() * PRESET_CYCLE.length)];
  const newTheme = presets[randomKey];
  if (newTheme) {
    console.log(`Inactivity detected. Resetting theme to preset: ${randomKey}`);
    theme = { ...newTheme };
    io.emit("themeUpdate", theme);
  }
  resetInactivityTimer();
}

function resetInactivityTimer() {
  if (inactivityTimer) clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(applyRandomPreset, INACTIVITY_TIMEOUT);
}

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", socket => {
  console.log("Client connected:", socket.id);

  // 1) Send full theme on demand
  socket.on("getInitialTheme", () => {
    socket.emit("themeUpdate", theme);
  });

  // 2) Single‐variable update
  socket.on("updateThemeVariable", ({ variable, value }) => {
    theme[variable] = value;
    socket.broadcast.emit("themeVariableUpdate", { variable, value });
    resetInactivityTimer();
  });

  // 3) Replace entire theme
  socket.on("updateFullTheme", (newTheme) => {
    theme = { ...newTheme };
    io.emit("themeUpdate", theme);
    resetInactivityTimer();
  });

  // 4) Serve presets on demand
  socket.on("getPresets", () => {
    socket.emit("presets", presets);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Theme‐server listening internally on http://localhost:${PORT}`);
  resetInactivityTimer();
});
