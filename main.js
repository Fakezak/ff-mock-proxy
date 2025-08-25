const backendURL = "https://your-backend-url"; // change when backend is live

document.getElementById("activateBtn").addEventListener("click", async () => {
  const res = await fetch(`${backendURL}/get-proxy`);
  const data = await res.json();

  document.getElementById("proxyBox").innerHTML = `
    <p><strong>Proxy Active ✅</strong></p>
    <p>IP: <span style="color:#0f0">${data.proxyIP}</span></p>
    <p>Port: <span style="color:#0f0">${data.proxyPort}</span></p>
  `;

  updateStatus();
});

document.getElementById("connectBtn").addEventListener("click", async () => {
  const ip = document.getElementById("ipInput").value;
  const port = parseInt(document.getElementById("portInput").value);

  const res = await fetch(`${backendURL}/connect`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ip, port })
  });

  const data = await res.json();
  alert(data.status || data.error);

  updateStatus();
});

async function updateStatus() {
  const res = await fetch(`${backendURL}/status`);
  const data = await res.json();

  let content = `
    <p><strong>Proxy IP:</strong> ${data.proxy_ip}</p>
    <p><strong>Proxy Port:</strong> ${data.proxy_port}</p>
    <p><strong>Connected Clients:</strong></p>
  `;

  data.clients.forEach(c => {
    content += `<p>- ${c.ip}:${c.port}</p>`;
  });

  document.getElementById("statusBox").innerHTML = content;
}

// auto refresh every 5 sec
setInterval(updateStatus, 5000);
