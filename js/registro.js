// ===== Registro de personas =====

// Reglas de validación de cada campo
const reglas = {
    nombre:    { regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{2,30}$/, mensaje: "Solo letras, mínimo 2." },
    apellido:  { regex: /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü ]{2,30}$/, mensaje: "Solo letras, mínimo 2." },
    carnet:    { regex: /^\d{5,10}$/,                      mensaje: "Solo números, entre 5 y 10 dígitos." },
    celular:   { regex: /^[67]\d{7}$/,                     mensaje: "8 números, debe empezar con 6 o 7." },
    direccion: { regex: /^.{5,60}$/,                       mensaje: "Mínimo 5 caracteres." }
};

// Caracteres que se eliminan mientras la persona escribe
const filtros = {
    nombre:   /[^A-Za-zÁÉÍÓÚáéíóúÑñÜü ]/g,
    apellido: /[^A-Za-zÁÉÍÓÚáéíóúÑñÜü ]/g,
    carnet:   /\D/g,
    celular:  /\D/g
};

const form = document.getElementById("formRegistro");
const cuerpoTabla = document.getElementById("cuerpoTabla");
const mensajeVacio = document.getElementById("mensajeVacio");
const tabla = document.getElementById("tablaRegistros");

let registros = cargar();

// ----- Guardar y cargar en el navegador -----
function guardar() {
    try {
        localStorage.setItem("registros", JSON.stringify(registros));
    } catch (e) {}
}

function cargar() {
    try {
        return JSON.parse(localStorage.getItem("registros")) || [];
    } catch (e) {
        return [];
    }
}

// ----- Validar un campo -----
function validarCampo(id) {
    const input = document.getElementById(id);
    const error = document.getElementById("error-" + id);
    const valor = input.value.trim();

    if (reglas[id].regex.test(valor)) {
        input.classList.remove("invalido");
        input.classList.add("valido");
        error.textContent = "";
        return true;
    }

    input.classList.remove("valido");
    input.classList.add("invalido");
    error.textContent = reglas[id].mensaje;
    return false;
}

// ----- Bloquear caracteres no permitidos mientras escribe -----
Object.keys(reglas).forEach(function (id) {
    const input = document.getElementById(id);

    input.addEventListener("input", function () {
        if (filtros[id]) {
            input.value = input.value.replace(filtros[id], "");
        }
        validarCampo(id);
    });
});

// ----- Dibujar la tabla con el DOM -----
function mostrarTabla() {
    cuerpoTabla.innerHTML = "";

    registros.forEach(function (persona, i) {
        const fila = document.createElement("tr");

        const datos = [i + 1, persona.nombre, persona.apellido, persona.carnet, persona.celular, persona.direccion];
        datos.forEach(function (dato) {
            const celda = document.createElement("td");
            celda.textContent = dato;
            fila.appendChild(celda);
        });

        const celdaAccion = document.createElement("td");
        const btn = document.createElement("button");
        btn.textContent = "Eliminar";
        btn.className = "btn-eliminar";
        btn.onclick = function () {
            registros.splice(i, 1);
            guardar();
            mostrarTabla();
        };
        celdaAccion.appendChild(btn);
        fila.appendChild(celdaAccion);

        cuerpoTabla.appendChild(fila);
    });

    const hayDatos = registros.length > 0;
    tabla.style.display = hayDatos ? "table" : "none";
    mensajeVacio.style.display = hayDatos ? "none" : "block";
}

// ----- Enviar el formulario -----
form.addEventListener("submit", function (e) {
    e.preventDefault();

    let todoValido = true;
    Object.keys(reglas).forEach(function (id) {
        if (!validarCampo(id)) todoValido = false;
    });

    if (!todoValido) return;

    const carnet = document.getElementById("carnet").value.trim();

    // No permitir carnets repetidos
    const repetido = registros.some(function (p) { return p.carnet === carnet; });
    if (repetido) {
        const input = document.getElementById("carnet");
        input.classList.remove("valido");
        input.classList.add("invalido");
        document.getElementById("error-carnet").textContent = "Este carnet ya está registrado.";
        return;
    }

    registros.push({
        nombre:    document.getElementById("nombre").value.trim(),
        apellido:  document.getElementById("apellido").value.trim(),
        carnet:    carnet,
        celular:   document.getElementById("celular").value.trim(),
        direccion: document.getElementById("direccion").value.trim()
    });

    guardar();
    mostrarTabla();
    form.reset();

    Object.keys(reglas).forEach(function (id) {
        document.getElementById(id).classList.remove("valido", "invalido");
    });
});

mostrarTabla();