/* ============================================================
   ELLOS PARA ELLAS — JOAS | JavaScript
   Animaciones, interactividad y efectos visuales
   ============================================================ */

// ============================================================
// 1. FONDO DE FLORES FLOTANTES
//    Genera flores decorativas que suben desde abajo
// ============================================================
(function initFloatingFlowers() {
  const bg = document.getElementById('floatingBg');
  const flowers = ['✿', '❀', '🌸', '🌹', '🌷', '🌺', '🌻', '🪷'];

  for (let i = 0; i < 25; i++) {
    const span = document.createElement('span');
    span.textContent = flowers[Math.floor(Math.random() * flowers.length)];
    span.style.left = Math.random() * 100 + '%';
    span.style.fontSize = (1.2 + Math.random() * 2.5) + 'rem';
    span.style.animationDuration = (12 + Math.random() * 20) + 's';
    span.style.animationDelay = (Math.random() * 15) + 's';
    bg.appendChild(span);
  }
})();


// ============================================================
// 2. NAVBAR — Efecto de scroll
//    Agrega la clase 'scrolled' al hacer scroll > 80px
// ============================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', function() {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});


// ============================================================
// 3. NAVBAR MÓVIL — Menú hamburguesa
//    Abre/cierra el menú en dispositivos móviles
// ============================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', function() {
  navLinks.classList.toggle('open');
  navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

// Cierra el menú al hacer clic en un enlace
document.querySelectorAll('#navLinks a').forEach(function(link) {
  link.addEventListener('click', function() {
    navLinks.classList.remove('open');
    navToggle.textContent = '☰';
  });
});


// ============================================================
// 4. INVITACIÓN — Sobre que se abre al hacer clic
//    Alterna entre el sello (cerrado) y el contenido (abierto)
//    Con efecto tilt 3D cuando está abierto
// ============================================================
const inviteCard = document.getElementById('inviteCard');
const inviteSeal = document.getElementById('inviteSeal');
const inviteContent = document.getElementById('inviteContent');
const inviteSparkles = document.getElementById('inviteSparkles');

if (inviteCard) {
  // Toggle al hacer clic
  inviteCard.addEventListener('click', function(e) {
    // Si se hizo clic en un enlace dentro del contenido, no togglear
    if (e.target.closest('a')) return;

    const isOpen = inviteCard.classList.contains('open');

    if (!isOpen) {
      // Abrir el sobre
      inviteCard.classList.add('open');
      launchSparkles();

      // Activar tilt 3D después de abrir
      setTimeout(function() {
        inviteCard.classList.add('tilt-active');
      }, 700);

    } else {
      // Solo cerrar si se hizo clic en el hint o fuera del contenido
      if (e.target.closest('.invite-toggle-hint') || !e.target.closest('.invite-content')) {
        inviteCard.classList.remove('open');
        inviteCard.classList.remove('tilt-active');
        inviteCard.style.transform = '';
      }
    }
  });

  // Efecto tilt 3D cuando está abierto
  inviteCard.addEventListener('mousemove', function(e) {
    if (!inviteCard.classList.contains('tilt-active')) return;
    const rect = inviteCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / centerY * -10;
    const rotateY = (x - centerX) / centerX * 10;
    inviteCard.style.transform =
      'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) scale3d(1.02, 1.02, 1.02)';
  });

  inviteCard.addEventListener('mouseleave', function() {
    if (inviteCard.classList.contains('tilt-active')) {
      inviteCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  });
}

// Partículas que salen al abrir el sobre
function launchSparkles() {
  const container = inviteSparkles;
  container.innerHTML = '';
  const emojis = ['💖', '✨', '🌸', '🌹', '🦋', '💫', '🌟'];

  for (let i = 0; i < 20; i++) {
    const el = document.createElement('span');
    el.className = 'invite-sparkle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    const angle = (Math.PI * 2 / 20) * i + (Math.random() - 0.5) * 0.5;
    const dist = 80 + Math.random() * 100;
    el.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
    el.style.animationDelay = (Math.random() * 0.3) + 's';
    el.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
    container.appendChild(el);
  }

  setTimeout(function() {
    container.innerHTML = '';
  }, 1500);
}


// ============================================================
// 5. SCROLL REVEAL — Animación al hacer scroll
//    Las secciones aparecen suavemente al entrar en pantalla
// ============================================================
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});


// ============================================================
// 6. VIRTUDES — Cards interactivas con clic
//    Al hacer clic se expanden mostrando el texto oculto
// ============================================================
document.querySelectorAll('.virtue-card').forEach(function(card) {
  card.addEventListener('click', function() {
    const wasActive = this.classList.contains('active');

    // Cierra todas las cards
    document.querySelectorAll('.virtue-card').forEach(function(c) {
      c.classList.remove('active');
    });

    // Si no estaba activa, la activamos
    if (!wasActive) {
      this.classList.add('active');
    }
  });
});


// ============================================================
// 7. FLORES — Galería interactiva con clic
//    Al hacer clic en una flor se muestra su significado
//    con énfasis en un panel inferior
// ============================================================
const flowerItems = document.querySelectorAll('.flower-item');
const feEmoji = document.getElementById('feEmoji');
const feTitle = document.getElementById('feTitle');
const feSub = document.getElementById('feSub');
const feBox = document.getElementById('flowerEmphasis');

// Datos de cada flor
const flowerData = {
  rosa: {
    emoji: '🌹',
    title: 'Rosa',
    sub: 'Amor y belleza eterna — como el amor que mereces recibir'
  },
  tulipan: {
    emoji: '🌷',
    title: 'Tulipán',
    sub: 'Gracia y elegancia — tu porte cautiva sin palabras'
  },
  cerezo: {
    emoji: '🌸',
    title: 'Cerezo',
    sub: 'Renovación y esperanza — cada día floreces de nuevo'
  },
  girasol: {
    emoji: '🌻',
    title: 'Girasol',
    sub: 'Fortaleza y lealtad — siempre en busca de la luz'
  },
  hibisco: {
    emoji: '🌺',
    title: 'Hibisco',
    sub: 'Belleza delicada — tu ternura es tu mayor poder'
  }
};

flowerItems.forEach(function(item) {
  item.addEventListener('click', function() {
    // Quita selección de todas las flores
    flowerItems.forEach(function(f) {
      f.classList.remove('selected');
    });

    // Selecciona esta flor
    this.classList.add('selected');

    // Obtiene datos y actualiza el panel de énfasis
    const key = this.dataset.flower;
    const data = flowerData[key];

    if (data) {
      feEmoji.textContent = data.emoji;
      feTitle.textContent = data.title;
      feSub.textContent = '«' + data.sub + '»';
      feBox.classList.add('show');
    }
  });
});


// ============================================================
// 8. CONFETTI — Efecto de celebración
//    Crea partículas de colores que caen desde arriba
// ============================================================
function launchConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  const colors = [
    '#e8a0b4', '#c9a0dc', '#f8c8d8', '#fce4ec',
    '#a8d8ea', '#fdcb6e', '#fd79a8', '#a29bfe',
    '#81ecec', '#ff7675'
  ];

  for (let i = 0; i < 140; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';

    const size = 5 + Math.random() * 10;
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = Math.random() * 100 + '%';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.animationDuration = (2 + Math.random() * 2.5) + 's';
    el.style.animationDelay = Math.random() * 2 + 's';

    // Algunas piezas son emojis decorativos
    if (i % 7 === 0) {
      const emojis = ['🌸', '🌹', '✨', '💖', '🦋'];
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.background = 'none';
      el.style.fontSize = (size + 6) + 'px';
      el.style.width = 'auto';
      el.style.height = 'auto';
    }

    container.appendChild(el);
  }

  // Limpia el contenedor después de 5s
  setTimeout(function() {
    container.remove();
  }, 5000);
}


// ============================================================
// 9. COUNTDOWN — Contador regresivo
//    Cuenta días, horas, minutos y segundos hasta el evento
//    Fecha objetivo: 01 de Agosto 2025, 8:00 PM (UTC-5, Perú)
// ============================================================
(function initCountdown() {
  const targetDate = new Date('2026-08-01T20:00:00-05:00');
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMinutes = document.getElementById('cdMinutes');
  const cdSeconds = document.getElementById('cdSeconds');

  function pad(num) {
    return num < 10 ? '0' + num : '' + num;
  }

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      cdDays.textContent = '00';
      cdHours.textContent = '00';
      cdMinutes.textContent = '00';
      cdSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    cdDays.textContent = pad(days);
    cdHours.textContent = pad(hours);
    cdMinutes.textContent = pad(minutes);
    cdSeconds.textContent = pad(seconds);
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();


// ============================================================
// 10. BOTÓN DE CONFIRMACIÓN — CTA final
//     Lanza confetti y muestra mensaje de respuesta
// ============================================================
document.getElementById('btnYes').addEventListener('click', function() {
  // Lanza el confetti
  launchConfetti();

  // Mensajes de respuesta aleatorios
  const msg = document.getElementById('responseMsg');
  const msgs = [
    '¡Sabía que dirías que sí! 💖',
    '¡Eres increíble! Nos vemos pronto ✨',
    '¡Prepárate para una noche mágica! 🌹',
    '¡Tu luz lo iluminará todo! 🌟',
    '¡Una realeza como tú merece lo mejor! 👑',
    '¡Vamos a celebrar tu grandeza! 🎉'
  ];

  msg.textContent = msgs[Math.floor(Math.random() * msgs.length)];
  msg.classList.add('show');

  // Desactiva el botón
  this.textContent = '💕 ¡Cuento contigo!';
  this.classList.add('loading');
  this.disabled = true;
});
