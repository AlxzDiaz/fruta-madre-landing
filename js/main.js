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

  // Saludo según la hora de Perú
  const hora = ahora.getUTCHours();
  const saludo = document.getElementById("saludo");
  if (saludo) {
    saludo.textContent =
      hora < 11 ? "Buenos días, Puerto Maldonado" :
      hora < 17 ? "¿Calor en Maldonado? Pídelo bien helado" :
      "Para cerrar el día, algo fresco";
  }

  // «¿Qué se te antoja?»: recomienda y resalta un producto de la carta
  const recomendaciones = {
    calor: "Un <b>camu camu bien helado</b>: refresca y tiene muchísima vitamina C.",
    energia: "Un <b>jugo de copoazú</b>: cremoso y llenador, ideal para la mañana.",
    dulce: "Un <b>bowl de açaí y granola</b>: dulce, frío y con fruta.",
  };
  const resultado = document.getElementById("antojo-resultado");
  document.querySelectorAll("[data-antojo]").forEach((b) => {
    b.addEventListener("click", () => {
      const clave = b.dataset.antojo;
      document.querySelectorAll("[data-antojo]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      resultado.innerHTML = recomendaciones[clave];
      document.querySelectorAll(".menu li.resaltado").forEach((li) => li.classList.remove("resaltado"));
      const item = document.querySelector(`[data-antojo-item="${clave}"]`);
      if (item) { void item.offsetWidth; item.classList.add("resaltado"); }
    });
  });

  // Aparición suave al bajar (solo si el sistema no pide reducir movimiento)
  const reducir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const aparecen = document.querySelectorAll(".aparece");
  if (reducir || !("IntersectionObserver" in window)) {
    aparecen.forEach((el) => el.classList.add("visible"));
  } else {
    const io = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    aparecen.forEach((el) => io.observe(el));
  }

  // Bocadillo junto al WhatsApp: aparece una vez por visita y se va al bajar
  const globo = document.getElementById("wa-globo");
  let visto = false;
  try { visto = sessionStorage.getItem("wa-globo") === "1"; } catch (_) { /* sin almacenamiento */ }
  if (globo && !visto) {
    setTimeout(() => {
      globo.classList.add("visible");
      try { sessionStorage.setItem("wa-globo", "1"); } catch (_) { /* sin almacenamiento */ }
      const ocultar = () => { globo.classList.remove("visible"); window.removeEventListener("scroll", alBajar); };
      const inicioY = window.scrollY;
      const alBajar = () => { if (Math.abs(window.scrollY - inicioY) > 300) ocultar(); };
      window.addEventListener("scroll", alBajar, { passive: true });
      setTimeout(ocultar, 9000);
    }, 4000);
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
