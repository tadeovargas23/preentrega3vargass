// Función para cargar estudiantes desde el almacenamiento local
function cargarEstudiantes() {
    const estudiantesJSON = localStorage.getItem("estudiantes");
    if (estudiantesJSON) {
        return JSON.parse(estudiantesJSON);
    } else {
        return [];
    }
}

// Función para guardar estudiantes en el almacenamiento local
function guardarEstudiantes(estudiantes) {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

const estudiantes = cargarEstudiantes();

function agregarEstudiante() {
    const nombreInput = document.getElementById("nombre");
    const apellidoInput = document.getElementById("apellido"); // Nuevo
    const edadInput = document.getElementById("edad");
    const calificacionesInput = document.getElementById("calificaciones");

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value; // Nuevo
    const edad = parseInt(edadInput.value);
    const calificacionesStr = calificacionesInput.value;
    const calificaciones = calificacionesStr.split(",").map(calificacion => parseInt(calificacion));
    
    const estudiante = {
        nombre: nombre,
        apellido: apellido, // Nuevo
        edad: edad,
        calificaciones: calificaciones
    };
    estudiantes.push(estudiante);
    guardarEstudiantes(estudiantes);
    actualizarResultados();
    nombreInput.value = "";
    apellidoInput.value = ""; // Nuevo
    edadInput.value = "";
    calificacionesInput.value = "";
}

function actualizarResultados() {
    const resultadosDiv = document.getElementById("resultados");
    resultadosDiv.innerHTML = "";
    estudiantes.forEach(estudiante => {
        const estudianteDiv = document.createElement("div");
        estudianteDiv.classList.add("resultado"); // Nuevo
        estudianteDiv.innerHTML = `
            <p>Nombre: ${estudiante.nombre} ${estudiante.apellido}</p> <!-- Modificado -->
            <p>Edad: ${estudiante.edad}</p>
            <p>Calificaciones: ${estudiante.calificaciones.join(", ")}</p>
        `;
        resultadosDiv.appendChild(estudianteDiv);
    });
}

document.getElementById("agregar-btn").addEventListener("click", agregarEstudiante);

// Al cargar la página, actualizar los resultados
window.addEventListener("load", actualizarResultados);
