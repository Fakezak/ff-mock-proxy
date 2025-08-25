const backendURL = 'http://localhost:3000';

async function activateUID() {
    const uid = document.getElementById('uidInput').value;
    if(!uid) return alert('Enter UID');

    const res = await fetch(`${backendURL}/activate`, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({uid})
    });
    const data = await res.json();
    alert(data.message);
}

async function loadDashboard() {
    const uid = document.getElementById('uidInput').value;
    if(!uid) return alert('Enter UID');

    const res = await fetch(`${backendURL}/dashboard/${uid}`);
    const data = await res.json();
    if(data.error) return alert(data.error);

    const dashboardDiv = document.getElementById('dashboard');
    dashboardDiv.innerHTML = `
      <h2>UID: ${data.uid}</h2>
      <p>VIP: ${data.vip}</p>
      <p>Active: ${data.active ? 'Yes' : 'No'}</p>
      <h3>Items</h3>
      <p>Diamonds: ${data.items.diamonds}</p>
      <p>Bundles: ${data.items.bundles.join(', ')}</p>
      <p>Emotes: ${data.items.emotes.join(', ')}</p>
      <p>Skins: ${data.items.skins.join(', ')}</p>
    `;

    renderSocialIsland(data.items);
}

function renderSocialIsland(items) {
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