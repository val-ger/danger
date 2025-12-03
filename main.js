document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (track && nextBtn && prevBtn) {
        let currentIndex = 0;
        const images = Array.from(track.children);
        const totalImages = images.length;

        const updateCarousel = () => {
            const imageWidth = track.clientWidth;
            track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
        };

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        });

        window.addEventListener('load', updateCarousel);
        window.addEventListener('resize', updateCarousel);
    }

    const searchInput = document.getElementById('buscador-vuelos');
    if (searchInput) {
        const rows = document.querySelectorAll('#tabla-vuelos tr');
        searchInput.addEventListener('keyup', () => {
            const filter = searchInput.value.toLowerCase();
            rows.forEach((row, index) => {
                if (index === 0) return; 
                const destination = row.cells[0].textContent.toLowerCase();
                row.style.display = destination.includes(filter) ? '' : 'none';
            });
        });
    }

    const sections = document.querySelectorAll('.seccion');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
        .hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 1s ease-in-out, transform 1s ease-in-out;
        }
        .visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleSheet);

    const typingElement = document.getElementById("titulo-dinamico");
    if (typingElement) {
        const texto = typingElement.getAttribute("data-texto") || "Bienvenido al Aeropuerto Internacional";
        let i = 0;
        function escribir() {
            if (i < texto.length) {
                typingElement.innerHTML += texto.charAt(i);
                i++;
                setTimeout(escribir, 100);
            }
        }
        escribir();
    }

    const contadores = document.querySelectorAll('.contador');

    const observerContadores = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const contador = entry.target;
                const valorFinal = +contador.getAttribute('data-num');
                let valorActual = 0;
                const incremento = Math.ceil(valorFinal / 200);

                const actualizar = () => {
                    if (valorActual < valorFinal) {
                        valorActual += incremento;
                        contador.innerText = valorActual.toLocaleString();
                        setTimeout(update, 20);
                    } else {
                        contador.innerText = valorFinal.toLocaleString();
                    }
                };
                function update() { actualizar(); }
                actualizar();

                observerContadores.unobserve(contador);
            }
        });
    }, { threshold: 0.5 });

    contadores.forEach(contador => observerContadores.observe(contador));
});
