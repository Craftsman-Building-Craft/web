// assets/js/servers.js

const proxy = "https://api.allorigins.win/raw?url=";

// Lista de servidores (edítala)
const servers = [
  { name:'SuperLand', address:'SuperLandCity.ddns.net', port:25535, type:'bedrock' },
  { name:'GalaxyCraft', address:'GalaxyCraft.ddns.net', port:25567, type:'bedrock' },
  { name:'Del Main', address:'delmain.holynodes.com', port:25535, type:'bedrock' },
  { name:'Astral Pe', address:'play-astral.sytes.net', port:25788, type:'bedrock' },
  { name:'Gola', address:'sdm.hypermine.net', port:25788, type:'java' }
  { name:'Hypixel', address:'mc.hypixel.net', port:25565, type:'java' },
  { name:'CubeCraft', address:'play.cubecraft.net', port:25565, type:'java' }
];

// RUTAS DE IMÁGENES
const defaultIcon = "imagenes/servidores.png"; // tu icono por defecto; la ruta que dijiste

// Helpers: construye endpoint mcstatus.io y lo envuelve con proxy
function buildUrl(server) {
  const target = server.type === "java"
    ? `https://api.mcstatus.io/v2/status/java/${server.address}:${server.port}`
    : `https://api.mcstatus.io/v2/status/bedrock/${server.address}:${server.port}`;
  return proxy + encodeURIComponent(target);
}

// Intenta leer diferentes formatos de respuesta (mcstatus, fallback)
function parseStatus(data) {
  const online = !!(data && data.online);
  // players puede estar en data.players.online o data.players.online
  const players = data?.players?.online ?? data?.players?.now ?? (online ? 0 : 0);
  const version = data?.version?.name_raw ?? data?.version?.name ?? data?.software ?? "Desconocida";
  // ping/latency: mcstatus.io puede devolver latency en milisegundos en "latency" o "raw" estructuras.
  const ping = data?.latency ?? data?.raw?.ping ?? data?.debug?.ping ?? "—";
  // icon: mcstatus.io devuelve "icon" base64 en java; bedrock normalmente no
  const icon = data?.icon ?? data?.favicon ?? null;
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

// Crear fila compacta (coincide con tu CSS .server-row)
function createServerRow(server, status) {
  const row = document.createElement("div");
  row.className = "server-row";

  const iconUrl = (status.online && status.icon) ? `data:image/png;base64,${status.icon}` : defaultIcon;

  const left = document.createElement("div");
  left.className = "server-row-left";
  left.innerHTML = `
    <img src="${iconUrl}" onerror="this.src='${defaultIcon}'" class="server-icon-small" />
    <div class="server-info-text">
      <div class="server-name-row">${server.name}</div>
      <div class="server-status-row">
        <span class="dot ${status.online ? 'online' : 'offline'}"></span>
        <span style="color:${status.online ? '#00b894' : '#ff4757'}">
          ${status.online ? 'En Línea' : 'Offline'}
        </span>
        ${status.online ? `<span style='color:#aaa; font-size:.8em'> (${status.players} jug.)</span>` : ''}
      </div>
    </div>
  `;

  const btn = document.createElement("button");
  btn.className = "btn-jugar";
  btn.textContent = "JUGAR";
  btn.addEventListener("click", () => openModal(server, status));

  row.appendChild(left);
  row.appendChild(btn);

  return row;
}

// renderiza lista
async function loadServers() {
  const container = document.getElementById("serversContainer");
  const refresh = document.getElementById("refreshBtn");
  if (!container) { console.error("No hay elemento #serversContainer"); return; }

  container.innerHTML = "";
  refresh.classList.add("spinning");

  for (let s of servers) {
    // fila temporal
    const loading = document.createElement("div");
    loading.className = "server-row";
    loading.innerHTML = `<div class="server-row-left"><div style="width:50px;height:50px;background:#333;border-radius:8px;margin-right:12px;"></div>
                         <div class="server-info-text"><span style="color:#aaa">Cargando ${s.name}...</span></div></div>`;
    container.appendChild(loading);

    const status = await getServerStatus(s);
    const row = createServerRow(s, status);
    loading.replaceWith(row);
  }

  refresh.classList.remove("spinning");
}

// ---------- MODAL (responsive) ----------
const modalOverlay = document.getElementById("serverModal");
const modalName = document.getElementById("modalServerName");
const modalIP = document.getElementById("modalServerIP");
const modalPort = document.getElementById("modalServerPort");
const modalPlayers = document.getElementById("modalPlayers");
const modalPing = document.getElementById("modalPing");
const modalCopyIP = document.getElementById("modalCopyIP");
const modalCopyPort = document.getElementById("modalCopyPort");
const modalActionBtn = document.getElementById("modalActionBtn");
const closeModalBtn = document.getElementById("closeModalBtn");

// abre modal y rellena campos
function openModal(server, status) {
  if (!modalOverlay) return;
  modalName.textContent = server.name;
  modalIP.textContent = server.address;
  modalPort.textContent = server.port;
  modalPlayers.textContent = status.players ?? "—";
  modalPing.textContent = (status.ping !== undefined ? (status.ping + " ms") : "—");

  modalCopyIP.value = server.address;
  modalCopyPort.value = server.port;

  // muestra el overlay
  modalOverlay.style.display = "flex";
  modalOverlay.setAttribute("aria-hidden", "false");
}

// cierra modal
function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.style.display = "none";
  modalOverlay.setAttribute("aria-hidden", "true");
}

// copia texto
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add("copied");
    setTimeout(() => btn.classList.remove("copied"), 1200);
  }).catch(()=> alert("No se pudo copiar"));
}

// listeners modal
if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
if (modalOverlay) modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) closeModal(); });

document.getElementById("copyIpBtn").addEventListener("click", () => copyToClipboard(modalCopyIP.value, document.getElementById("copyIpBtn")));
document.getElementById("copyPortBtn").addEventListener("click", () => copyToClipboard(modalCopyPort.value, document.getElementById("copyPortBtn")));

// botón acción del modal (puedes cambiar su comportamiento)
modalActionBtn.addEventListener("click", () => {
  // ejemplo: abrir enlace de reporte o instrucciones para conectar
  window.open("https://tusitio.com/reportar", "_blank");
});

// refrescar lista
document.getElementById("refreshBtn").addEventListener("click", loadServers);

// iniciar
document.addEventListener("DOMContentLoaded", loadServers);
