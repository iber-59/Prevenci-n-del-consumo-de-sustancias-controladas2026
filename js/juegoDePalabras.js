// ===== Componente: juegoDePalabras =====
// Ejercicio de completar palabras sobre la prevención del consumo de drogas

const frases = [
    { antes: "Las drogas dañan tu ",              palabra: "salud",     despues: "." },
    { antes: "Si te presionan, aprende a decir ", palabra: "no",        despues: "." },
    { antes: "El ",                               palabra: "alcohol",   despues: " y el cigarrillo también son drogas." },
    { antes: "Habla con una persona de ",         palabra: "confianza", despues: " si necesitas ayuda." },
    { antes: "Hacer ",                            palabra: "deporte",   despues: " te ayuda a mantener una vida sana." },
    { antes: "El ",                               palabra: "consumo",   despues: " de drogas puede causar dependencia y dañar a tu familia." }
];

const listaFrases = document.getElementById("listaFrases");
const resultado = document.getElementById("resultado");

// Quita tildes y mayúsculas para comparar
function normalizar(texto) {
    return texto.trim().toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Crea las frases con sus campos usando el DOM
function crearEjercicio() {
    listaFrases.innerHTML = "";
    resultado.textContent = "";

    frases.forEach(function (f, i) {
        const fila = document.createElement("div");
        fila.className = "fila-frase";

        const antes = document.createElement("span");
        antes.textContent = f.antes;

        const input = document.createElement("input");
        input.type = "text";
        input.id = "campo" + i;
        input.maxLength = f.palabra.length;
        input.size = f.palabra.length + 1;
        input.placeholder = "_".repeat(f.palabra.length);
        input.autocomplete = "off";
        input.title = f.palabra.length + " letras";

        const despues = document.createElement("span");
        despues.textContent = f.despues;

        fila.appendChild(antes);
        fila.appendChild(input);
        fila.appendChild(despues);
        listaFrases.appendChild(fila);
    });
}

// Revisa cada campo y calcula el puntaje
function comprobar() {
    let aciertos = 0;

    frases.forEach(function (f, i) {
        const input = document.getElementById("campo" + i);
        input.classList.remove("correcto", "incorrecto");

        if (normalizar(input.value) === normalizar(f.palabra)) {
            input.classList.add("correcto");
            aciertos++;
        } else {
            input.classList.add("incorrecto");
        }
    });

    let mensaje;
    if (aciertos === frases.length) {
        mensaje = "🌟 ¡Excelente! Sabes cómo cuidarte.";
    } else if (aciertos >= frases.length / 2) {
        mensaje = "👍 ¡Vas bien! Corrige las palabras en rojo.";
    } else {
        mensaje = "💪 Sigue intentando, revisa la información de la página.";
    }
    resultado.textContent = "Acertaste " + aciertos + " de " + frases.length + ". " + mensaje;
}

document.getElementById("btnComprobar").onclick = comprobar;
document.getElementById("btnReiniciar").onclick = crearEjercicio;

crearEjercicio();