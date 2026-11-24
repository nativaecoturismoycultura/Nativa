document.addEventListener("DOMContentLoaded", function () {
  const numero =
    window.NATIVA_CONFIG && window.NATIVA_CONFIG.NATIVA_WHATSAPP
      ? window.NATIVA_CONFIG.NATIVA_WHATSAPP
      : "573214645550";

  // 1. Obtener datos de la página actual
  const rutaCompleta = window.location.pathname;
  const archivo = rutaCompleta.substring(rutaCompleta.lastIndexOf("/") + 1).toLowerCase();
  const pagina = archivo.replace(".html", "");
  const h1Elemento = document.querySelector("h1");
  const tituloReal = h1Elemento ? h1Elemento.innerText.trim() : "";

  const formatearSlug = (slug) =>
    slug.split("-").map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");

  // 2. Rastrear historial de sesión para dar contexto inteligente
  const paginaAnterior = sessionStorage.getItem("nativa_ultima_pagina") || "";
  sessionStorage.setItem("nativa_ultima_pagina", tituloReal || pagina || "Inicio");

  // 3. Definir mensaje base y texto del globo llamativo (Tooltip)
  let mensajeActual = "Hola Nativa, vengo de su sitio web y me gustaría recibir asesoría.";
  let textoGlobo = "¿Necesitas ayuda? Escríbenos";

  if (pagina === "" || pagina === "index") {
    mensajeActual = "Hola Nativa, estoy explorando su página principal y quiero conocer sus experiencias.";
    textoGlobo = "¡Hola! ¿Buscas una ruta o producto?";
  } else if (pagina.startsWith("aliado-")) {
    const nombre = tituloReal || formatearSlug(pagina.replace("aliado-", ""));
    mensajeActual = `Hola Nativa, estoy viendo el perfil de *${nombre}* y me gustaría conectar o reservar.`;
    textoGlobo = `¿Preguntas sobre ${nombre}?`;
  } else if (pagina.startsWith("producto-")) {
    const nombre = tituloReal || formatearSlug(pagina.replace("producto-", ""));
    mensajeActual = `Hola Nativa, me interesa adquirir *${nombre}*. ¿Me confirman disponibilidad y envío?`;
    textoGlobo = `¿Quieres pedir ${nombre}?`;
  } else if (pagina.startsWith("ruta-")) {
    const nombre = tituloReal || `Ruta ${formatearSlug(pagina.replace("ruta-", ""))}`;
    mensajeActual = `Hola Nativa, quiero información sobre fechas y cupos para *${nombre}*.`;
    textoGlobo = `¿Te gustaría vivir esta ruta?`;
  } else if (pagina === "rutas") {
    mensajeActual = "Hola Nativa, estoy viendo sus rutas y quiero ayuda para elegir la ideal para mí.";
    textoGlobo = "¿Te ayudamos a elegir ruta?";
  } else if (pagina === "directorio") {
    mensajeActual = "Hola Nativa, estoy explorando el directorio y busco recomendaciones.";
    textoGlobo = "¿Buscas algún aliado en especial?";
  }

  if (paginaAnterior && paginaAnterior !== (tituloReal || pagina)) {
    mensajeActual += ` (Vengo de ver: ${paginaAnterior}).`;
  }

  // 4. Crear contenedor principal (para botón + globo interactivo)
  const contenedor = document.createElement("div");
  contenedor.className = "whatsapp-widget";

  // Globo de mensaje persuasivo
  const globo = document.createElement("div");
  globo.className = "whatsapp-tooltip";
  globo.innerHTML = `<span>${textoGlobo}</span><button type="button" class="wa-close" aria-label="Cerrar mensaje">&times;</button>`;

  // Botón flotante
  const enlace = document.createElement("a");
  enlace.target = "_blank";
  enlace.rel = "noopener noreferrer";
  enlace.setAttribute("aria-label", "Contactar por WhatsApp");
  enlace.className = "whatsapp-float";
  enlace.innerHTML = `
    <svg width="30" height="30" viewBox="0 0 32 32" fill="currentColor">
      <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.256.59 4.46 1.71 6.404L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.244 1.62h.006c7.058 0 12.796-5.74 12.796-12.8 0-3.42-1.332-6.636-3.75-9.054A12.716 12.716 0 0 0 16.004 3.2zm0 23.34h-.004a10.61 10.61 0 0 1-5.41-1.48l-.388-.23-3.892 1.02 1.04-3.794-.252-.4a10.596 10.596 0 0 1-1.626-5.656c0-5.86 4.768-10.628 10.632-10.628 2.84 0 5.508 1.106 7.516 3.114a10.56 10.56 0 0 1 3.112 7.518c0 5.862-4.768 10.636-10.628 10.636z"/>
    </svg>
  `;

  // Función global para actualizar el mensaje dinámicamente desde cualquier parte de la web
  window.actualizarWhatsApp = function (nuevoMensaje, nuevoGlobo) {
    enlace.href = `https://wa.me{numero}?text=${encodeURIComponent(nuevoMensaje)}`;
    if (nuevoGlobo) {
      globo.querySelector("span").textContent = nuevoGlobo;
      globo.classList.add("visible");
    }
  };

  // Inicializar enlace
  window.actualizarWhatsApp(mensajeActual);

  // 5. Interactividad: Detectar si el usuario hace clic en filtros, categorías o tarjetas
  document.addEventListener("click", function (e) {
    const filtro = e.target.closest("[data-filter], .filter-btn, .tab-btn, .categoria-btn");
    if (filtro) {
      const nombreFiltro = filtro.innerText.trim();
      if (nombreFiltro && nombreFiltro.toLowerCase() !== "todos") {
        window.actualizarWhatsApp(
          `Hola Nativa, estoy filtrando por *${nombreFiltro}* en ${tituloReal || pagina} y me gustaría asesoría.`,
          `¿Te ayudo con ${nombreFiltro}?`
        );
      }
    }
  });

  // Mostrar el globo tras 4 segundos para captar atención sin estorbar al cargar
  setTimeout(() => {
    if (!sessionStorage.getItem("wa_globo_cerrado")) {
      globo.classList.add("visible");
    }
  }, 4000);

  // Permitir cerrar el globo si el usuario quiere despejar la pantalla en móvil
  globo.querySelector(".wa-close").addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    globo.classList.remove("visible");
    sessionStorage.setItem("wa_globo_cerrado", "true");
  });

  contenedor.appendChild(globo);
  contenedor.appendChild(enlace);
  document.body.appendChild(contenedor);
});

