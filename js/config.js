/* ==========================================================
   CONFIGURACIÓN · paquete Esencial (landing de una página)
   Los textos, la carta y las fotos están en index.html.
   Aquí solo va lo que usa el JavaScript.
   ========================================================== */
const CONFIG = {
  nombre: "Sabor Amazónico",

  // WhatsApp: código de país + número, sin "+", espacios ni guiones
  whatsapp: "51944870026",
  mensaje: "Hola Sabor Amazónico, quiero hacer un pedido.",
  // Demo del portafolio ALXZ//: marca los mensajes con "[Demo ALXZ//]" y muestra el aviso.
  // Para un cliente real: pon su número arriba y demo: false.
  demo: true,

  // Horario (hora de Perú). dias: 0 = domingo … 6 = sábado
  horarios: [
    { dias: [1, 2, 3, 4, 5, 6], abre: "11:00", cierra: "22:00" },
    { dias: [0], abre: "11:00", cierra: "21:00" },
  ],
};
