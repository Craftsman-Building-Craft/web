const servers = [
  { name:'SuperLand', address:'SuperLandCity.ddns.net', port:25535, type:'bedrock' },
  { name:'GalaxyCraft', address:'GalaxyCraft.ddns.net', port:25567, type:'bedrock' },
  { name:'Del Main', address:'delmain.holynodes.com', port:25535, type:'bedrock' },
  { name:'Astral Pe', address:'play-astral.sytes.net', port:25788, type:'bedrock' },
  { name:'nmdnkjnkisdnvjsda', address:'bedrock.opblocks.com', port:19132, type:'java' }
];


// ------------------ API NUEVA 100% FUNCIONAL ------------------
async function getServerStatus(server) {
  let url = "";

  if (server.type === "java") {
    url = `https://api.mcstatus.io/v2/status/java/${server.address}:${server.port}`;
  } else {
    url = `https://api.mcstatus.io/v2/status/bedrock/${server.address}:${server.port}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;

  } catch (err) {
    console.warn("Error consultando servidor:", server.name);
    return { online: false };
  }
}


// ------------------ CREAR FILA ------------------
function createRow(server, s) {
  const row = document.createElement("div");
  row.className = "server-row";

  const online = s.online === true;

  // Icono solo para Java (Bedrock no tiene icono)
  let icon = "assets/images/Icons/servidores.png";
  if (online && s.icon) {
    icon = `data:image/png;base64,${s.icon}`;
  }

  const players = online ? (s.players?.online ?? 0) : "—";
  const version = online ? (s.version?.name_raw || s.version?.name || "Desconocida") : "—";
  const ping = online ? (s.latency || "—") + " ms" : "—";

  row.innerHTML = `
    <div class="server-icon"><img src="${icon}" class="server-icon-img"></div>

    <div class="server-info">
      <strong>${server.name}</strong><br>
      <span>IP: ${server.address}</span><br>
      <span>Puerto: ${server.port}</span><br>
      <span>Versión: ${version}</span>
    </div>

    <div class="server-status ${online ? "on" : "off"}">
      ${online ? "🟢 En línea" : "🔴 Offline"}
    </div>

    <div class="server-extra">
      <span>Jugadores: ${players}</span><br>
      <span>Ping: ${ping}</span>
    </div>
  `;

  return row;
}


// ------------------ CARGAR TABLA ------------------
async function loadServers() {
  const cont = document.getElementById("serversContainer");
  cont.innerHTML = "";

  for (const server of servers) {
    const loading = document.createElement("div");
    loading.className = "server-row";
    loading.innerHTML = "Cargando...";
    cont.appendChild(loading);

    const data = await getServerStatus(server);
    const row = createRow(server, data);

    loading.replaceWith(row);
  }
}


// ------------------ INICIAR ------------------
document.addEventListener("DOMContentLoaded", loadServers);
