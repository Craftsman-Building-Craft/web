// assets/js/servers.js

// Proxy para evitar problemas de CORS al consultar la API de estado
const proxy = "https://api.allorigins.win/raw?url=";

// Lista de servidores (edítala)
const servers = [
  { name:'SuperLand', address:'SuperLandCity.ddns.net', port:25535, type:'bedrock' },
  { name:'GalaxyCraft', address:'GalaxyCraft.ddns.net', port:25567, type:'bedrock' },
  { name:'Del Main', address:'delmain.holynodes.com', port:25535, type:'bedrock' },
  { name:'Astral Pe', address:'play-astral.sytes.net', port:25788, type:'bedrock' },
  { name:'Gola', address:'sdm.hypermine.net', port:25788, type:'java' },
  { name:'Hypixel', address:'mc.hypixel.net', port:25565, type:'java' },
  { name:'CubeCraft', address:'play.cubecraft.net', port:25565, type:'java' }
];

// RUTAS DE IMÁGENES
const defaultIcon = "images/servidores.png"; // Ruta de tu icono por defecto

// -------------------------------------------------------------------
// FUNCIONES DE UTILIDAD (HELPERS)
// -------------------------------------------------------------------

// Construye el endpoint de mcstatus.io y lo envuelve con el proxy
function buildUrl(server) {
  const target = server.type === "java"
    ? `https://api.mcstatus.io/v2/status/java/${server.address}:${server.port}`
    : `https://api.mcstatus.io/v2/status/bedrock/${server.address}:${server.port}`;
  return proxy + encodeURIComponent(target);
}

// Intenta leer diferentes formatos de respuesta y normalizar el estado
function parseStatus(data) {
  const online = !!(data && data.online);
  const players = data?.players?.online ?? data?.players?.now ?? (online ? 0 : 0);
  const version = data?.version?.name_raw ?? data?.version?.name ?? data?.software ?? "Desconocida";
  const ping = data?.latency ?? data?.raw?.ping ?? data?.debug?.ping ?? "—";
  const icon = data?.icon ?? data?.favicon ?? null; // Icono base64
  return { online, players, version, ping, icon };
}

// Obtiene estado del servidor (usa proxy -> mcstatus)
async function getServerStatus(server) {
  const url = buildUrl(server);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error en fetch");
    const data = await res.json();
    return parseStatus(data);
  } catch (err) {
    console.warn("No se pudo consultar:", server.name, err);
    return { online: false, players: 0, version: "—", ping: "—", icon: null };
  }
}

// -------------------------------------------------------------------
// RENDERIZADO DE SERVIDORES
// -------------------------------------------------------------------

// Crear fila compacta (coincide con tu CSS .server-row)
function createServerRow(server, status) {
  const row = document.createElement("div");
  row.className = "server-row";

  // Usar el icono del servidor (si está online y disponible) o el icono por defecto
  const iconUrl = (status.online && status.icon) ? `data:image/png;base64,${status.icon}` : defaultIcon;

  const left = document.createElement("div");
  left.className = "server-row-left";
  left.innerHTML = `
    <img src="${iconUrl}" onerror="this.src='${defaultIcon}'" class="server-icon-small" />
    <div class="server-info-text">
      <div class="server-name-row">${server.name}</div>
      <div class="server-status-row">
        <span class="dot ${status.online ? 'online' : 'offline'}"></span>
        <span style="color:${status.online ? 'var(--color-green-primary)' : 'var(--color-red-primary)'}">
          ${status.online ? 'En Línea' : 'Offline'}
        </span>
        ${status.online 
          ? `<span style='color:#aaa; font-size:.8em'> (${status.players} jug.)</span>` 
          : ''
        }
      </div>
    </div>
  `;

  const btn = document.createElement("button");
  btn.className = "btn-jugar";
  btn.textContent = "JUGAR";
  // Pasa el objeto completo del servidor y su estado a la modal
  btn.addEventListener("click", () => openModal(server, status)); 

  row.appendChild(left);
  row.appendChild(btn);

  return row;
}

// Renderiza la lista completa de servidores
async function loadServers() {
  const container = document.getElementById("serversContainer");
  const refresh = document.getElementById("refreshBtn");
  if (!container || !refresh) { 
      console.error("Faltan elementos HTML necesarios (#serversContainer o #refreshBtn)"); 
      return; 
  }

  container.innerHTML = "";
  refresh.classList.add("spinning");

  for (let s of servers) {
    // 1. Crear y mostrar fila de carga temporal
    const loading = document.createElement("div");
    loading.className = "server-row";
    loading.innerHTML = `
      <div class="server-row-left">
        <div style="width:50px;height:50px;background:#333;border-radius:8px;margin-right:12px;"></div>
        <div class="server-info-text"><span style="color:#aaa">Cargando ${s.name}...</span></div>
      </div>
      <button class="btn-jugar" disabled>JUGAR</button>
    `;
    container.appendChild(loading);

    // 2. Obtener estado real y renderizar
    const status = await getServerStatus(s);
    const row = createServerRow(s, status);
    loading.replaceWith(row); // Reemplazar la fila de carga con la fila final
  }

  refresh.classList.remove("spinning");
}

// -------------------------------------------------------------------
// FUNCIONES DE LA MODAL
// -------------------------------------------------------------------

// Obtener elementos de la modal (debe coincidir con los IDs en tu HTML)
const modalOverlay = document.getElementById("serverModal");
const modalName = document.getElementById("modalServerName");
const modalIP = document.getElementById("modalServerIP");
const modalPort = document.getElementById("modalServerPort");
const modalPlayers = document.getElementById("modalPlayers");
const modalPing = document.getElementById("modalPing");
// Inputs ocultos para la función de copiado
const modalCopyIP = document.getElementById("modalCopyIP");
const modalCopyPort = document.getElementById("modalCopyPort");
// Botones
const closeModalBtn = document.getElementById("closeModalBtn");
const modalActionBtn = document.getElementById("modalActionBtn");
const copyIpBtn = document.getElementById("copyIpBtn");
const copyPortBtn = document.getElementById("copyPortBtn");

// abre modal y rellena campos
function openModal(server, status) {
  if (!modalOverlay) return;
  
  // Rellenar la información visible
  modalName.textContent = server.name;
  modalIP.textContent = server.address;
  modalPort.textContent = server.port;
  modalPlayers.textContent = status.players ?? "—";
  modalPing.textContent = (status.ping !== "—" ? (status.ping + " ms") : "—");

  // Rellenar los inputs ocultos para el copiado
  modalCopyIP.value = server.address;
  modalCopyPort.value = server.port;

  // Muestra el overlay
  modalOverlay.style.display = "flex";
  modalOverlay.setAttribute("aria-hidden", "false");
}

// cierra modal
function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.style.display = "none";
  modalOverlay.setAttribute("aria-hidden", "true");
}

// copia texto al portapapeles y da feedback visual
function copyToClipboard(text, btn) {
    if (!text) return; // No copiar si el texto está vacío
    
    navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.textContent;
        
        btn.textContent = "¡Copiado!";
        btn.classList.add("copied");
        
        // Retrasar la restauración del texto y la clase
        setTimeout(() => {
            btn.textContent = originalText; // Restaurar texto original (e.g., "Copiar IP")
            btn.classList.remove("copied");
        }, 1200);
    }).catch(()=> alert("No se pudo
