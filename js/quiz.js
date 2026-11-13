// preguntas: true = verdadero, false = falso
var preguntas = [
  { texto: "Las drogas pueden dañar tu salud.", respuesta: true },
  { texto: "El alcohol y el cigarrillo también son drogas.", respuesta: true },
  { texto: "Las drogas ayudan a resolver los problemas.", respuesta: false },
  { texto: "Si un amigo te presiona, tienes que aceptar.", respuesta: false },
  { texto: "Hacer deporte te ayuda a alejarte de las drogas.", respuesta: true }
];

var actual = 0;
var puntos = 0;

function mostrarPantalla(id) {
  document.getElementById("pantallaInicio").classList.add("oculto");
  document.getElementById("pantallaPregunta").classList.add("oculto");
  document.getElementById("pantallaResultado").classList.add("oculto");
  document.getElementById(id).classList.remove("oculto");
}

function mostrarPregunta() {
  document.getElementById("textoProgreso").textContent = "Pregunta " + (actual + 1) + " de " + preguntas.length;
  document.getElementById("textoPuntaje").textContent = "Puntos: " + puntos;
  document.getElementById("textoPregunta").textContent = preguntas[actual].texto;
  
  document.getElementById("btnSiguiente").disabled = true;

  document.getElementById("contenedorOpciones").innerHTML =
    '<button class="boton" onclick="responder(true)">Verdadero</button> ' +
    '<button class="boton" onclick="responder(false)">Falso</button>';
}

function responder(eleccion) {
  if (eleccion == preguntas[actual].respuesta) {
    puntos = puntos + 1;
  }
  // quitamos los botones para que no responda dos veces
  document.getElementById("contenedorOpciones").innerHTML = "Respuesta guardada ✔";
  document.getElementById("textoPuntaje").textContent = "Puntos: " + puntos;
  document.getElementById("btnSiguiente").disabled = false;
}

document.getElementById("btnComenzar").onclick = function () {
  actual = 0;
  puntos = 0;
  mostrarPantalla("pantallaPregunta");
  mostrarPregunta();
};

document.getElementById("btnSiguiente").onclick = function () {
  actual = actual + 1;
  if (actual < preguntas.length) {
    mostrarPregunta();
  } else {
    mostrarPantalla("pantallaResultado");
    var porcentaje = puntos / preguntas.length * 100;
    document.getElementById("circuloPuntaje").textContent = porcentaje + "%";
    document.getElementById("mensajeResultado").textContent =
      "Acertaste " + puntos + " de " + preguntas.length + " preguntas.";
  }
};

document.getElementById("btnReiniciar").onclick = function () {
  mostrarPantalla("pantallaInicio");
};
