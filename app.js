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
// 2. MODAL DE BIENVENIDA — Popup con nombre
//    Captura el nombre y reemplaza {name} en los textos
//    sin destruir los event listeners existentes
// ============================================================
(function initWelcomeModal() {
  const modal = document.getElementById('welcomeModal');
  const input = document.getElementById('nameInput');
  const btn = document.getElementById('nameBtn');

  // Reemplaza {name} en todos los nodos de texto del body
  function personalizePage(name) {
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    const nodesToReplace = [];
    let node;
    while (node = walker.nextNode()) {
      if (node.nodeValue.indexOf('{name}') !== -1) {
        nodesToReplace.push(node);
      }
    }
    nodesToReplace.forEach(function(n) {
      n.nodeValue = n.nodeValue.replace(/\{name\}/g, name);
    });
  }

  function closeModal() {
    modal.classList.add('hidden');
    setTimeout(function() {
      modal.style.display = 'none';
    }, 600);
  }

  function handleSubmit() {
    const name = input.value.trim();
    if (name.length === 0) {
      input.style.borderColor = '#e8a0b4';
      input.placeholder = 'Por favor, escribe tu nombre 💕';
      input.classList.add('shake');
      setTimeout(function() {
        input.classList.remove('shake');
      }, 500);
      return;
    }
    personalizePage(name);
    closeModal();
  }

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') handleSubmit();
  });

  btn.addEventListener('click', handleSubmit);

  // Animación shake input vacío
  const style = document.createElement('style');
  style.textContent = '@keyframes shake { 0%,100% { transform:translateX(0); } 25% { transform:translateX(-8px); } 50% { transform:translateX(8px); } 75% { transform:translateX(-4px); } } .shake { animation:shake 0.4s ease; }';
  document.head.appendChild(style);
})();


// ============================================================
// 3. NAVBAR — Efecto de scroll
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
// 4. NAVBAR MÓVIL — Menú hamburguesa
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
// 5. INVITACIÓN — Sobre que se abre al hacer clic
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
// 6. SCROLL REVEAL — Animación al hacer scroll
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
// 7. VIRTUDES — Cards interactivas con clic
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
// 8. FLORES — Galería interactiva con clic
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
// 9. CONFETTI — Efecto de celebración
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
// 10. COUNTDOWN — Contador regresivo
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
// 11. CHATBOT FLOTANTE — Asistente virtual
//     Responde preguntas sobre el evento usando la info de la web
// ============================================================
(function initChatbot() {
  const toggle = document.getElementById('chatbotToggle');
  const panel = document.getElementById('chatbotPanel');
  const closeBtn = document.getElementById('chatbotClose');
  const body = document.getElementById('chatbotBody');
  const input = document.getElementById('chatbotInput');
  const send = document.getElementById('chatbotSend');
  const chips = document.querySelectorAll('.chip');
  const suggestions = document.getElementById('chatbotSuggestions');

  let isOpen = false;
  let firstOpen = true;

  function openChat() {
    isOpen = true;
    toggle.classList.add('open');
    panel.classList.add('open');
    // Quitar notificación si existía
    var dot = toggle.querySelector('.notification-dot');
    if (dot) dot.remove();
    setTimeout(function() { input.focus(); }, 400);
    // Inicia timer de inactividad
    resetInactivityTimer();
  }

  function closeChat() {
    isOpen = false;
    toggle.classList.remove('open');
    panel.classList.remove('open');
    // Cancela timer de inactividad
    if (inactivityTimer) clearTimeout(inactivityTimer);
  }

  toggle.addEventListener('click', function() {
    if (isOpen) closeChat(); else openChat();
  });

  closeBtn.addEventListener('click', closeChat);

  // Base de conocimiento
  function getAnswer(question) {
    var q = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Saludar
    if (/\b(hola|buenas|hey|buen[ao]|saludos|que tal|quiubola)\b/.test(q)) {
      return '¡Hola! 🌸 Bienvenida a <strong>Ellos para ellas</strong>. ¿En qué puedo ayudarte? Puedes preguntarme sobre el evento, las virtudes, las flores o cómo confirmar tu asistencia.';
    }

    // Gracias
    if (/\b(gracias|graciass|thanks|thank|te lo agradezco|muchas gracias)\b/.test(q)) {
      return '¡De nada! 💕 Si tienes otra duda, aquí estoy para ti. ¡Que tengas un día hermoso! 🌷';
    }

    // Que es / descripcion del evento
    if (/\b(que es|que son|explica|cuentalo|cuentame|describe|acerca de|sobre)\b/.test(q) &&
        /\b(evento|ellos|ellas|esto|esta pagina|esta web|invitacion)\b/.test(q)) {
      return '<strong>Ellos para ellas</strong> es un evento especial creado por <strong>JOAS</strong> para celebrar y honrar a cada mujer. Habrá música, postres, sorpresas y momentos inolvidables. ✨ Está diseñado para que cada invitada se sienta única y valorada.';
    }

    // JOAS significado
    if (/\b(que significa|significa|que es|que quieredecir|significado)\b/.test(q) && /\b(joas|logo|nombre|siglas)\b/.test(q)) {
      return '<strong>JOAS</strong> significa <strong>"Jóvenes Obedientes, Amables y Serviciales"</strong>. Es el grupo de varones que organiza <em>Ellos para ellas</em> con mucho cariño. Este evento nace de su corazón para honrar y celebrar a cada mujer. 💖✨';
    }

    // Quien organiza
    if (/\b(quien|quienes|organiza|organizan|organizador|detras de esto|quien lo hizo)\b/.test(q)) {
      return 'El evento es organizado por los <strong>varones de JOAS</strong> 🤵✨ — <em>"Jóvenes Obedientes, Amables y Serviciales"</em>. Ellos prepararon cada detalle con mucho amor para celebrar a todas las mujeres. 💕';
    }

    // Cuando / fecha
    if (/\b(cuando|cual es la fecha|fecha|dia|que dia|sabado|agosto)\b/.test(q) &&
        /\b(evento|invitacion|es|inicia|comienza)\b/.test(q) || 
        /\b(cuando es|cual es la fecha|fecha del evento|que dia es)\b/.test(q)) {
      return 'El evento será el <strong>sábado 01 de Agosto de 2026</strong> a las <strong>8:00 PM</strong> (hora Perú). ¡Falta poco! 🎉 Échale un ojo al contador regresivo en la página.';
    }

    // Hora
    if (/\b(hora|a que hora|horario|que hora|empieza|comienza)\b/.test(q)) {
      return 'El evento comienza a las <strong>8:00 PM</strong> (hora Perú / UTC-5). ¡No llegues tarde! ⏰';
    }

    // Donde / lugar
    if (/\b(donde|lugar|ubicacion|direccion|sky lounge|skylounge|en donde|en que lugar)\b/.test(q)) {
      return 'El evento se realizará en <strong>Sky Lounge</strong> 🏙️. Un lugar elegante y acogedor para una noche especial.';
    }

    // Virtudes (general)
    if (/\b(virtudes|cualidades|cuales son las virtudes|que virtudes)\b/.test(q)) {
      return 'Las <strong>6 virtudes</strong> que celebramos son: 👑 Dignidad, 🕊️ Sabiduría, 💪 Fortaleza, 🤍 Bondad, 🦋 Gracia y 🔥 Valentía. Cada una tiene un versículo bíblico y una reflexión especial. Escoge la que más te guste y te cuento más sobre ella. ✨';
    }

    // --- CADA VIRTUD EN ESPECÍFICO ---
    if (/\b(dignidad)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'dignidad' || q === 'cuentame sobre la dignidad') {
      return '<strong>Dignidad</strong> 👑 — <em>"Fuerza y dignidad son su vestidura"</em> (Proverbios 31:25).<br><br>Tu valor no está en lo que haces, sino en quien eres. Caminas con la cabeza en alto porque sabes que eres una joya preciosa. Nadie puede opacar tu luz porque tu identidad está firme como una torre. 💎';
    }
    if (/\b(sabiduria|sabiduría)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'sabiduria' || q === 'cuentame sobre la sabiduria') {
      return '<strong>Sabiduría</strong> 🕊️ — <em>"Abre su boca con sabiduría, y la ley de clemencia está en su lengua"</em> (Proverbios 31:26).<br><br>Tus palabras son medicina para el alma. Sabes cuándo hablar y cuándo escuchar. Tu consejo es refugio de paz y tus decisiones están llenas de entendimiento y gracia. 📖';
    }
    if (/\b(fortaleza)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'fortaleza' || q === 'cuentame sobre la fortaleza') {
      return '<strong>Fortaleza</strong> 💪 — <em>"Los que esperan en Jehová renovarán sus fuerzas; levantarán alas como las águilas"</em> (Isaías 40:31).<br><br>Como el roble frente a la tormenta, te mantienes firme. Tus pruebas te han esculpido y hoy eres más fuerte que ayer. Nada te doblega porque tu espíritu es indomable. 🌳';
    }
    if (/\b(bondad)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'bondad' || q === 'cuentame sobre la bondad') {
      return '<strong>Bondad</strong> 🤍 — <em>"Extiende su mano al pobre, y al necesitado tiende sus brazos"</em> (Proverbios 31:20).<br><br>Tu corazón generoso abraza sin condición. En tus manos, el amor se convierte en acción y la fe en esperanza. Dejas una huella de luz allá por donde pasas. ✨';
    }
    if (/\b(gracia)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'gracia' || q === 'cuentame sobre la gracia') {
      return '<strong>Gracia</strong> 🦋 — <em>"Eres la más hermosa de todas; la gracia se derramó en tus labios"</em> (Salmos 45:2).<br><br>Tu presencia es como una danza de mariposas. Ligera, elegante, transformando todo a tu alrededor con belleza. Tu porte y delicadeza enamoran sin esfuerzo. 🌷';
    }
    if (/\b(valent[ií]a)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'valentia' || q === 'cuentame sobre la valentia') {
      return '<strong>Valentía</strong> 🔥 — <em>"Esfuérzate y sé valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo"</em> (Josué 1:9).<br><br>No temes soñar en grande ni comenzar de nuevo. Tu coraje inspira a quienes tienen la dicha de caminar a tu lado. Eres fuego que enciende esperanza en los demás. ⚡';
    }

    // Flores (general)
    if (/\b(flores|flor|cuales son las flores|que flores|galeria)\b/.test(q)) {
      return 'Tenemos <strong>5 flores</strong> con su significado: 🌹 <strong>Rosa</strong> (amor eterno), 🌷 <strong>Tulipán</strong> (gracia), 🌸 <strong>Cerezo</strong> (renovación), 🌻 <strong>Girasol</strong> (fortaleza) y 🌺 <strong>Hibisco</strong> (belleza delicada). ¿Quieres saber más de alguna en especial? Solo dímelo 💕';
    }

    // --- CADA FLOR EN ESPECÍFICO ---
    if (/\b(rosa)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'rosa' || q === 'cuentame sobre la rosa') {
      return 'La <strong>Rosa</strong> 🌹 simboliza el <strong>amor y la belleza eterna</strong>. Es la flor del amor verdadero, de la pasión que nunca se apaga. Como tú, una mujer que merece ser amada y admirada cada día. Su fragancia y sus pétalos suaves nos recuerdan lo delicada y poderosa que eres a la vez. 💖';
    }
    if (/\b(tulip[aá]n)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'tulipan' || q === 'cuentame sobre el tulipan') {
      return 'El <strong>Tulipán</strong> 🌷 representa la <strong>gracia y la elegancia</strong>. Su forma perfecta y sus colores vibrantes reflejan tu porte único. El tulipán florece con dignidad, igual que tú, que cautivas sin necesidad de decir una palabra. Una flor clásica, sofisticada y llena de encanto. ✨';
    }
    if (/\b(cerezo)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'cerezo' || q === 'cuentame sobre el cerezo') {
      return 'El <strong>Cerezo</strong> 🌸 es símbolo de <strong>renovación y esperanza</strong>. Sus flores brotan cada primavera recordándonos que siempre hay una nueva oportunidad. Como tú, que cada día renaces más fuerte y más hermosa. La vida florece a tu paso y todo se llena de color. 🌅';
    }
    if (/\b(girasol)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'girasol' || q === 'cuentame sobre el girasol') {
      return 'El <strong>Girasol</strong> 🌻 es la flor de la <strong>fortaleza y la lealtad</strong>. Siempre busca la luz, sin importar las sombras. Así eres tú: una mujer que mira hacia adelante, que encuentra el sol incluso en los días nublados. Tu energía y tu fe mueven montañas. ☀️';
    }
    if (/\b(hibisco)\b/.test(q) && /\b(cuentame|cuéntame|dime|habla|sobre|explica|que es|significa)\b/.test(q) || q === 'hibisco' || q === 'cuentame sobre el hibisco') {
      return 'El <strong>Hibisco</strong> 🌺 es la flor de la <strong>belleza delicada</strong>. Exótica, vibrante y llena de vida. Como tú, que con tu ternura y tu fuerza cautivas a quienes te rodean. Una flor que no pasa desapercibida, que deja huella en el corazón de quien la mira. 💕';
    }

    // Codigo
    if (/\b(codigo|code|clave|tag|hashtag|etiqueta)\b/.test(q)) {
      return 'El código del evento es <strong>#EllosParaEllas</strong> 💫 ¡Úsalo para compartir en redes!';
    }

    // Carta
    if (/\b(carta|poema|mensaje|que dice la carta|texto|poesia)\b/.test(q)) {
      return 'Hay una carta hermosa dedicada a ti 💌 Habla sobre tu valor, tu fortaleza y lo extraordinaria que eres. Dice que <em>"no eres cualquier mujer: eres una obra maestra"</em>. Ve a la sección <strong>Carta</strong> para leerla completa. ✨';
    }

    // Confirmar / RSVP
    if (/\b(confirmar|confirmo|como confirmo|asistencia|rsvp|asistire|quiero ir|boton)\b/.test(q)) {
      return 'Para confirmar tu asistencia, ve a la sección <strong>"Confirmar"</strong> al final de la página y haz clic en <strong>"Sí, acepto"</strong> 💖 ¡Te esperamos! 🎉';
    }

    // Musica / postres / sorpresas
    if (/\b(musica|postres|sorpresas|que hay|actividades|que habra)\b/.test(q)) {
      return 'Habrá <strong>música</strong> para ambientar la noche, <strong>postres exquisitos</strong> para endulzar el momento, y <strong>sorpresas especiales</strong> que hicimos con mucho cariño para ti 🎵🍰🎁 ¡No te lo pierdas!';
    }

    // Despedida
    if (/\b(chao|bye|adios|nos vemos|hasta luego|me voy|salir)\b/.test(q)) {
      return '¡Fue un placer charlar contigo! 💕 Nos vemos en el evento. ¡Prepárate para una noche mágica! ✨🌹';
    }

    // Fecha larga suelta
    if (/\b(01\s*de\s*agosto|primero\s*de\s*agosto|1\s*\/\s*08|01\/08)\b/.test(q)) {
      return '¡Sí! La fecha confirmada es el <strong>sábado 01 de Agosto de 2026</strong> a las <strong>8:00 PM</strong> en <strong>Sky Lounge</strong>. ¡Te esperamos! 🎉';
    }

    // Por defecto — mensaje triste pero amable
    return 'Ay, no conozco esa información 😢💔. ¿Me preguntas otra cosa? Puedo contarte sobre las <strong>virtudes de la mujer</strong>, el <strong>significado de JOAS</strong>, la <strong>fecha del evento</strong>, las <strong>flores</strong> o cómo <strong>confirmar tu asistencia</strong>. ¡Te escucho! 🌸';
  }

  function addMessage(text, type) {
    var div = document.createElement('div');
    div.className = 'chatbot-msg ' + type;

    var avatar = document.createElement('div');
    avatar.className = 'msg-avatar';
    avatar.textContent = type === 'bot' ? '🌸' : '💁';

    var content = document.createElement('div');
    content.className = 'msg-content';

    var bubble = document.createElement('div');
    bubble.className = 'msg-bubble';
    bubble.innerHTML = text;
    content.appendChild(bubble);

    var time = document.createElement('div');
    time.className = 'msg-time';
    var now = new Date();
    time.textContent = now.getHours().toString().padStart(2, '0') + ':' +
                       now.getMinutes().toString().padStart(2, '0');
    content.appendChild(time);

    div.appendChild(avatar);
    div.appendChild(content);
    body.appendChild(div);
    scrollToBottom();
  }

  function scrollToBottom() {
    setTimeout(function() {
      body.scrollTop = body.scrollHeight;
    }, 50);
  }

  // Mostrar typing indicator y responder
  function simulateResponse(answer, chipsContext) {
    var typing = document.getElementById('typingIndicator');
    if (!typing) {
      typing = document.createElement('div');
      typing.className = 'typing-indicator';
      typing.id = 'typingIndicator';
      typing.innerHTML = '<div class="msg-avatar">🌸</div><div class="typing-dots"><span></span><span></span><span></span></div>';
      body.appendChild(typing);
    }
    typing.classList.add('show');
    scrollToBottom();

    var delay = 600 + Math.random() * 800;
    setTimeout(function() {
      typing.classList.remove('show');
      addMessage(answer, 'bot');

      // Mostrar chips según el contexto
      if (chipsContext === 'virtues') {
        showVirtueChips();
      } else if (chipsContext === 'flowers') {
        showFlowerChips();
      } else {
        showMainChips();
      }

      // Reinicia el timer de inactividad
      resetInactivityTimer();
    }, delay);
  }

  var inactivityTimer = null;
  var subchipFlow = false;

  function resetInactivityTimer() {
    if (inactivityTimer) clearTimeout(inactivityTimer);
    if (isOpen) {
      var timeout = subchipFlow ? 30000 : 25000;
      inactivityTimer = setTimeout(function() {
        // Preguntar si necesita ayuda
        var lastMsg = body.querySelector('.chatbot-msg:last-child .msg-bubble');
        if (lastMsg && lastMsg.textContent.trim().length > 0) {
          if (subchipFlow) {
            addMessage('¿Te podemos ayudar en algo más? 💕', 'bot');
            showMainChips();
          } else {
            addMessage('¿Necesitas ayuda con algo más? 💕 Puedes preguntarme sobre la fecha, las virtudes, las flores o cómo confirmar. ¡Estoy aquí para ti! 🌸', 'bot');
            showSuggestions();
          }
        }
      }, timeout);
    }
  }

  // ---- SUB-CHIPS: virtudes ----
  function showVirtueChips() {
    subchipFlow = true;
    suggestions.innerHTML =
      '<button class="chip subchip" data-question="Cuéntame sobre la dignidad 👑">👑 Dignidad</button>' +
      '<button class="chip subchip" data-question="Cuéntame sobre la sabiduría 🕊️">🕊️ Sabiduría</button>' +
      '<button class="chip subchip" data-question="Cuéntame sobre la fortaleza 💪">💪 Fortaleza</button>' +
      '<button class="chip subchip" data-question="Cuéntame sobre la bondad 🤍">🤍 Bondad</button>' +
      '<button class="chip subchip" data-question="Cuéntame sobre la gracia 🦋">🦋 Gracia</button>' +
      '<button class="chip subchip" data-question="Cuéntame sobre la valentía 🔥">🔥 Valentía</button>';
    attachSubChips();
    showSuggestions();
  }

  // ---- SUB-CHIPS: flores ----
  function showFlowerChips() {
    subchipFlow = true;
    suggestions.innerHTML =
      '<button class="chip subchip" data-question="Cuéntame sobre la rosa 🌹">🌹 Rosa</button>' +
      '<button class="chip subchip" data-question="Cuéntame sobre el tulipán 🌷">🌷 Tulipán</button>' +
      '<button class="chip subchip" data-question="Cuéntame sobre el cerezo 🌸">🌸 Cerezo</button>' +
      '<button class="chip subchip" data-question="Cuéntame sobre el girasol 🌻">🌻 Girasol</button>' +
      '<button class="chip subchip" data-question="Cuéntame sobre el hibisco 🌺">🌺 Hibisco</button>';
    attachSubChips();
    showSuggestions();
  }

  // ---- CHIPS PRINCIPALES ----
  function showMainChips() {
    subchipFlow = false;
    suggestions.innerHTML =
      '<button class="chip" data-question="¿Qué es JOAS?">✨ ¿Qué es JOAS?</button>' +
      '<button class="chip" data-question="¿Cuándo es el evento?">📅 ¿Cuándo es?</button>' +
      '<button class="chip" data-question="¿Cuáles son las virtudes?">👑 Virtudes</button>' +
      '<button class="chip" data-question="¿Qué flores hay?">🌸 Flores</button>' +
      '<button class="chip" data-question="¿Dónde se realiza?">📍 ¿Dónde es?</button>' +
      '<button class="chip" data-question="¿Cómo confirmo?">💌 Confirmar</button>';
    attachMainChips();
    showSuggestions();
  }

  function attachSubChips() {
    document.querySelectorAll('#chatbotSuggestions .subchip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        var question = this.dataset.question || this.textContent;
        if (!isOpen) openChat();
        setTimeout(function() { handleUserMessage(question); }, 300);
      });
    });
  }

  function attachMainChips() {
    document.querySelectorAll('#chatbotSuggestions .chip').forEach(function(chip) {
      chip.addEventListener('click', function() {
        var question = this.dataset.question || this.textContent;
        if (!isOpen) openChat();
        setTimeout(function() { handleUserMessage(question); }, 300);
      });
    });
  }

  function hideSuggestions() {
    suggestions.style.transition = 'max-height 0.4s ease, opacity 0.4s ease, margin 0.4s ease';
    suggestions.style.maxHeight = '0';
    suggestions.style.opacity = '0';
    suggestions.style.margin = '0';
    suggestions.style.overflow = 'hidden';
    suggestions.style.padding = '0 1.2rem';
  }

  function showSuggestions() {
    suggestions.style.maxHeight = '';
    suggestions.style.opacity = '';
    suggestions.style.margin = '';
    suggestions.style.overflow = '';
    suggestions.style.padding = '';
    suggestions.style.transition = '';
  }

  function handleUserMessage(text) {
    var trimmed = text.trim();
    if (!trimmed) return;

    addMessage(trimmed, 'user');
    input.value = '';
    // Cancela el timer de inactividad cuando la usuaria escribe
    if (inactivityTimer) clearTimeout(inactivityTimer);

    var answer = getAnswer(trimmed);
    var context = getChipContext(trimmed);
    simulateResponse(answer, context);
  }

  // Detecta si la pregunta es sobre virtudes o flores para mostrar sub-chips
  function getChipContext(question) {
    var q = question.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Si pregunta por algo específico (sub-chip), no repetir sub-chips
    if (/^cuentame sobre/.test(q) || /^dime sobre/.test(q) || /^hablame de/.test(q)) return null;
    // General virtue/flower → mostrar sub-chips
    if (/\b(virtudes|cualidades|cuales son las virtudes|que virtudes)\b/.test(q)) return 'virtues';
    if (/\b(flores|flor|cuales son las flores|que flores|galeria)\b/.test(q)) return 'flowers';
    return null;
  }

  // Enviar con botón
  send.addEventListener('click', function() {
    handleUserMessage(input.value);
  });

  // Enviar con Enter
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUserMessage(input.value);
    }
  });

  // Chips de preguntas sugeridas
  chips.forEach(function(chip) {
    chip.addEventListener('click', function() {
      var question = this.dataset.question || this.textContent;
      // Si el chat está cerrado, se abre
      if (!isOpen) openChat();
      // Pequeño delay para que se vea natural
      setTimeout(function() {
        handleUserMessage(question);
      }, 300);
    });
  });

  // Abrir desde el nav (si alguien hace clic en un enlace a #invitacion o similar,
  // el chatbot no interfiere)
})();


// ============================================================
// 12. BOTÓN DE CONFIRMACIÓN — CTA final
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
