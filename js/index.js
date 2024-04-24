import galeriaArte from "./galeria_de_arte.js";
let imgActual = 1; // variable global donde guardo la imagen que estoy visualizando actualmente en la galería

const d = document;

d.addEventListener("DOMContentLoaded", (e) => { // carga del documento HTML (DOM)
    galeriaArte(imgActual, ".carousel-container", ".arrow-left", ".arrow-right", "#btn-gallery", ".close", ".img-dialog");
})