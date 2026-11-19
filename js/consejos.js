// ===== Consejo del día =====

const consejos = [
    { icono: "🏃", texto: "Haz deporte: mueve tu cuerpo y despeja tu mente." },
    { icono: "🗣️", texto: "Habla con una persona de confianza cuando te sientas mal." },
    { icono: "🚫", texto: "Decir NO a una presión también es ser valiente." },
    { icono: "😴", texto: "Dormir bien te ayuda a tomar mejores decisiones." },
    { icono: "👨‍👩‍👧", texto: "Pasa tiempo con tu familia: te quieren a ti." },
    { icono: "🎨", texto: "Busca un pasatiempo que te guste: música, dibujo o juegos." },
    { icono: "📚", texto: "Infórmate en fuentes confiables antes de decidir." },
    { icono: "🤝", texto: "Rodéate de amigos que te cuiden y te respeten." }
];

const icono = document.getElementById("icono");
const textoConsejo = document.getElementById("textoConsejo");
const btnConsejo = document.getElementById("btnConsejo");

let ultimo = -1;

btnConsejo.onclick = function () {
    // Elegir un consejo distinto al anterior
    let numero;
    do {
        numero = Math.floor(Math.random() * consejos.length);
    } while (numero === ultimo);
    ultimo = numero;

    icono.textContent = consejos[numero].icono;
    textoConsejo.textContent = consejos[numero].texto;

    // Reiniciar la animación
    textoConsejo.classList.remove("cambia");
    void textoConsejo.offsetWidth;
    textoConsejo.classList.add("cambia");

    btnConsejo.textContent = "Otro consejo";
};