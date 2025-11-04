// Función auxiliar para copiar al portapapeles (mantenida por su utilidad)
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
// Configuración de tus servidores
const servers = [
    {
        name: 'SuperLand',
        address: 'SuperLandCity.ddns.net',
        port: 25535,
        type: 'bedrock' // 'java' o 'bedrock'
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
    }
    // Agrega más servidores aquí siguiendo el mismo formato
];
// (Continúa con el resto de la lógica: getServerStatus, cleanMotd, createServerCard, loadServers, y las funciones buscar, limpiarBusqueda y ordenar)
// ...

// Event listeners
document.getElementById('refreshBtn').addEventListener('click', loadServers);

// Auto-actualizar cada 60 segundos
setInterval(loadServers, 60000);

// Cargar servidores al inicio
loadServers();

// ... y el código de las funciones buscar, limpiarBusqueda, ordenar.