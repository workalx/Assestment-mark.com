document.addEventListener('DOMContentLoaded', () => {
    const animatedItems = document.querySelectorAll('.animate-on-scroll');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // анімується лише один раз
        }
      });
    }, {
      threshold: 0.3
    });
  
    animatedItems.forEach(item => observer.observe(item));

    // Додаємо функціонал для другої кнопки в sidebar
    const secondButton = document.querySelector('.menu li:nth-child(2) a');
    const selectionBlock = document.createElement('div');
    selectionBlock.classList.add('selection-block');
    selectionBlock.innerHTML = `
      <div class="option" data-target=".parent-container">1 Characters</div>
      <div class="option" data-target=".ideas-container">2 Ideas</div>
    `;
    document.body.appendChild(selectionBlock);

    secondButton.addEventListener('click', (event) => {
      event.preventDefault();
      selectionBlock.classList.add('visible');
    });

    selectionBlock.addEventListener('click', (event) => {
      if (event.target.classList.contains('option')) {
        const targetSelector = event.target.getAttribute('data-target');
        if (targetSelector === '.parent-container') {
          return; // Пропускаємо обробку для .parent-container
        }
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
          selectionBlock.classList.remove('visible');
        }
      }
    });

    // Додаємо функціонал для третьої кнопки в sidebar
    const thirdButton = document.querySelector('.menu li:nth-child(3) a');
    thirdButton.addEventListener('click', (event) => {
      event.preventDefault();
      const newCardBlock = document.querySelector('.new-card');
      if (newCardBlock) {
        newCardBlock.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
  
// Додаємо випадковий margin-top для .card всередині .characters
const cards = document.querySelectorAll('.characters .card');
cards.forEach(card => {
  const offset = Math.floor(Math.random() * 40); // від 0 до 40px
  card.style.marginTop = `${offset}px`;
});
  
document.querySelector('.menu .toggle').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('active');
});
  
document.querySelectorAll('.view-more-button').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.parent');
    card.classList.toggle('expanded');

    button.textContent = card.classList.contains('expanded') ? 'View less' : 'View more';
  });
});
  
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        var message = document.getElementById('copyMessage');
        message.style.display = 'block';
        setTimeout(function() {
            message.style.display = 'none';
        }, 5000);
    }, function(err) {
        console.error('Помилка копіювання: ', err);
    });
}

function copyAndOpenMessenger() {
    const url = 'https://workalx.github.io/Portfolio/';
    navigator.clipboard.writeText(url).then(function() {
        window.open('https://www.messenger.com/t/?link=' + encodeURIComponent(url), '_blank');
    }, function(err) {
        console.error('Error copying: ', err);
    });
}

function copyAndOpenTelegram() {
    const url = 'https://workalx.github.io/Portfolio/';
    navigator.clipboard.writeText(url).then(function() {
        window.open('https://t.me/share/url?url=' + encodeURIComponent(url), '_blank');
    }, function(err) {
        console.error('Error copying: ', err);
    });
}

window.addEventListener('load', function() {
    const splash = document.getElementById('splash-screen');
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
        }, 1000);
    }, 2000);
});

document.addEventListener('DOMContentLoaded', function() {
    const menu = document.querySelector('.menu');
    const buttonContainer = document.querySelector('.button-container');
    const header = document.querySelector('header');
    let hasScrolled = false;

    function checkScroll() {
        if (window.scrollY > 100 && !hasScrolled) {
            menu.classList.add('visible');
            buttonContainer.classList.add('visible');
            header.classList.add('visible');
            hasScrolled = true;
        }
    }

    window.addEventListener('scroll', checkScroll);
});

function isInViewportCenter(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const elCenter = rect.top + rect.height / 2;
    return elCenter >= windowHeight / 2 - 50 && elCenter <= windowHeight / 2 + 50;
}

function checkAnimation() {
    const element = document.querySelector('.homepage');
    if (isInViewportCenter(element)) {
        element.classList.add('animate');
    } 
}

window.addEventListener('scroll', checkAnimation);
window.addEventListener('load', checkAnimation);

let animationPlayed = false;

function checkAnimation() {
    const image = document.querySelector('.animated-image');
    if (!animationPlayed && isInViewportCenter(image)) {
        image.classList.add('animate');
        animationPlayed = true;
    }
}

window.addEventListener('scroll', checkAnimation);
window.addEventListener('load', checkAnimation);

const texts = [
    "Привіт! Це перший рядок...",
    "А ось і другий приклад тексту!",
    "Нарешті, третій з'явився :)"
];

const typingSpeed = 80; // швидкість друку (мс)
const erasingSpeed = 40; // швидкість стирання
const delayBetweenTexts = 1500; // пауза перед стиранням

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing-text");

function type() {
    const currentText = texts[textIndex];

    if (!isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, delayBetweenTexts);
        } else {
            setTimeout(type, typingSpeed);
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, erasingSpeed);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
});


document.querySelector('.new-button').addEventListener('click', function() {
    const storyBlock = document.getElementById('story-block');
    if (storyBlock.style.display === 'none') {
        storyBlock.style.display = 'block';
    } else {
        storyBlock.style.display = 'none';
    }
});
  