// Variable 'creadores' corregida (es un array de objetos, NO un array de arrays)
const creadores = 
  {
    nombre: "Astronauta29",
    imagen: "./assets/images/FotosdePerfil/astronauta29.jpg",
    link: "https://youtube.com/@astronautaa29"
  },
  {
    nombre: "LuirryPlus",
    imagen: "./assets/images/FotosdePerfil/LuirryPlus.jpg",
    link: "https://www.youtube.com/@LuirryPlus"
  },
  {
    nombre: "SoyPeche",
    imagen: "./assets/images/FotosdePerfil/soypeche.jpg",
    link: "https://youtube.com/@soypeche"
  },
  {
    nombre: "VicMaster",
    imagen: "./assets/images/FotosdePerfil/vicmaster.jpg",
    link: "https://youtube.com/@vicmaster_"
  },
  {
    nombre: "The Crafting Gamer Z",
    imagen: "./assets/images/FotosdePerfil/TheCraftingGamerZ.jpg",
    link: "https://youtube.com/@thecraftinggamerz1137"
  },
  {
    nombre: "Andrés Games",
    imagen: "./assets/images/FotosdePerfil/AndrésGames.jpg",
    link: "https://youtube.com/@andresuly"
  },
  {
    nombre: "Jahir YT",
    imagen: "./assets/images/FotosdePerfil/JahirYT.jpg",
    link: "https://youtube.com/@jahiryt"
  },
  {
    nombre: "El Bore",
    imagen: "./assets/images/FotosdePerfil/ElBore.jpg",
    link: "https://youtube.com/@elborexd"
  },
  {
    nombre: "SantiAlien 13",
    imagen: "./assets/images/FotosdePerfil/SantiAlien13.jpg",
    link: "https://youtube.com/@santialien13"
  },
  {
    nombre: "Jenoob 17",
    imagen: "./assets/images/FotosdePerfil/Jenoob17.jpg",
    link: "https://youtube.com/@jenoob17"
  },
  {
    nombre: "Samu King",
    imagen: "./assets/images/FotosdePerfil/SamuKing.jpg",
    link: "https://youtube.com/@samurobloxx"
  },
  {
    nombre: "Imperio Craft",
    imagen: "./assets/images/FotosdePerfil/ImperioCraft.jpg",
    link: "https://youtube.com/@imperiocraft_yt"
  },
  {
    nombre: "Miguelcrack",
    imagen: "./assets/images/FotosdePerfil/MiguelCrack.jpg",
    link: "https://www.youtube.com/@Miguelcrack230"
  },
  {
    nombre: "Manuel Jr Navarro",
    imagen: "./assets/images/FotosdePerfil/ManuelJrNavarro.jpg",
    link: "https://www.youtube.com/@ManuelJrNavarro"
  },
  {
    nombre: "Luicho Gamera",
    imagen: "./assets/images/FotosdePerfil/LuichoGamera.jpg",
    link: "https://youtube.com/@luichogamera"
  },
  {
    nombre: "Darke_mc",
    imagen: "./assets/images/FotosdePerfil/Darke_mc.jpg",
    link: "https://youtube.com/@darke_mc"
  }
;

const creadores =
  {
    nombre: "Astronauta29",
    imagen: "./assets/images/FotosdePerfil/astronauta29.jpg",
    link: "https://youtube.com/@astronautaa29"
  },
  // ... todos los demás objetos de creadores ...
];

function cargarCreadores() {
  const container = document.querySelector(".grid-creadores");
  container.innerHTML = "";

  creadores.forEach(c => {
    const card = document.createElement("div");
    card.className = "tarjeta-creador";

    card.innerHTML = `
      <img src="${c.imagen}" class="perfil-foto">
      <p class="nombre-creador">${c.nombre}</p>
      <a href="${c.link}" target="_blank" class="boton-canal">Ir a Canal</a>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", cargarCreadores);
