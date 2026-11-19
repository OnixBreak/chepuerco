
// ELEMENTOS
const container = document.querySelector('.glitch-container');
const subtitle = document.querySelector('.brand-subtitle');

const text = "Da click en el botón para ver la plantilla...";
const element = document.getElementById("typewriter");
const links = document.querySelectorAll(".hero-links a");

let index = 0;


// 1. EFECTO GLITCH
function randomGlitch() {

    container.classList.add('active');

    setTimeout(() => {
        container.classList.remove('active');
    }, 250);

    const nextGlitch = Math.random() * 2000 + 1000;

    setTimeout(randomGlitch, nextGlitch);
}


// 2. MÁQUINA DE ESCRIBIR
function typeWriter() {

    if (index < text.length) {

        element.textContent += text.charAt(index);
        index++;

        setTimeout(typeWriter, 20);

    } else {

        setTimeout(showLinks, 500);

    }
}


// 3. APARICIÓN DE LINKS
function showLinks() {

    links.forEach((link, i) => {

        setTimeout(() => {
            link.classList.add("show");
        }, i * 400);

    });

}


// 4. SECUENCIA DE PRESENTACIÓN
function startPresentation() {

    // Aparece DIGITAL SOLUTIONS
    setTimeout(() => {
        subtitle.classList.add("show");
    }, 500);

    // Aparece el logotipo
    setTimeout(() => {

        container.classList.add("show");

        // Comienza el glitch
        setTimeout(randomGlitch, 800);

        // Comienza la máquina de escribir
        setTimeout(typeWriter, 1200);

    }, 1500);

}


// Esperar a que cargue todos los componentes para iniciar la animación.
window.addEventListener('load', async () => {

    await document.fonts.ready;

    document.querySelector('.hero').classList.add('loaded');

    startPresentation();

});
