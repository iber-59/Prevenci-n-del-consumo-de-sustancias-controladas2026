
const btnMenu = document.getElementById("btnMenu");
const menuPrincipal = document.getElementById("menuPrincipal");

btnMenu.onclick = function () {
    const abierto = menuPrincipal.classList.toggle("abierto");
    btnMenu.classList.toggle("activo", abierto);
    btnMenu.setAttribute("aria-expanded", abierto);
};


menuPrincipal.querySelectorAll("a").forEach(function (enlace) {
    enlace.onclick = function () {
        menuPrincipal.classList.remove("abierto");
        btnMenu.classList.remove("activo");
        btnMenu.setAttribute("aria-expanded", false);
    };
});