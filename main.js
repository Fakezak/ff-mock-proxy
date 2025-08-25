// Replace with your backend URL if live
const backendURL = "https://your-backend-url";

// DOM elements
const proxyBox = document.getElementById("proxyBox");
const statusBox = document.getElementById("statusBox");
const ipInput = document.getElementById("ipInput");
const portInput = document.getElementById("portInput");
const connectBtn = document.getElementById("connectBtn");
const activateBtn = document.getElementById("activateBtn");

let proxyIP = "";
let proxyPort = "";

activateBtn.addEventListener("click", async () => {
    // Simulate backend call
    // const res = await fetch(`${backendURL}/get-proxy`);
    // const data = await res.json();

    // For demo: generate random IP & Port
    proxyIP = `${randomInt(10, 255)}.${randomInt(10, 255)}.${randomInt(10, 255)}.${randomInt(10, 255)}`;
    proxyPort = randomInt(2000, 9999);

    // Update Proxy Box
    proxyBox.innerHTML = `
        <p><strong>Proxy Active ✅</strong></p>
        <p>IP: <span style="color:#0f0">${proxyIP}</span></p>
        <p>Port: <span style="color:#0f0">${proxyPort}</span></p>
    `;

    // Auto-fill Manual Connect
    ipInput.value = proxyIP;
    portInput.value = proxyPort;

    statusBox.innerHTML = `<p>⚡ Manual Connect ready. Click Connect to simulate.</p>`;
});

connectBtn.addEventListener("click", async () => {
    const ip = ipInput.value;
    const port = portInput.value;

    if (ip === proxyIP && port == proxyPort) {
        statusBox.innerHTML = `
            <p>✅ Connected to MockeX Proxy!</p>
            <p>Now add these to your Wi-Fi to simulate using the proxy:</p>
            <p><strong>IP:</strong> ${ip}</p>
            <p><strong>Port:</strong> ${port}</p>
            <p style="color:#ff0">Instructions:</p>
            <p>1. Go to Wi-Fi settings on your device.</p>
            <p>2. Tap on your connected network.</p>
            <p>3. Select "Modify network" → "Advanced options".</p>
            <p>4. Under "Proxy" select "Manual".</p>
            <p>5. Enter the IP and Port shown above.</p>
            <p>6. Save and reconnect.</p>
        `;
    } else {
        alert("❌ IP or Port do not match the active proxy!");
    }
});

// Helper to generate random integers
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
