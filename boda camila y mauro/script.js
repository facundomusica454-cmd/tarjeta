(function() {
    'use strict';

    // =========================================
    // 1. CONTADOR REGRESIVO
    // =========================================
    function initCountdown() {
        const countDownDate = new Date('Jan 15, 2027 19:00:00').getTime();
        const countdownEl = document.getElementById('countdown');

        const update = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;

            if (distance < 0) {
                clearInterval(update);
                countdownEl.innerHTML = '<p class="hero-date">¡Ya nos casamos! 🥂</p>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        }, 1000);
    }

    // =========================================
    // 2. ANIMACIONES AL SCROLL (Intersection Observer)
    // =========================================
    function initScrollAnimations() {
        const items = document.querySelectorAll('.story-item, .detail-card, .gallery-item');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = parseInt(entry.target.getAttribute('data-delay')) || 0;
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, delay);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });

        items.forEach(item => observer.observe(item));
    }

    // =========================================
// CONFETI DORADO ELEGANTE (30 segundos)
// =========================================
function initPetals() {
    const container = document.getElementById('petals-container');
    // Limpiamos el contenedor por si ya tiene algo
    container.innerHTML = '';

    // Colores elegantes: dorado, champagne, blanco perlado, morado claro
    const colors = [
        '#D4AF37', // dorado
        '#F0D080', // champagne
        '#FFF8E7', // blanco perlado
        '#E8D5F5', // morado claro
        '#C9A0DC', // lavanda
        '#FFD700'  // oro brillante
    ];

    const numElements = 70; // cantidad de partículas
    const duration = 650; // segundos

    for (let i = 0; i < numElements; i++) {
        const el = document.createElement('div');
        el.className = 'confeti';

        // Tamaño aleatorio entre 6px y 14px
        const size = 6 + Math.random() * 8;
        el.style.width = size + 'px';
        el.style.height = size + 'px';

        // Color aleatorio de la paleta
        el.style.background = colors[Math.floor(Math.random() * colors.length)];

        // Posición horizontal aleatoria
        el.style.left = Math.random() * 100 + '%';

        // Retraso aleatorio entre 0 y 2 segundos (para que no caigan todos a la vez)
        el.style.animationDelay = (Math.random() * 2) + 's';

        // Duración de caída entre 3 y 6 segundos (para variedad)
        const fallDuration = 3 + Math.random() * 3;
        el.style.animationDuration = fallDuration + 's';

        // Rotación inicial aleatoria
        el.style.transform = `rotate(${Math.random() * 360}deg)`;

        // Opacidad aleatoria entre 0.6 y 1
        el.style.opacity = 0.6 + Math.random() * 0.4;

        // Forma de diamante (rombo) con clip-path
        el.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';

        container.appendChild(el);
    }

    // Después de 30 segundos, ocultamos el contenedor con fade out
    setTimeout(() => {
        container.style.transition = 'opacity 1.5s ease';
        container.style.opacity = '0';
        // Opcional: después de la transición, vaciar el contenedor
        setTimeout(() => {
            container.innerHTML = '';
            container.style.opacity = '1'; // restauramos para futuras recargas
        }, 1500);
    }, duration * 1000);
}
    // =========================================
    // 4. RSVP - FORMULARIO
    // =========================================
    function initRSVP() {
        const form = document.getElementById('rsvp-form');
        const successDiv = document.getElementById('rsvp-success');

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const attendance = document.querySelector('input[name="attendance"]:checked');

            if (!name) {
                alert('Por favor, ingresa tu nombre.');
                return;
            }
            if (!attendance) {
                alert('Por favor, indica si vas a asistir.');
                return;
            }

            form.classList.add('hidden');
            successDiv.classList.remove('hidden');
        });
    }
    // =========================================
// COMPARTIR POR WHATSAPP
// =========================================
function initWhatsAppShare() {
    const btn = document.getElementById('whatsapp-share');
    if (!btn) return;

    btn.addEventListener('click', function() {
        const url = window.location.href;
        const message = encodeURIComponent(
            '¡Hola! Te invito a nuestra boda 💜\n\n' +
            'Camilla & Mauro\n' +
            '15 de enero de 2027 · Alto Verde, Tucumán\n\n' +
            'Confirma tu asistencia y entérate de todos los detalles aquí:\n' +
            url
        );
        window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
    });
}
// =========================================
// CONTROL DEL AUDIO (con autoplay al hacer clic)
// =========================================
function initAudio() {
    const audio = document.getElementById('bg-audio');
    const toggleBtn = document.getElementById('audio-toggle');
    let isPlaying = false;

    if (!audio || !toggleBtn) return;

    // Función para iniciar reproducción
    function playAudio() {
        audio.play().then(() => {
            isPlaying = true;
            toggleBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(() => {
            // Si falla, mostramos el botón de play
            toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }

    // Función para pausar
    function pauseAudio() {
        audio.pause();
        isPlaying = false;
        toggleBtn.innerHTML = '<i class="fas fa-play"></i>';
    }

    // Alternar play/pause con el botón
    toggleBtn.addEventListener('click', function() {
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });

    // REPRODUCIR AUTOMÁTICAMENTE AL PRIMER CLIC DEL USUARIO EN CUALQUIER PARTE
    document.addEventListener('click', function playOnFirstClick() {
        if (!isPlaying) {
            playAudio();
        }
        // Eliminamos el evento después del primer clic
        document.removeEventListener('click', playOnFirstClick);
    }, { once: true }); // El evento se ejecuta solo una vez

    // Si el audio termina, lo reiniciamos (por loop)
    audio.addEventListener('ended', function() {
        this.currentTime = 0;
        this.play();
    });
}

    // =========================================
    // 5. INICIALIZAR TODO
    // =========================================
    document.addEventListener('DOMContentLoaded', function() {
        initCountdown();
        initScrollAnimations();
        initPetals();
        initRSVP();
        initWhatsAppShare();
        initAudio();
    });

})();