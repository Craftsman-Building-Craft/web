// --- SERVIDORES A CONSULTAR ---
const servers = [
  { name:'SuperLand', address:'SuperLandCity.ddns.net', port:25535, type:'bedrock' },
  { name:'GalaxyCraft', address:'GalaxyCraft.ddns.net', port:25567, type:'bedrock' },
  { name:'Del Main', address:'delmain.holynodes.com', port:25535, type:'bedrock' },
  { name:'Astral Pe', address:'play-astral.sytes.net', port:25788, type:'bedrock' },
  { name:'Gola', address:'sdm.hypermine.net', port:25788, type:'java' }
];

// ---  CONSULTA API ---
async function getServerStatus(server) {
  const baseUrl = "https://api.mcsrvstat.us";
  const url =
    server.type === "bedrock"
      ? `${baseUrl}/bedrock/2/${server.address}:${server.port}`
      : `${baseUrl}/2/${server.address}:${server.port}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error de red");
    return await res.json();
  } catch (err) {
    console.warn("No se pudo obtener estado:", server.name);
    return { online: false };
  }
}

// --- CREAR FILA ---
function createServerRow(server, status) {
  const row = document.createElement("div");
  row.className = "server-row";

  const isOnline = status.online === true;
  const icon = (isOnline && status.icon)
    ? `data:image/png;base64,${status.icon}`
    : "assets/images/Icons/servidores.png";

  const players = isOnline ? (status.players?.online || 0) : 0;

  row.innerHTML = `
    <div class="server-icon">
        <img src="${icon}" onerror="this.src='assets/images/Icons/servidores.png'">
    </div>

    <div class="server-info">
        <strong>${server.name}</strong><br>
        <span>IP: ${server.address}</span><br>
        <span>Puerto: ${server.port}</span><br>
    </div>

    <div class="server-status ${isOnline ? "on" : "off"}">
        ${isOnline ? "🟢 En línea" : "🔴 Offline"}
    </div>

    <div class="server-players">
        ${isOnline ? players + " jugadores" : "—"}
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
    // fila temporal
    const loadingRow = document.createElement("div");
    loadingRow.className = "server-row";
    loadingRow.innerHTML = "Cargando...";
    container.appendChild(loadingRow);

    const status = await getServerStatus(server);
    const row = createServerRow(server, status);

    loadingRow.replaceWith(row);
  }

  refresh.disabled = false;
  refresh.textContent = "Actualizar";
}

// Inicializar
document.addEventListener("DOMContentLoaded", loadTable);
document.getElementById("refreshBtn").addEventListener("click", loadTable);
