// FORMULARIO DE REGISTRO
document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector("#contacto form");
    if (!formulario) {
        return;
    }

    // Crear un espacio para mostrar mensajes
    const mensaje = document.createElement("div");
    mensaje.id = "mensajeFormulario";
    mensaje.setAttribute("role", "status");
    mensaje.setAttribute("aria-live", "polite");
    mensaje.style.display = "none";
    formulario.appendChild(mensaje);

    // Obtener los campos
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const fechaNacimiento = document.getElementById("fechaNacimiento");

    // Limitar el rango de la fecha de nacimiento
    if (fechaNacimiento) {
        const hoy = new Date();
        const fechaLocal = [
            hoy.getFullYear(),
            String(hoy.getMonth() + 1).padStart(2, "0"),
            String(hoy.getDate()).padStart(2, "0")
        ].join("-");
        fechaNacimiento.max = fechaLocal;
        fechaNacimiento.min = "1900-01-01";
    }

    // Validar y procesar el formulario
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        mensaje.style.display = "none";
        mensaje.className = "";

        // Validación nativa de HTML (required, email, date, max/min, checkbox)
        if (!formulario.reportValidity()) {
            formulario.classList.add("was-validated");
            return;
        }

        // Único caso que el HTML no detecta: nombres con solo espacios
        if (!nombre.value.trim() || !apellido.value.trim()) {
            nombre.focus();
            mostrarMensaje("Por favor, escribe tu nombre y apellido.", false);
            return;
        }

        // Mostrar confirmación
        mostrarMensaje(
            "¡Formulario validado correctamente! Para completar el registro, falta conectar el formulario a un servidor.",
            true
        );
        // No se envían datos ni se guardan en una base de datos.
    });

    // Función para mostrar mensajes
    function mostrarMensaje(texto, correcto) {
        mensaje.textContent = texto;
        mensaje.style.display = "block";
        mensaje.className = correcto
            ? "alert alert-success col-12"
            : "alert alert-danger col-12";
    }
});