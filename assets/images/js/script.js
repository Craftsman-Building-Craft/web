// ======================================================================
// FUNCIONES AUXILIARES (DEBEN SER GLOBALES SI SE USAN EN ONCLICK DEL HTML)
// ======================================================================

/**
 * Función auxiliar para copiar al portapapeles.
 */
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copiado';
        button.classList.add('copied');

        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove('copied');
        }, 2000);
    });
}

// ======================================================================
// CONFIGURACIÓN DE DATOS
// ======================================================================
const servers = [
    {
        name: 'SuperLand',
        address: 'SuperLandCity.ddns.net',
        port: 25535,
        type: 'bedrock'
    },
    {
        name: 'GalaxyCraft',
        address: 'GalaxyCraft.ddns.net',
        port: 25567,
        type: 'bedrock'
    },
    {
        name: 'Del Main',
        address: 'delmain.holynodes.com',
        port: 25535,
        type: 'bedrock'
    },
    {
        name: 'Astral Pe',
        address: 'play-astral.sytes.net',
        port: 25788,
        type: 'bedrock'
    }
    // Agrega más servidores aquí siguiendo el mismo formato
];

// ======================================================================
// LÓGICA PRINCIPAL
// ======================================================================

/**
 * Función para obtener el estado del servidor.
 */
async function getServerStatus(server) {
    try {
        // Usando la API de mcsrvstat.us
        const endpoint = server.type === 'bedrock'
            ? `https://api.mcsrvstat.us/bedrock/3/${server.address}:${server.port}`
            : `https://api.mcsrvstat.us/3/${server.address}:${server.port}`;

        const response = await fetch(endpoint);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(`Error al obtener estado de ${server.name}:`, error);
        return { online: false, error: true };
    }
}

/**
 * Función para limpiar el MOTD (Message of the Day).
 */
function cleanMotd(motd) {
    if (!motd) return 'Sin descripción';
    if (Array.isArray(motd.clean)) {
        return motd.clean.join('\n');
    }
    return motd.clean || motd.raw || 'Sin descripción';
}

/**
 * Función para crear la tarjeta del servidor.
 */
function createServerCard(server, status) {
    const card = document.createElement('div');
    card.className = 'server-card';

    const isOnline = status.online;
    const players = status.players || { online: 0, max: 0 };
    const version = status.version || 'Desconocida';
    const motd = cleanMotd(status.motd);
    const icon = status.icon || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

    card.innerHTML = `
        <div class="server-header">
            <img src="${icon}" alt="${server.name}" class="server-icon" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2264%22 height=%2264%22><rect fill=%22%23ddd%22 width=%2264%22 height=%2264%22/><text x=%2250%%22 y=%2250%%22 text-anchor=%22middle%22 dy=%22.3em%22 font-size=%2224%22 fill=%22%23999%22>MC</text></svg>'">
            <div class="server-title">
                <div class="server-name">
                    ${server.name}
                    ${version ? `<span class="version-badge">${version}</span>` : ''}
                </div>
                <div class="server-address">${server.address}:${server.port}</div>
            </div>
            <div class="status-badge ${isOnline ? 'status-online' : 'status-offline'}">
                <span class="status-indicator"></span>
                ${isOnline ? 'EN LÍNEA' : 'FUERA DE LÍNEA'}
            </div>
        </div>

        ${isOnline ? `
            <div class="server-stats">
                <div class="stat-box">
                    <div class="stat-label">👥 Jugadores</div>
                    <div class="stat-value">${players.online}/${players.max}</div>
                </div>
                <div class="stat-box">
                    <div class="stat-label">📊 Ocupación</div>
                    <div class="stat-value">${players.max > 0 ? Math.round((players.online / players.max) * 100) : 0}%</div>
                </div>
            </div>

            ${status.players && status.players.list && status.players.list.length > 0 ? `
                <div class="players-list">
                    <div class="players-header">
                        🎮 Jugadores conectados (${status.players.list.length}):
                    </div>
                    <div>
                        ${status.players.list.map(player => `<span class="player-tag">${player}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        ` : `
            <div class="error-message">
                ⚠️ El servidor está fuera de línea o no responde
            </div>
        `}

        <div class="copy-section">
            <input type="text" class="copy-input" value="${server.address}" readonly>
            <button class="copy-btn" onclick="copyToClipboard('${server.address}', this)">Copiar IP</button>
        </div>
        <div class="copy-section">
            <input type="text" class="copy-input" value="${server.port}" readonly>
            <button class="copy-btn" onclick="copyToClipboard('${server.port}', this)">Copiar Puerto</button>
        </div>
    `;

    return card;
}

/**
 * Función para cargar todos los servidores y actualizar el DOM.
 */
async function loadServers() {
    const container = document.getElementById('serversContainer');
    const refreshBtn = document.getElementById('refreshBtn');

    if (!container || !refreshBtn) return; // Salir si falta algún elemento

    refreshBtn.classList.add('spinning');
    container.innerHTML = '';

    // Crear tarjetas de carga
    const loadingCards = servers.map(server => {
        const loadingCard = document.createElement('div');
        loadingCard.className = 'server-card';
        loadingCard.innerHTML = `
            <div class="server-header">
                <div class="server-icon" style="background: #ddd;"></div>
                <div class="server-title">
                    <div class="server-name">${server.name}</div>
                    <div class="server-address">${server.address}:${server.port}</div>
                </div>
                <div class="status-badge status-loading">
                    <span class="status-indicator"></span>
                    CONSULTANDO...
                </div>
            </div>
        `;
        container.appendChild(loadingCard);
        return loadingCard;
    });

    // Cargar estado real de cada servidor
    const statusPromises = servers.map(getServerStatus);
    const results = await Promise.all(statusPromises);

    results.forEach((status, i) => {
        const card = createServerCard(servers[i], status);
        loadingCards[i].replaceWith(card);
    });

    refreshBtn.classList.remove('spinning');
}

// ======================================================================
// INICIALIZACIÓN (Se ejecuta una vez que el HTML está completamente cargado)
// ======================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Event listeners
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', loadServers);
    }
    
    // Cargar servidores al inicio
    loadServers();

    // Auto-actualizar cada 60 segundos
    setInterval(loadServers, 60000);
});