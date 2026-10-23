/* Fruta Madre · Esencial: enlaces de WhatsApp, estado abierto/cerrado y menú móvil */
(function () {
  "use strict";

  // WhatsApp: todos los [data-wa] usan el número y el mensaje de config.js
  const texto = (CONFIG.demo ? "[Demo ALXZ//] " : "") + CONFIG.mensaje;
  const enlace = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
  document.querySelectorAll("[data-wa]").forEach((a) => { a.href = enlace; });

  // Abierto / cerrado según la hora de Perú (UTC-5, sin horario de verano)
  const ahora = new Date(Date.now() - 5 * 3600 * 1000);
  const dia = ahora.getUTCDay();
  const minutos = ahora.getUTCHours() * 60 + ahora.getUTCMinutes();
  const aMin = (h) => { const [hh, mm] = h.split(":").map(Number); return hh * 60 + mm; };
  const fmt = (h) => {
    const [hh, mm] = h.split(":").map(Number);
    const h12 = hh % 12 || 12;
    return `${h12}${mm ? ":" + String(mm).padStart(2, "0") : ""} ${hh < 12 ? "a. m." : "p. m."}`;
  };
  const hoy = CONFIG.horarios.find((h) => h.dias.includes(dia));
  const estado = document.getElementById("estado");
  const punto = document.getElementById("estado-punto");
  if (hoy && estado) {
    const abierto = minutos >= aMin(hoy.abre) && minutos < aMin(hoy.cierra);
    estado.textContent = abierto
      ? `Abierto ahora · hasta las ${fmt(hoy.cierra)}`
      : minutos < aMin(hoy.abre) ? `Abrimos hoy a las ${fmt(hoy.abre)}` : "Cerrado ahora · abrimos mañana";
    punto.classList.toggle("punto--cerrado", !abierto);
  }

  // Jugo del día (mismo día de Perú que el horario)
  const jugo = CONFIG.jugoDelDia && CONFIG.jugoDelDia[dia];
  const caja = document.getElementById("jugo-dia");
  if (jugo && caja) {
    caja.querySelector("[data-fruta]").textContent = jugo.fruta;
    caja.querySelector("[data-precio]").textContent = `S/ ${jugo.precio}`;
    caja.querySelector("[data-antes]").textContent = `S/ ${jugo.antes}`;
  }

  // Menú móvil
  const nav = document.getElementById("nav");
  const boton = document.getElementById("nav-boton");
  const cerrar = () => { nav.classList.remove("abierto"); boton.setAttribute("aria-expanded", "false"); };
  boton.addEventListener("click", () => {
    const abrir = !nav.classList.contains("abierto");
    nav.classList.toggle("abierto", abrir);
    boton.setAttribute("aria-expanded", String(abrir));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", cerrar));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });

  document.getElementById("anio").textContent = new Date().getFullYear();
})();
