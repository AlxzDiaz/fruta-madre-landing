# Fruta Madre · Esencial

Demo del **paquete Esencial** de ALXZ// (desde S/ 450): una landing de una página
con 5 secciones, botón directo a WhatsApp, mapa, horarios y redes. Sin carrito:
el pedido se conversa por WhatsApp. Juguería y desayunos en Puerto Maldonado,
con estilo claro y fresco (crema, coral y verde; tipografía Outfit).

Negocio ficticio (concept project).

## Secciones

1. Inicio · 2. La carta (solo para ver) · 3. Nosotros · 4. Visítanos (horario, dirección, mapa, pagos, redes) · 5. Pedir

## Personalizar para un cliente

- **Textos, carta, fotos y dirección:** directamente en `index.html`.
- **WhatsApp, mensaje y horario:** en `js/config.js`. Para un cliente real pon su número y `demo: false`
  (quita la etiqueta "[Demo ALXZ//]" de los mensajes y el aviso de demo).
- **Colores:** variables al inicio de `css/styles.css`.
- **Tipografías:** alojadas en `fonts/g` (`css/fuentes.css`). Si cambias de tipografía, regenera con
  `herramientas/fuentes-locales.py` (carpeta `demos/herramientas`).

Sin dependencias externas de JavaScript: los íconos son SVG en línea.
