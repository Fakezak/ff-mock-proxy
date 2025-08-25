const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Fake proxy pool
const proxyList = [
  { ip: "192.168.0.101", port: "8080" },
  { ip: "192.168.0.102", port: "9090" },
  { ip: "192.168.0.103", port: "7070" }
];

// Store active session
let activeProxy = null;
let ffPlayerUID = null;

// Get new proxy
app.get("/get-proxy", (req, res) => {
  activeProxy = proxyList[Math.floor(Math.random() * proxyList.length)];
  ffPlayerUID = null; // reset
  res.json({
    success: true,
    proxyIP: activeProxy.ip,
    proxyPort: activeProxy.port
  });
});

// Simulate Free Fire login detection
app.get("/ff-login/:uid", (req, res) => {
  if (!activeProxy) {
    return res.json({ success: false, message: "No proxy active" });
  }
  ffPlayerUID = req.params.uid;
  res.json({
    success: true,
    message: "Connected to Free Fire",
    playerUID: ffPlayerUID
  });
});

// Status check
app.get("/status", (req, res) => {
  res.json({
    proxy: activeProxy,
    ffPlayer: ffPlayerUID ? ffPlayerUID : "Not logged in"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
