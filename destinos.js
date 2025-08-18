    document.querySelectorAll('.destino').forEach(destino => {
      const destinoId = destino.getAttribute("data-id");
      const stars = destino.querySelectorAll(".star");
      const infoEl = destino.querySelector(".info-rating");

      // Cargar datos guardados
      let votos = parseInt(localStorage.getItem(destinoId + "_votos")) || 0;
      let suma = parseInt(localStorage.getItem(destinoId + "_suma")) || 0;
      let userRating = localStorage.getItem(destinoId + "_userRating");

      // Calcular y mostrar promedio inicial
      actualizarInfo(stars, infoEl, votos, suma, userRating);

      // Evento click en estrellas
      stars.forEach((star, index) => {
        star.addEventListener("click", () => {
          const rating = index + 1;

          // Si ya había votado, restamos su voto anterior
          if (userRating) {
            suma -= parseInt(userRating);
            votos -= 1;
          }

          // Guardamos nuevo voto
          votos += 1;
          suma += rating;
          userRating = rating;

          // Guardar en localStorage
          localStorage.setItem(destinoId + "_votos", votos);
          localStorage.setItem(destinoId + "_suma", suma);
          localStorage.setItem(destinoId + "_userRating", rating);

          // Actualizar visual
          actualizarInfo(stars, infoEl, votos, suma, userRating);
        });
      });
    });

    // Función para mostrar estrellas, votos y promedio
    function actualizarInfo(stars, infoEl, votos, suma, userRating) {
      if (userRating) {
        pintarEstrellas(stars, userRating);
      }

      let promedio = votos > 0 ? (suma / votos).toFixed(1) : 0;
      infoEl.innerText = votos > 0 
        ? `Promedio: ${promedio} ★ (${votos} votos)` 
        : "Aún sin votos";
    }

    // Función para pintar estrellas
    function pintarEstrellas(stars, rating) {
      stars.forEach((s, i) => {
        s.classList.toggle("seleccionada", i < rating);
      });
    }


    //Buscador 
document.addEventListener("DOMContentLoaded", () => {
  const formBuscador = document.getElementById("form-buscador");
  const inputBuscador = document.getElementById("buscador");

  // Mapa de destinos: palabra clave → URL
  const mapaDestinos = {
    "acatenango": "acatenango.html",
    "volcán acatenango": "acatenango.html",
    "pacaya": "pacaya.html",
    "volcán pacaya": "pacaya.html",
    "parapente": "parapente.html",
    "parapente en atitlán": "parapente.html",
    "rafting": "raffting.html",
    "raffting": "raffting.html",
    "rafting río cahabón": "raffting.html",
    "grutas": "grutas.html",
    "grutas del rey marcos": "grutas.html",
    "antigua": "antigua.html",
    "antigua guatemala": "antigua.html",
    "tikal": "tikal.html",
    "el mirador": "tikal.html",
    "quirigua": "quirigua.html",
    "livingston": "quirigua.html",
    "semuc champey": "semuc.html",
    "laguna lachuá": "semuc.html",
    "cráter azul": "crater.html",
    "laguna magdalena": "lagunamagdalena.html",
    "chilascó": "chilasco.html"
  };

  formBuscador.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita recargar la página
    const texto = inputBuscador.value.toLowerCase().trim();

    let encontrado = false;

    // Buscar coincidencia exacta o parcial
    for (let key in mapaDestinos) {
      if (key.includes(texto) || texto.includes(key)) {
        const url = mapaDestinos[key];
        if (url && url !== "#") {
          window.location.href = url; // Redirige a la página
          encontrado = true;
          break;
        }
      }
    }

    if (!encontrado) {
      alert("❌ No se encontró el destino.");
    }
  });
});