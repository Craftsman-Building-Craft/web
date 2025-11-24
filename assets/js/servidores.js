const proxy = "https://api.allorigins.win/raw?url=";

// Lista de servidores que quieres mostrar
const servidores = [
    { nombre: "Hypixel", ip: "mc.hypixel.net", puerto: 25565 },
    { nombre: "CubeCraft", ip: "play.cubecraft.net", puerto: 25565 }
];

async function obtenerEstadoServidor(ip, puerto) {
    const api = `https://api.mcsrvstat.us/2/${ip}:${puerto}`;
    const url = proxy + encodeURIComponent(api);

    try {
        const res = await fetch(url);
        const data = await res.json();

        return {
            online: data.online,
            jugadores: data.players?.online ?? 0,
            version: data.version ?? "Desconocida",
            icono: data.icon ? `data:image/png;base64,${data.icon}` : "assets/img/default.png"
        };

    } catch (err) {
        return { online: false };
    }
}

async function cargarServidores() {
    const contenedor = document.getElementById("serversContainer");

    servidores.forEach(async (srv) => {
        const estado = await obtenerEstadoServidor(srv.ip, srv.puerto);

        contenedor.innerHTML += `
            <div class="server-card">
                <img src="${estado.icono}" class="server-icon" />
                <h3>${srv.nombre}</h3>
                <p>IP: ${srv.ip}:${srv.puerto}</p>
                <p>Estado: <span class="${estado.online ? "online" : "offline"}">
                    ${estado.online ? "🟢 Online" : "🔴 Offline"}
                </span></p>
                <p>Versión: ${estado.version}</p>
                <p>Jugadores: ${estado.jugadores}</p>
            </div>
        `;
    });
}

cargarServidores();
