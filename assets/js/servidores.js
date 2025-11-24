// --- LISTA DE SERVIDORES ---
const servers = [
  { name:'SuperLand', address:'SuperLandCity.ddns.net', port:25535, type:'bedrock' },
  { name:'GalaxyCraft', address:'GalaxyCraft.ddns.net', port:25567, type:'bedrock' },
  { name:'Del Main', address:'delmain.holynodes.com', port:25535, type:'bedrock' },
  { name:'Astral Pe', address:'play-astral.sytes.net', port:25788, type:'bedrock' },
  { name:'Gola', address:'bedrock.opblocks.com', port:19132, type:'java' }
];


// --- OBTENER ESTADO DE SERVIDOR ---
async function getServerStatus(server) {
  const baseUrl = "https://api.mcsrvstat.us";

  // ✔ API correcta → SIN ":" → usa "/IP/PUERTO"
  const url = server.type === "bedrock"
    ? `${baseUrl}/bedrock/2/${server.address}/${server.port}`
    : `${baseUrl}/2/${server.address}/${server.port}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error consultando API");
    return await res.json();

  } catch (err) {
    console.warn("Error consultando", server.name, err);
    return { online: false };
  }
}


// --- CREAR FILA DE TABLA ---
function createServerRow(server, status) {
  const row = document.createElement("div");
  row.className = "server-row";

  const isOnline = status.online === true;

  // ✔ icono seguro (si no hay → usa uno por defecto)
  const icon = (isOnline && status.icon)
    ? `data:image/png;base64,${status.icon}`
    : "assets/images/Icons/servidores.png";

  // ✔ jugadores
  const players = isOnline ? (status.players?.online || 0) : 0;

  // ✔ versión
  const version = isOnline ? (status.version || "Desconocida") : "—";

  // ✔ ping (si existe)
  const ping = isOnline && status.debug?.ping ? status.debug.ping + " ms" : "—";

  row.innerHTML = `
    <div class="server-icon">
        <img src="${icon}" class="server-icon-img">
    </div>

    <div class="server-info">
        <strong>${server.name}</strong><br>
        <span>IP: ${server.address}</span><br>
        <span>Puerto: ${server.port}</span><br>
        <span>Versión: ${version}</span>
    </div>

    <div class="server-status ${isOnline ? "on" : "off"}">
        ${isOnline ? "🟢 En línea" : "🔴 Offline"}
    </div>

    <div class="server-extra">
        <span>Jugadores: ${isOnline ? players : "—"}</span><br>
        <span>Ping: ${ping}</span>
    </div>
  `;

  return row;
}


// --- CARGAR TABLA COMPLETA ---
async function loadTable() {
  const container = document.getElementById("serversContainer");
  const refresh = document.getElementById("refreshBtn");

  container.innerHTML = "";
  refresh.disabled = true;
  refresh.textContent = "Cargando...";

  for (let server of servers) {

    // Fila temporal mientras carga
    const loadingRow = document.createElement("div");
    loadingRow.className = "server-row loading";
    loadingRow.innerHTML = "Cargando...";
    container.appendChild(loadingRow);

    // Obtener estado real
    const status = await getServerStatus(server);

    // Crear la fila final
    const row = createServerRow(server, status);

    // Reemplazar la fila
    loadingRow.replaceWith(row);
  }

  refresh.disabled = false;
  refresh.textContent = "Actualizar";
}


// --- INICIALIZAR ---
document.addEventListener("DOMContentLoaded", loadTable);
document.getElementById("refreshBtn").addEventListener("click", loadTable);
