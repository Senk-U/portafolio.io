document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".nav-links a");

  function activateSectionOnScroll() {
    let currentSection = null;
    const scrollY = window.scrollY;

    // Recorrer todas las secciones para determinar cuál está más cerca de la parte superior
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Ajustamos el margen superior para activar la sección cuando esté al 30% del viewport
      if (scrollY >= sectionTop - sectionHeight * 0.3) {
        currentSection = section;
      }
    });

    // Limpiar clases anteriores
    sections.forEach((section) => section.classList.remove("active-section"));
    navLinks.forEach((link) => link.classList.remove("active"));

    // Agregar la clase activa a la sección actual y su link
    if (currentSection) {
      currentSection.classList.add("active-section");

      const currentId = currentSection.getAttribute("id");

      const activeLink = document.querySelector(`.nav-links a[href="#${currentId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  }

  // Ejecutar cuando se hace scroll
  window.addEventListener("scroll", activateSectionOnScroll);

  // Ejecutar al cargar la página
  activateSectionOnScroll();
});
