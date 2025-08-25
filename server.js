let timerInterval = null;
let sessionSeconds = 2*60*60;
let currentUID = null;
const backendURL = 'http://localhost:3000';

function formatTime(sec){
    const h = Math.floor(sec/3600).toString().padStart(2,'0');
    const m = Math.floor((sec%3600)/60).toString().padStart(2,'0');
    const s = Math.floor(sec%60).toString().padStart(2,'0');
    return `${h}:${m}:${s}`;
}

async function activateDashboard(){
    const uid = document.getElementById('uidInput').value.trim();
    const errorDiv = document.getElementById('errorMsg');
    if(!uid){
        errorDiv.innerHTML = '<span style="color:red">Enter your UID to activate!</span>';
        return;
    }
    errorDiv.innerHTML = '';
    currentUID = uid;

    const res = await fetch(`${backendURL}/activate`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({ uid })
    });
    const data = await res.json();

    const ipPortDiv = document.getElementById('ipPortBox');
    ipPortDiv.style.display = 'inline-block';
    ipPortDiv.innerHTML = `<span style="color:#0f0">Proxy IP: ${data.proxyIP} | Port: ${data.proxyPort}</span>`;

    if(timerInterval) clearInterval(timerInterval);
    sessionSeconds = 2*60*60;
    updateDashboard();

    timerInterval = setInterval(() => {
        sessionSeconds--;
        updateDashboard();
        if(sessionSeconds <= 0) sessionSeconds = 2*60*60;
    }, 1000);
}

async function updateDashboard(){
    if(!currentUID) return;
    const res = await fetch(`${backendURL}/dashboard/${currentUID}`);
    const data = await res.json();
    const dashboardDiv = document.getElementById('dashboard');

    // Render proper HTML
    dashboardDiv.innerHTML = `
        <h2>UID: ${currentUID}</h2>
        <p>Session Active: ${formatTime(sessionSeconds)}</p>
        <h3>Items (Fake)</h3>
        <p>Diamonds: ${data.items.diamonds}</p>
        <p>Bundles: ${data.items.bundles.join(', ')}</p>
        <p>Emotes: ${data.items.emotes.join(', ')}</p>
        <p>Skins: ${data.items.skins.join(', ')}</p>
    `;

    renderSocialIsland(data.items);
    updateProgressBar();
}

function renderSocialIsland(items){
    const islandDiv = document.getElementById('socialIsland');
    islandDiv.innerHTML = '';
    const allItems = [...items.bundles, ...items.emotes, ...items.skins];

    allItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'itemCard';
        card.innerHTML = `
            <img class="itemImg" src="https://via.placeholder.com/100?text=${encodeURIComponent(item)}" alt="${item}">
            <p>${item}</p>
        `;
        islandDiv.appendChild(card);
    });
}

function updateProgressBar(){
    const percent = ((2*60*60 - sessionSeconds) / (2*60*60)) * 100;
    document.getElementById('progressBar').style.width = percent + '%';
}

// IP/Port click simulation
document.getElementById('ipPortBox').addEventListener('click', async () => {
    if(!currentUID){
        const res = await fetch(`${backendURL}/use-proxy`);
        const data = await res.json();
        document.getElementById('errorMsg').innerHTML = `<span style="color:red">${data.error}</span>`;
    } else {
        const res = await fetch(`${backendURL}/use-proxy/${currentUID}`);
        const data = await res.json();
        document.getElementById('errorMsg').innerHTML = `<span style="color:lime">${data.message}</span>`;
    }
});
