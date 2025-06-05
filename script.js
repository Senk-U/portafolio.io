document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".nav-link");

  function mostrarSeccion(hash) {
    const targetId = hash.replace("#", "");
    
    sections.forEach(section => {
      // Reset all sections
      section.classList.remove("active-section");
      section.style.display = "none";
      
      // Show only the target section
      if (section.id === targetId) {
        section.style.display = "block";
        section.classList.add("active-section");
      }
      
      // Special case for hero section
      if (targetId === "inicio" && section.classList.contains("hero")) {
        section.style.display = "flex";
        section.classList.add("active-section");
      }
    });

    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === hash) {
        link.classList.add("active");
      }
    });
  }

  // Cambiar sección al hacer clic
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const hash = link.getAttribute("href");
      history.pushState(null, null, hash);
      mostrarSeccion(hash);
    });
  });

  // Mostrar sección al cargar o al navegar con botones del navegador
  window.addEventListener("load", () => {
    const hash = window.location.hash || "#inicio";
    mostrarSeccion(hash);
    cargarProyectos();
  });

  window.addEventListener("popstate", () => {
    const hash = window.location.hash || "#inicio";
    mostrarSeccion(hash);
  });
});

// Cargar proyectos dinámicamente
async function cargarProyectos() {
  const contenedor = document.getElementById("project-list");
  
  try {
    const respuesta = await fetch("./projects/proyectos.json"); // Cambia la ruta si es necesario
    if (!respuesta.ok) {
      throw new Error(`HTTP error! status: ${respuesta.status}`);
    }
    const proyectos = await respuesta.json();

    if (!Array.isArray(proyectos)) {
      throw new Error("El formato del JSON no es válido");
    }

    proyectos.forEach((proyecto, index) => {
      // Solo muestra proyectos con título
      if (proyecto.titulo) {
        const card = document.createElement("div");
        card.classList.add("project-card", `delay-${index}`);
        card.innerHTML = `
          <h4>${proyecto.titulo}</h4>
          <p>${proyecto.descripcion}</p>
          ${proyecto.tecnologias ? `<p><strong>Tecnologías:</strong> ${proyecto.tecnologias.join(", ")}</p>` : ''}
          ${proyecto.link ? `<a href="${proyecto.link}" target="_blank">Ver proyecto</a>` : ""}
        `;
        contenedor.appendChild(card);
      }
    });
  } catch (error) {
    console.error("Error cargando los proyectos:", error);
    contenedor.innerHTML = `
      <div class="alert alert-warning">
        <p>No se pudieron cargar los proyectos. Error: ${error.message}</p>
        <p>Contenido de ejemplo:</p>
        <div class="project-card">
          <h4>API de Libros</h4>
          <p>API RESTful para gestión de libros con Node.js</p>
          <p><strong>Tecnologías:</strong> Node.js, Express, JavaScript</p>
        </div>
      </div>
    `;
  }
}