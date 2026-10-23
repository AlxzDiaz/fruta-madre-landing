/* ==========================================================
   CONFIGURACIÓN · paquete Esencial (landing de una página)
   Los textos, la carta y las fotos están en index.html.
   Aquí solo va lo que usa el JavaScript.
   ========================================================== */
const CONFIG = {
  nombre: "Fruta Madre",

  // WhatsApp: código de país + número, sin "+", espacios ni guiones
  whatsapp: "51944870026",
  mensaje: "Hola Fruta Madre, quiero hacer un pedido.",
  // Demo del portafolio ALXZ//: marca los mensajes con "[Demo ALXZ//]" y muestra el aviso.
  // Para un cliente real: pon su número arriba y demo: false.
  demo: true,

  // Jugo del día: cambia solo según el día (0 = domingo … 6 = sábado). precio = precio de oferta
  jugoDelDia: [
    { fruta: "Surtido de la casa", precio: 8, antes: 9 },
    { fruta: "Copoazú", precio: 7, antes: 8 },
    { fruta: "Camu camu", precio: 6, antes: 7 },
    { fruta: "Cocona con piña", precio: 6, antes: 7 },
    { fruta: "Aguaje", precio: 6, antes: 7 },
    { fruta: "Papaya", precio: 5, antes: 6 },
    { fruta: "Copoazú", precio: 7, antes: 8 },
  ],

  // Horario (hora de Perú). dias: 0 = domingo … 6 = sábado
  horarios: [
    { dias: [1, 2, 3, 4, 5, 6], abre: "07:00", cierra: "21:00" },
    { dias: [0], abre: "07:00", cierra: "13:00" },
  ],
};
