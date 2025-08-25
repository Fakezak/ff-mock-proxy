const proxyIP = "11.88.18.103";
const proxyPort = "7235";

// DOM elements
const proxyBox = document.getElementById("proxyBox");
const statusBox = document.getElementById("statusBox");
const ipInput = document.getElementById("ipInput");
const portInput = document.getElementById("portInput");
const connectBtn = document.getElementById("connectBtn");
const activateBtn = document.getElementById("activateBtn");

activateBtn.addEventListener("click", () => {
    // Always fixed IP + Port
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

connectBtn.addEventListener("click", () => {
    const ip = ipInput.value;
    const port = portInput.value;

    if (ip === proxyIP && port === proxyPort) {
        statusBox.innerHTML = `
            <p>✅ Connected to MockeX Proxy!</p>
            <p>Fast network enabled ⚡</p>
            <p>Now add these to your Wi-Fi:</p>
            <p><strong>IP:</strong> ${ip}</p>
            <p><strong>Port:</strong> ${port}</p>
            <p style="color:#ff0">Instructions:</p>
            <p>1. Go to Wi-Fi settings on your device.</p>
            <p>2. Tap on your connected network.</p>
            <p>3. Select "Modify network" → "Advanced options".</p>
            <p>4. Under "Proxy" select "Manual".</p>
            <p>5. Enter the IP and Port above.</p>
            <p>6. Save and reconnect.</p>
        `;

        // Trigger Fast Network JS
        fastNetwork();
    } else {
        alert("❌ IP or Port do not match the active proxy!");
    }
});
