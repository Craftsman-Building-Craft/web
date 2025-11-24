// Este es el código que proporcionaste.
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

  // Usamos el estado 'online' y verificamos si hay un ícono válido.
  // Si no hay ícono o está offline, usamos la imagen por defecto.
  const isOnline = status.online === true;
  const icon = (isOnline && status.icon) ? `data:image/png;base64,${status.icon}` : 'assets/images/Icons/servidores.png';
  
  // Manejo del conteo de jugadores
  const playerCount = isOnline && status.players?.online ? status.players.online : 0;
  
  // Escape de strings para los onclick.
  const escapedName = server.name.replace(/'/g, "\\'"); 

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
    <button class="btn-jugar" onclick="openModal('${escapedName}','${server.address}','${server.port}')">JUGAR</button>
  `;

  return row;
}

async function loadServers() {
  const container = document.getElementById('serversContainer');
  const refreshBtn = document.getElementById('refreshBtn');

  // 1. Iniciar la carga y animación de refresco
  refreshBtn.classList.add('spinning');
  container.innerHTML = '';

  // 2. Mostrar filas de 'Cargando...'
  const loadingRows = servers.map(() => {
    const loadRow = document.createElement('div');
    loadRow.className = 'server-row';
    loadRow.innerHTML = `
      <div class='server-row-left'>
        <div style='width:50px;height:50px;background:#444;border-radius:8px;margin-right:10px;'></div>
        <div class='server-info-text'><span style='color:#aaa'>Cargando...</span></div>
      </div>
    `;
    container.appendChild(loadRow);
    return loadRow;
  });

  // 3. Obtener estados y reemplazar filas
  for (let i = 0; i < servers.length; i++) {
    const status = await getServerStatus(servers[i]);
    const newRow = createServerRow(servers[i], status);
    // Reemplaza la fila de carga con la fila de estado real
    loadingRows[i].replaceWith(newRow); 
  }

  // 4. Finalizar la animación de refresco
  refreshBtn.classList.remove('spinning');
}

// --- 2. FUNCIONES ADICIONALES PARA EL MODAL ---

/**
 * Muestra el modal de conexión con los detalles del servidor.
 * @param {string} name - Nombre del servidor.
 * @param {string} address - Dirección del servidor.
 * @param {number} port - Puerto del servidor.
 */
function openModal(name, address, port) {
    document.getElementById('modalServerName').textContent = name;
    document.getElementById('modalServerAddress').textContent = address;
    document.getElementById('modalServerPort').textContent = port;
    document.getElementById('serverModal').style.display = 'block';
}

/**
 * Oculta el modal de conexión.
 */
function closeModal() {
    document.getElementById('serverModal').style.display = 'none';
}

/**
 * Copia el contenido de un elemento al portapapeles.
 * @param {string} elementId - ID del elemento que contiene el texto a copiar.
 */
function copyToClipboard(elementId) {
    const textToCopy = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert('Copiado al portapapeles: ' + textToCopy);
    }).catch(err => {
        console.error('No se pudo copiar el texto: ', err);
    });
}

// --- 3. INICIALIZACIÓN ---

document.addEventListener('DOMContentLoaded', () => {
  // Asigna el evento click al botón de refresco
  const refreshButton = document.getElementById('refreshBtn');
  if (refreshButton) {
    refreshButton.addEventListener('click', loadServers);
  } else {
    console.error("No se encontró el botón con ID 'refreshBtn'");
  }

  // Carga inicial de servidores después de un pequeño retraso
  setTimeout(loadServers, 100);
});

// Cierra el modal si se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('serverModal');
    if (event.target == modal) {
        closeModal();
    }
}
