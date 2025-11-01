// CÓDIGO JAVASCRIPT - script.js

// Función principal de precarga (se mantiene igual)
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const mainContent = document.getElementById('mainContent');

    if (loadingScreen && mainContent) {
        loadingScreen.classList.add('hidden'); 
        loadingScreen.addEventListener('transitionend', () => {
            loadingScreen.style.display = 'none'; 
            mainContent.style.display = 'block'; 
            document.body.style.overflow = 'auto'; 
        }, { once: true });
    }
}

// ... (El código alternativo de carga se mantiene comentado) ...

// Espera a que todo el contenido de la página esté cargado
document.addEventListener('DOMContentLoaded', function() {
  
    const botonesVer = document.querySelectorAll('.boton-ver-imagen');

    // === DEFINICIONES DE HTML DE BOTONES (Las rutas son las clave) ===
    // 1. Ícono de "Ver Fotos" (Debería cargar)
    const verFotosHTML = '<img src="icons/ver-fotos.png" alt="Ver Fotos" class="icono-boton">';
    
    // 2. Ícono de "Ocultar Fotos" (Revisa esta línea si no carga)
    const noVerFotosHTML = '<img src="icons/no-ver-foto.png" alt="Ocultar Fotos" class="icono-boton">';
    // ===============================================

    
    // 1. Inicializa todos los botones para que muestren el ícono "ver-fotos.png"
    botonesVer.forEach(function(boton) {
        // Asumiendo que el botón inicia vacío o con texto que se reemplaza aquí.
        boton.innerHTML = verFotosHTML;
    });


    // 2. Lógica del evento click
    botonesVer.forEach(function(boton) {
        boton.addEventListener('click', function() {
            
            const targetId = boton.dataset.target;
            const targetRow = document.getElementById(targetId);

            if (targetRow) {
                // 3. Revisa si la fila está oculta
                if (getComputedStyle(targetRow).display === 'none') {
                    
                    // Si ESTÁ OCULTA (Acción: Mostrar):
                    targetRow.style.display = 'table-row';
                    
                    // Se usa noVerFotosHTML (si la imagen no carga, es problema de la ruta/nombre)
                    boton.innerHTML = noVerFotosHTML;
                    
                } else {
                    
                    // Si ESTÁ VISIBLE (Acción: Ocultar):
                    targetRow.style.display = 'none';
                    
                    // Se usa verFotosHTML
                    boton.innerHTML = verFotosHTML;
                }
            }
        });
    });
});