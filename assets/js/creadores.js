/**
 * Datos de los Creadores de Contenido
 * Almacenados como objetos para fácil manejo.
 */
const creadoresData = [
  {
    nombre: "Astronauta29",
    foto: "assets/images/FotosdePerfil/astronauta29.jpg",
    canalUrl: "https://youtube.com/@astronautaa29?si=NmG2gA_gFeQDoYO1"
  },
  {
    nombre: "LuirryPlus",
    foto: "assets/images/FotosdePerfil/LuirryPlus.jpg",
    canalUrl: "https://www.youtube.com/@LuirryPlus"
  },
  {
    nombre: "SoyPeche",
    foto: "assets/images/FotosdePerfil/soypeche.jpg",
    canalUrl: "https://youtube.com/@soypeche?si=lRYI1DQnHFpyaXK8"
  },
  {
    nombre: "VicMaster",
    foto: "assets/images/FotosdePerfil/vicmaster.jpg",
    canalUrl: "https://youtube.com/@vicmaster_?si=tqErqmgiyAlP4RAb"
  },
  {
    nombre: "The Crafting Gamer Z",
    foto: "assets/images/FotosdePerfil/TheCraftingGamerZ.jpg",
    canalUrl: "https://youtube.com/@thecraftinggamerz1137?si=d3YYkkfWrnDsUAQZ"
  },
  {
    nombre: "Andrés Games",
    foto: "assets/images/FotosdePerfil/AndrésGames.jpg",
    canalUrl: "https://youtube.com/@andresuly?si=Myq4r0fFk8jVY7R"
  },
  {
    nombre: "Jahir YT",
    foto: "assets/images/FotosdePerfil/JahirYT.jpg",
    canalUrl: "https://youtube.com/@jahiryt?si=8YReDV6ccmwrOMDM"
  },
  {
    nombre: "El Bore",
    foto: "assets/images/FotosdePerfil/ElBore.jpg",
    canalUrl: "https://youtube.com/@elborexd?si=AqhyvSgPADQtolxm"
  },
  {
    nombre: "SantiAlien 13",
    foto: "assets/images/FotosdePerfil/SantiAlien13.jpg",
    canalUrl: "https://youtube.com/@santialien13?si=QdgND4weCudXkr9p"
  },
  {
    nombre: "Jenoob 17",
    foto: "assets/images/FotosdePerfil/Jenoob17.jpg",
    canalUrl: "https://youtube.com/@jenoob17?si=SqZx0n4jmnl2wVKq"
  },
  {
    nombre: "Samu King",
    foto: "assets/images/FotosdePerfil/SamuKing.jpg",
    canalUrl: "https://youtube.com/@samurobloxx?si=ny6jnOSE6rH2roru"
  },
  {
    nombre: "Imperio Craft",
    foto: "assets/images/FotosdePerfil/ImperioCraft.jpg",
    canalUrl: "https://youtube.com/@imperiocraft_yt?si=6SMB-oVT7MaHbxdO"
  },
  {
    nombre: "Miguelcrack",
    foto: "assets/images/FotosdePerfil/MiguelCrack.jpg",
    canalUrl: "https://www.youtube.com/@Miguelcrack230"
  },
  {
    nombre: "Manuel Jr Navarro",
    foto: "assets/images/FotosdePerfil/ManuelJrNavarro.jpg",
    canalUrl: "https://www.youtube.com/@ManuelJrNavarro"
  },
  {
    nombre: "Luicho Gamera",
    foto: "assets/images/FotosdePerfil/LuichoGamera.jpg",
    canalUrl: "https://youtube.com/@luichogamera?si=B1z7qVAFmNRlzHV1"
  },
  {
    nombre: "Darke_mc",
    foto: "assets/images/FotosdePerfil/Darke_mc.jpg",
    canalUrl: "https://youtube.com/@darke_mc?si=O67C5xR-HoPq-tl9"
  }
];

// Función para generar las tarjetas de creadores
function renderCreators() {
  const container = document.getElementById('creadoresContainer');

  if (!container) {
    console.error('El contenedor con id="creadoresContainer" no se encontró.');
    return;
  }

  // Mapea los datos a un array de strings HTML
  const cardsHtml = creadoresData.map(creator => {
    // Usa template literals (backticks) para construir el HTML
    return `
      <div class="tarjeta-creador">
        <img src="${creator.foto}" alt="Foto de Creador ${creator.nombre}" class="perfil-foto">
        <p class="nombre-creador">${creator.nombre}</p>
        <a href="${creator.canalUrl}" target="_blank" class="boton-canal">Ir a Canal</a>
      </div>
    `;
  }).join(''); // Une todos los strings de tarjetas en uno solo

  // Inserta el HTML generado en el contenedor
  container.innerHTML = cardsHtml;
}

// Ejecuta la función una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', renderCreators);
