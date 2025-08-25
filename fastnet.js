function fastNetwork() {
    // Simulation: just show the dashboard saying network optimized
    const statusBox = document.getElementById("statusBox");
    statusBox.innerHTML += `
        <p style="color:#0ff">📶 Optimizing network for Free Fire... Fast IP & Port ready!</p>
    `;

    // Optional: animate some network effect
    let dots = 0;
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        const dotsStr = ".".repeat(dots);
        statusBox.innerHTML = statusBox.innerHTML.replace(/\.{0,3}$/, dotsStr);
    }, 500);

    // Stop after 3 seconds
    setTimeout(() => {
        clearInterval(interval);
        statusBox.innerHTML += "<p>⚡ Network ready! Launch FF now.</p>";
    }, 3000);
}
