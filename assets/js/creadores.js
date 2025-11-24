const creadores = [
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
    nombre: "Andres Games",
    imagen: "./assets/images/FotosdePerfil/AndrésGames.jpg",
    link: "https://youtube.com/@andresuly"
  },
  {
    nombre: "Jahir YT",
    imagen: "./assets/images/FotosdePerfil/JahirYT.jpg",
    link: "https://youtube.com/@jahiryt"
  }
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
