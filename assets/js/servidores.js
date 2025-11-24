// JS: manejo de servidores, API, renderizado de filas y refresh

// --- 1. CONFIGURACIÓN DE SERVIDORES ---
const servers = [
  { name:'SuperLand', address:'SuperLandCity.ddns.net', port:25535, type:'bedrock' },
  { name:'GalaxyCraft', address:'GalaxyCraft.ddns.net', port:25567, type:'bedrock' },
  { name:'Del Main', address:'delmain.holynodes.com', port:25535, type:'bedrock' },
  { name:'Astral Pe', address:'play-astral.sytes.net', port:25788, type:'bedrock' },
  { name:'Gola', address:'sdm.hypermine.net', port:25788, type:'java' }
];

async function getServerStatus(server) {
  const baseUrl = 'https://api.mcsrvstat.us';
  const url = server.type === 'bedrock'
    ? `${baseUrl}/bedrock/2/${server.address}:${server.port}`
    : `${baseUrl}/2/${server.address}:${server.port}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  } catch (error) {
    console.warn(`No se pudo conectar con ${server.name}`, error);
    return { online:false };
  }
}

function createServerRow(server, status) {
  const row = document.createElement('div');
  row.className = 'server-row';

  const isOnline = status.online === true;
  const icon = (isOnline && status.icon) ? status.icon : 'assets/images/Icons/servidores.png';

  const playerCount = isOnline && status.players?.online ? status.players.online : 0;

  row.innerHTML = `
    <div class="server-row-left">
      <img src="${icon}" class="server-icon-small" onerror="this.src='https://via.placeholder.com/50?text=?'">
      <div class="server-info-text">
        <div class="server-name-row">${server.name}</div>
        <div class="server-status-row">
          <span class="dot ${isOnline ? 'online' : 'offline'}"></span>
          <span style="color:${isOnline ? '#00b894' : '#ff4757'}">${isOnline ? 'En Línea' : 'Offline'}</span>
          ${isOnline ? `<span style='color:#aaa; font-size:.8em'>(${playerCount} jug.)</span>` : ''}
        </div>
      </div>
    </div>
    <button class="btn-jugar" onclick="openModal('${server.name}','${server.address}','${server.port}')">JUGAR</button>
  `;

  return row;
}

async function loadServers() {
  const container = document.getElementById('serversContainer');
  const refreshBtn = document.getElementById('refreshBtn');

  refreshBtn.classList.add('spinning');
  container.innerHTML = '';

  servers.forEach(() => {
    const loadRow = document.createElement('div');
    loadRow.className = 'server-row';
    loadRow.innerHTML = `
      <div class='server-row-left'>
        <div style='width:50px;height:50px;background:#444;border-radius:8px;margin-right:10px;'></div>
        <div class='server-info-text'><span style='color:#aaa'>Cargando...</span></div>
      </div>
    `;
    container.appendChild(loadRow);
  });

  for (let i = 0; i < servers.length; i++) {
    const status = await getServerStatus(servers[i]);
    const newRow = createServerRow(servers[i], status);
    container.children[i].replaceWith(newRow);
  }

  refreshBtn.classList.remove('spinning');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('refreshBtn').addEventListener('click', loadServers);
  setTimeout(loadServers, 100);
});