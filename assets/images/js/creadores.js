// Lista simulada de canales (la API real reemplazaría esta parte)
const canales = [
  {
    nombre: "Canal Ejemplo 1",
    foto: "https://i.pravatar.cc/150?img=1",
    url: "https://youtube.com/"
  },
  {
    nombre: "Canal Ejemplo 2",
    foto: "https://i.pravatar.cc/150?img=2",
    url: "https://youtube.com/"
  },
  {
    nombre: "Canal Ejemplo 3",
    foto: "https://i.pravatar.cc/150?img=3",
    url: "https://youtube.com/"
  }
];

// Renderizar canales en la página
const container = document.getElementById("channelsContainer");

canales.forEach(canal => {
  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded-2xl shadow-md flex flex-col items-center";

  card.innerHTML = `
    <img src="${canal.foto}" alt="Foto de perfil" class="w-28 h-28 rounded-full border-4 border-red-600" />
    <h2 class="text-xl font-semibold mt-3">${canal.nombre}</h2>
    <a href="${canal.url}" target="_blank" class="mt-4 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition">Ir al canal</a>
  `;

  container.appendChild(card);
});
