document.addEventListener("DOMContentLoaded", function () {
  // 1. Configura tu número (código de país + número, sin el + ni espacios) y el mensaje
  const telefono = "573001234567"; 
  const mensaje = encodeURIComponent("Hola Nativa, me gustaría recibir más información sobre las rutas.");

  // 2. Crea los estilos del botón (fijo abajo a la derecha)
  const style = document.createElement("style");
  style.innerHTML = `
    .btn-whatsapp-flotante {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 60px;
      height: 60px;
      background-color: #25D366;
      color: #FFF;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      z-index: 9999;
      transition: transform 0.2s ease, background-color 0.2s ease;
    }
    .btn-whatsapp-flotante:hover {
      transform: scale(1.08);
      background-color: #20ba5a;
    }
  `;
  document.head.appendChild(style);

  // 3. Crea el enlace con el ícono SVG de WhatsApp
  const link = document.createElement("a");
  link.href = `https://wa.me/${telefono}?text=${mensaje}`;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.className = "btn-whatsapp-flotante";
  link.setAttribute("aria-label", "Contactar por WhatsApp");
  link.innerHTML = `
    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824z"/>
    </svg>
  `;

  document.body.appendChild(link);
});