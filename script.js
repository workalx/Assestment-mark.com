// Анімація появи елементів при скролі
document.addEventListener('DOMContentLoaded', () => {
  // Анімація кнопок навігації
  const buttons = document.querySelectorAll('.button-container .button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      const svg = button.querySelector('svg');
      svg.style.transform = 'scale(1.2)';
      svg.style.transition = 'transform 0.3s ease';
    });

    button.addEventListener('mouseleave', () => {
      const svg = button.querySelector('svg');
      svg.style.transform = 'scale(1)';
    });

    button.addEventListener('click', () => {
      const svg = button.querySelector('svg');
      svg.style.transform = 'scale(0.8)';
      setTimeout(() => {
        svg.style.transform = 'scale(1)';
      }, 200);
    });
  });

  const animatedItems = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  animatedItems.forEach(item => observer.observe(item));

  // Випадковий margin-top для карток characters
  document.querySelectorAll('.characters .card').forEach(card => {
    const offset = Math.floor(Math.random() * 40);
    card.style.marginTop = `${offset}px`;
  });

  // Кнопка-тогл меню
  document.querySelector('.menu .toggle').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('active');
  });

  // Анімація головної картинки
  let animationPlayed = false;
  function isInViewportCenter(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elCenter = rect.top + rect.height / 2;
    return elCenter >= windowHeight / 2 - 50 && elCenter <= windowHeight / 2 + 50;
  }

  function checkAnimation() {
    const image = document.querySelector('.animated-image');
    if (!animationPlayed && isInViewportCenter(image)) {
      image.classList.add('animate');
      animationPlayed = true;
    }
  }

  window.addEventListener('scroll', checkAnimation);
  window.addEventListener('load', checkAnimation);

  // Кнопка "View more"
  document.querySelectorAll('.view-more-button').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.parent');
      card.classList.toggle('expanded');
      button.textContent = card.classList.contains('expanded') ? 'View less' : 'View more';
    });
  });

  // Рандомне позиціонування new-card у контейнері
  const cards = document.querySelectorAll('.new-card-container .new-card');
  cards.forEach(card => {
    const x = Math.floor(Math.random() * 120) - 60; // від -60 до +60px
    const y = Math.floor(Math.random() * 120);     // від 0 до +120px
    card.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Копіювання в буфер обміну
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    const message = document.getElementById('copyMessage');
    message.style.display = 'block';
    setTimeout(() => {
      message.style.display = 'none';
    }, 5000);
  });
}

function copyAndOpenMessenger() {
  const url = 'https://workalx.github.io/Portfolio/';
  navigator.clipboard.writeText(url).then(() => {
    window.open('https://www.messenger.com/t/?link=' + encodeURIComponent(url), '_blank');
  });
}

function copyAndOpenTelegram() {
  const url = 'https://workalx.github.io/Portfolio/';
  navigator.clipboard.writeText(url).then(() => {
    window.open('https://t.me/share/url?url=' + encodeURIComponent(url), '_blank');
  });
}
