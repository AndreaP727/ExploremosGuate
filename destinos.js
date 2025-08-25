    
    
    // Importa Firebase (usa type="module" en tu HTML)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbd_f7ywkzV0RUihNQnTRtP7l8wzvJWYQ",
  authDomain: "exploremos-guatemala.firebaseapp.com",
  projectId: "exploremos-guatemala",
  storageBucket: "exploremos-guatemala.appspot.com",
  messagingSenderId: "797232110559",
  appId: "1:797232110559:web:d5bccd6271869442da426a",
  measurementId: "G-SVN70FN9DL"
};

// Inicializar Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Funciones auxiliares ---
function pintarEstrellas(stars, rating) {
  stars.forEach((s, i) => s.classList.toggle("seleccionada", i < rating));
}

function actualizarInfo(stars, infoEl, votos, suma, userRating) {
  if (userRating) pintarEstrellas(stars, userRating);
  let promedio = votos > 0 ? (suma / votos).toFixed(1) : 0;
  infoEl.innerText = votos > 0
    ? `Promedio: ${promedio} ★ (${votos} votos)`
    : "Aún sin votos";
}

// --- Rating por destino ---
document.querySelectorAll(".destino").forEach(destino => {
  const destinoId = destino.getAttribute("data-id");
  const stars = destino.querySelectorAll(".star");
  const infoEl = destino.querySelector(".info-rating");

  let userRating = null;
  let votos = 0;
  let suma = 0;

  // Cargar datos de Firestore
  (async () => {
    const ref = doc(db, "puntuaciones", destinoId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      votos = snap.data().votos || 0;
      suma = snap.data().suma || 0;
    }
    actualizarInfo(stars, infoEl, votos, suma, userRating);
  })();

  // Evento click en estrellas
  stars.forEach((star, index) => {
    star.addEventListener("click", async () => {
      const rating = index + 1;
      if (userRating) {
        suma -= userRating;
        votos -= 1;
      }
      votos += 1;
      suma += rating;
      userRating = rating;

      const ref = doc(db, "puntuaciones", destinoId);
      await setDoc(ref, { votos, suma });

      actualizarInfo(stars, infoEl, votos, suma, userRating);

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
    });
  });
});



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
    "laguna lachuá": "lachua.html",
    "lachua": "lachua.html",
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