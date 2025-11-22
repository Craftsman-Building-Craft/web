// Paso 1: Lista centralizada de creadores (solo necesitas el enlace)
const creadoresLista = [
    { url: "https://youtube.com/@astronautaa29?si=NmG2gA_gFeQDoYO1" },
    { url: "https://www.youtube.com/@LuirryPlus" },
    { url: "https://youtube.com/@soypeche?si=lRYI1DQnHFpyaXK8" },
    { url: "https://youtube.com/@vicmaster_?si=tqErqmgiyAlP4RAb" },
    { url: "https://youtube.com/@thecraftinggamerz1137?si=d3YYkkfWrnDsUAQZ" },
    { url: "https://youtube.com/@andresuly?si=Myq4r0f6Fk8jVY7R" },
    { url: "https://youtube.com/@jahiryt?si=8YReDV6ccmwrOMDM" },
    { url: "https://youtube.com/@elborexd?si=AqhyvSgPADQtolxm" },
    { url: "https://youtube.com/@santialien13?si=QdgND4weCudXkr9p" },
    { url: "https://youtube.com/@jenoob17?si=SqZx0n4jmnl2wVKq" },
    { url: "https://youtube.com/@samurobloxx?si=ny6jnOSE6rH2roru" },
    { url: "https://youtube.com/@imperiocraft_yt?si=6SMB-oVT7MaHbxdO" },
    { url: "https://www.youtube.com/@Miguelcrack230" },
    { url: "https://www.youtube.com/@ManuelJrNavarro" },
    { url: "https://youtube.com/@luichogamera?si=B1z7qVAFmNRlzHV1" },
    { url: "https://youtube.com/@darke_mc?si=O67C5xR-HoPq-tl9" }
];

// Función auxiliar para extraer el handle (@nombre) de la URL
function getChannelHandle(url) {
    const match = url.match(/@([a-zA-Z0-9_-]+)/);
    return match ? match[0] : 'Canal Desconocido';
}

// Paso 2: Función para crear la tarjeta
function createCreatorCard(creador) {
    // Usamos datos de respaldo mientras se cargan los reales
    const nombre = creador.name || getChannelHandle(creador.url);
    const foto = creador.photo || 'assets/images/placeholder.jpg'; // Una imagen por defecto

    const card = document.createElement('div');
    card.className = 'tarjeta-creador';

    card.innerHTML = `
        <img src="${foto}" alt="Foto de ${nombre}" class="perfil-foto">
        <p class="nombre-creador">${nombre}</p>
        <a href="${creador.url}" target="_blank" class="boton-canal">Ir a Canal</a>
    `;
    return card;
}

// Paso 3: Función principal para cargar y renderizar
function loadCreators() {
    const container = document.getElementById('creadoresContainer');
    if (!container) return;

    // 1. Limpia el contenedor
    container.innerHTML = '';

    // 2. Itera sobre la lista y renderiza las tarjetas con datos de respaldo
    creadoresLista.forEach(creador => {
        const card = createCreatorCard(creador);
        container.appendChild(card);

        // 3. ⚠️ Simulación de actualización automática (REQUIERE BACKEND/PROXY)
        // Aquí es donde intentarías llamar a tu API de YouTube para obtener 
        // el nombre y la foto más recientes y actualizar la tarjeta.

        // Ejemplo de cómo se vería una actualización, si la tuvieras:
        // fetch(`https://tu-servidor.com/api/youtube/data?url=${creador.url}`)
        //    .then(res => res.json())
        //    .then(data => {
        //        // Actualizar la tarjeta en el DOM
        //        card.querySelector('.perfil-foto').src = data.profilePictureUrl;
        //        card.querySelector('.nombre-creador').textContent = data.channelName;
        //    });
    });
}

// Llama a la función al cargar la página
document.addEventListener('DOMContentLoaded', loadCreators);