function iniciarChatbot() {
  const botonAnterior = document.getElementById("chatToggleButton");
  const ventanaAnterior = document.getElementById("chatWindow");

  if (botonAnterior) botonAnterior.remove();
  if (ventanaAnterior) ventanaAnterior.remove();

  const estilosPosicion = document.createElement("style");
  estilosPosicion.textContent = `
    .chat-toggle-button {
      left: 25px !important;
      right: auto !important;
    }

    .chat-window {
      left: 25px !important;
      right: auto !important;
      transform-origin: bottom left !important;
    }

    @media (max-width: 480px) {
      .chat-toggle-button {
        left: 16px !important;
        right: auto !important;
      }

      .chat-window {
        left: 14px !important;
        right: auto !important;
      }
    }
  `;
  document.head.appendChild(estilosPosicion);

  const chatbotHTML = `
    <button class="chat-toggle-button" id="chatToggleButton" aria-label="Abrir chat">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-hidden="true">
        <path d="M112 0C85.5 0 64 21.5 64 48V96H48c-26.5 0-48 21.5-48 48v96c0 48 21.5 90.3 55.7 119.2c-1.3 4.2-2 8.5-2.2 12.8H0V464c0 26.5 21.5 48 48 48H224c26.5 0 48-21.5 48-48V416h64v48c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48h-1.5c-.2-4.3-.9-8.6-2.2-12.8C490.5 282.3 512 240 512 192V144c0-26.5-21.5-48-48-48H448V48c0-26.5-21.5-48-48-48H112zM384 144v48c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32V144H384z"/>
      </svg>
    </button>

    <div class="chat-window" id="chatWindow">
      <div class="chat-header">EcoBordado Café Asistente</div>

      <div class="chat-messages" id="chatMessages"></div>

      <div class="chat-input-area">
        <input
          type="text"
          id="userInput"
          placeholder="Escribe tu pregunta..."
          aria-label="Mensaje para el asistente"
        >
        <button id="sendButton" aria-label="Enviar mensaje">➤</button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", chatbotHTML);

  const chatToggleButton = document.getElementById("chatToggleButton");
  const chatWindow = document.getElementById("chatWindow");
  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");

  const respuestas = [
    {
      categoria: "Saludo",
      palabras: ["hola", "buenas", "buenos dias", "buenas tardes", "buenas noches", "saludos", "hey"],
      respuesta:
        "¡Hola! 😊 Soy el asistente de EcoBordado Café. Puedo ayudarte con productos, precios, ubicación, pagos, artesanías, talleres y más."
    },
    {
      categoria: "Ayuda",
      palabras: ["ayuda", "puedes hacer", "que puedes", "que sabes", "informacion", "información", "preguntas"],
      respuesta:
        "Puedes preguntarme por nuestros productos, café, panadería, artesanías, precios, pagos, ubicación, misión, visión, talleres o contacto."
    },
    {
      categoria: "Empresa",
      palabras: ["que es ecobordado", "quienes son", "quien es", "empresa", "negocio", "ecobordado cafe"],
      respuesta:
        "EcoBordado Café es una propuesta que combina café artesanal, panadería, bordados y artesanías locales con actividades culturales en Cartago."
    },
    {
      categoria: "Productos",
      palabras: ["productos", "producto", "servicios", "servicio", "venden", "ofrecen", "tienen", "comprar"],
      respuesta:
        "Ofrecemos café artesanal, bebidas especiales, panadería, bordados, artesanías, accesorios y experiencias de Café y Cultura."
    },
    {
      categoria: "Café",
      palabras: ["cafe", "café", "bebida", "bebidas", "capuccino", "capuchino", "espresso", "tinto", "latte"],
      respuesta:
        "Tenemos café tradicional y bebidas especiales preparadas para disfrutar en un ambiente cultural y artesanal."
    },
    {
      categoria: "Panadería",
      palabras: ["pan", "panaderia", "panadería", "postre", "pastel", "torta", "masa madre", "comida"],
      respuesta:
        "También contamos con panadería artesanal y productos para acompañar tu café. Los precios de panadería comienzan desde $4.000 COP."
    },
    {
      categoria: "Artesanías",
      palabras: ["artesania", "artesanía", "bordado", "bordados", "artesano", "artesanos", "regalo", "recuerdo", "bolsa"],
      respuesta:
        "Nuestros bordados y artesanías son elaborados por talento local. Son una excelente opción de regalo y cada compra apoya a la comunidad artesanal."
    },
    {
      categoria: "Precios",
      palabras: ["precio", "precios", "cuanto", "cuánto", "vale", "valor", "costo", "costar", "barato"],
      respuesta:
        "El café tradicional tiene precios desde $4.000 COP, las bebidas especiales desde $8.000 COP, la panadería desde $4.000 COP y las artesanías desde $25.000 COP."
    },
    {
      categoria: "Pagos",
      palabras: ["pago", "pagar", "tarjeta", "efectivo", "nequi", "daviplata", "transferencia", "factura"],
      respuesta:
        "Aceptamos efectivo, tarjetas débito y crédito, transferencias, Nequi y Daviplata. También se puede solicitar factura electrónica."
    },
    {
      categoria: "Ubicación",
      palabras: ["ubicacion", "ubicación", "donde", "dónde", "queda", "direccion", "dirección", "cartago", "llegar"],
      respuesta:
        "EcoBordado Café estará ubicado en el centro histórico de Cartago, Valle del Cauca, Colombia."
    },
    {
      categoria: "Horario",
      palabras: ["horario", "hora", "abren", "cierran", "atienden", "domingo", "lunes", "sabado", "sábado"],
      respuesta:
        "El horario mostrado en la página es de lunes a sábado, de 8:00 a. m. a 7:00 p. m."
    },
    {
      categoria: "Contacto",
      palabras: ["telefono", "teléfono", "correo", "contacto", "whatsapp", "escribir", "mensaje"],
      respuesta:
        "Puedes usar el formulario de la página Contacto. Allí encontrarás el correo, teléfono, horario y ubicación del negocio."
    },
    {
      categoria: "Talleres",
      palabras: ["taller", "talleres", "curso", "aprender", "actividad", "actividades", "evento", "eventos", "cultura"],
      respuesta:
        "EcoBordado Café propone talleres de bordado, encuentros culturales y experiencias de Café y Cultura. Consulta la página de contacto para conocer las próximas actividades."
    },
    {
      categoria: "Pedidos",
      palabras: ["pedido", "pedidos", "domicilio", "envio", "envío", "entrega", "online", "linea", "línea"],
      respuesta:
        "Por ahora puedes consultar directamente por medio de la página Contacto. Más adelante se planea contar con tienda en línea y envíos nacionales."
    },
    {
      categoria: "Misión",
      palabras: ["mision", "misión", "proposito", "propósito", "objetivo"],
      respuesta:
        "Nuestra misión es unir café, artesanía y cultura para apoyar a creadores locales, ofrecer experiencias de calidad y promover el turismo sostenible."
    },
    {
      categoria: "Visión",
      palabras: ["vision", "visión", "futuro", "2030", "meta", "sueño"],
      respuesta:
        "Nuestra visión es ser un referente de turismo cultural y café artesanal en el Valle del Cauca, reconocido por su innovación y apoyo al talento local."
    },
    {
      categoria: "Sostenibilidad",
      palabras: ["sostenible", "sostenibilidad", "ecologico", "ecológico", "ambiente", "medio ambiente", "verde"],
      respuesta:
        "Buscamos promover prácticas sostenibles, valorar los productos locales y apoyar una economía responsable con la comunidad y el entorno."
    },
    {
      categoria: "Despedida",
      palabras: ["adios", "adiós", "chau", "hasta luego", "nos vemos", "gracias"],
      respuesta:
        "¡Gracias por visitar EcoBordado Café! ☕🧵 Esperamos verte pronto."
    }
  ];

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[¿?¡!.,;:]/g, " ");
  }

  function agregarMensaje(texto, tipo, categoria = "") {
    const mensaje = document.createElement("div");
    mensaje.className = `message ${tipo}`;

    if (categoria) {
      const titulo = document.createElement("span");
      titulo.className = "category";
      titulo.textContent = categoria;
      mensaje.appendChild(titulo);
    }

    const contenido = document.createElement("span");
    contenido.textContent = texto;
    mensaje.appendChild(contenido);

    chatMessages.appendChild(mensaje);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function encontrarRespuesta(pregunta) {
    const texto = normalizar(pregunta);
    const palabrasUsuario = texto.split(/\s+/).filter(Boolean);

    if (palabrasUsuario.length <= 2) {
      const saludo = respuestas[0];
      if (saludo.palabras.some((palabra) => texto.includes(normalizar(palabra)))) {
        return saludo;
      }
    }

    let mejorRespuesta = null;
    let mayorPuntaje = 0;

    respuestas.forEach((tema) => {
      let puntaje = 0;

      tema.palabras.forEach((palabra) => {
        if (texto.includes(normalizar(palabra))) {
          puntaje += normalizar(palabra).split(" ").length;
        }
      });

      if (puntaje > mayorPuntaje) {
        mayorPuntaje = puntaje;
        mejorRespuesta = tema;
      }
    });

    if (mejorRespuesta) return mejorRespuesta;

    return {
      categoria: "Ayuda",
      respuesta:
        "No encontré una respuesta exacta. Puedes preguntarme por productos, café, panadería, artesanías, precios, pagos, ubicación, talleres, misión o visión."
    };
  }

  function enviarMensaje() {
    const pregunta = userInput.value.trim();

    if (!pregunta) return;

    agregarMensaje(pregunta, "user");
    userInput.value = "";

    setTimeout(() => {
      const resultado = encontrarRespuesta(pregunta);
      agregarMensaje(resultado.respuesta, "bot", resultado.categoria);
    }, 450);
  }

  chatToggleButton.addEventListener("click", () => {
    chatWindow.classList.toggle("open");

    if (chatWindow.classList.contains("open")) {
      userInput.focus();
    }
  });

  sendButton.addEventListener("click", enviarMensaje);

  userInput.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
      enviarMensaje();
    }
  });

  agregarMensaje(
    "¡Hola! 😊 Soy el asistente de EcoBordado Café. ¿Qué deseas saber?",
    "bot",
    "Bienvenida"
  );
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarChatbot);
} else {
  iniciarChatbot();
}