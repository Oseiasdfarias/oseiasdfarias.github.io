/* ----- THEME TOGGLE (COM LOCALSTORAGE) ----- */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const darkTheme = 'dark-theme';
const lightTheme = 'light-theme';
const iconSun = 'uil-sun';
const iconMoon = 'uil-moon';

// Função para obter o tema atual
const getCurrentTheme = () => body.classList.contains(lightTheme) ? 'light' : 'dark';
// Função para obter o ícone atual
const getCurrentIcon = () => themeToggle.classList.contains(iconSun) ? 'uil-sun' : 'uil-moon';

// Verificar preferência salva no localStorage
const savedTheme = localStorage.getItem('selected-theme');
const savedIcon = localStorage.getItem('selected-icon');

if (savedTheme) {
    // Aplicar o tema salvo
    if (savedTheme === 'light') {
        body.classList.add(lightTheme);
        body.classList.remove(darkTheme);
        themeToggle.classList.add(iconSun);
        themeToggle.classList.remove(iconMoon);
    } else {
        body.classList.add(darkTheme);
        body.classList.remove(lightTheme);
        themeToggle.classList.add(iconMoon);
        themeToggle.classList.remove(iconSun);
    }
} else {
    // Se não houver save, verificar a classe inicial do body (dark-theme)
    // e definir o ícone correto. 
    // Seu <body> começa com "dark-theme"
    if (getCurrentTheme() === 'dark') {
        themeToggle.classList.add(iconMoon);
        themeToggle.classList.remove(iconSun);
    } else {
        themeToggle.classList.add(iconSun);
        themeToggle.classList.remove(iconMoon);
    }
}

// Adicionar o listener de clique
themeToggle.addEventListener('click', () => {
    // Alternar as classes do body
    body.classList.toggle(lightTheme);
    body.classList.toggle(darkTheme);
    
    // Alternar os ícones
    themeToggle.classList.toggle(iconSun);
    themeToggle.classList.toggle(iconMoon);

    // Salvar a escolha no localStorage
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});


/* ----- O RESTANTE DO SEU CÓDIGO MAIN.JS ----- */

// Navbar Scroll Effect with Shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.boxShadow = "0 1px 6px rgba(0, 0, 0, 0.1)";
        navbar.style.height = "60px";
        navbar.style.lineHeight = "60px";
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = "none";
        navbar.style.height = "80px";
        navbar.style.lineHeight = "80px";
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Skill Level Animation on Scroll
const skillLevels = document.querySelectorAll('.skill-level-fill');
const observerOptions = {
    threshold: 0.5
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width;
            entry.target.style.width = '0%';
            setTimeout(() => {
                entry.target.style.width = width;
            }, 100);
        }
    });
}, observerOptions);
skillLevels.forEach(level => {
    observer.observe(level);
});

// Fade In Animation on Load
window.addEventListener('load', () => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        element.style.opacity = '1';
    });
});

// Mobile Menu Function
function myMenuFunction(){
    var menuBtn = document.getElementById("myNavMenu");
  
    if(menuBtn.className === "nav-menu"){
      menuBtn.className += " responsive";
    } else {
      menuBtn.className = "nav-menu";
    }
}

// ScrollReveal Animations
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true     
});

// Home Section Animations
sr.reveal('.featured-text-card',{});
sr.reveal('.featured-name',{delay: 100});
sr.reveal('.featured-text-info',{delay: 200});
sr.reveal('.featured-text-btn',{delay: 200});
sr.reveal('.social_icons',{delay: 200});
sr.reveal('.featured-image',{delay: 300});

// Project & Demo Box Animations
sr.reveal('.project-box',{interval: 200});
sr.reveal('.video-container iframe', {interval: 200});

// Headings Animations
sr.reveal('.top-header',{});

// Left and Right Element Animations
sr.reveal('.left-element', {
    origin: 'left',
    distance: '50px',
    duration: 1000,
    delay: 200,
    easing: 'ease-out',
    reset: true
});

sr.reveal('.right-element', {
    origin: 'right',
    distance: '50px',
    duration: 1000,
    delay: 200,
    easing: 'ease-out',
    reset: true
});

// ScrollReveal Left-Right Animations
const srLeft = ScrollReveal({
    origin: 'left',
    distance: '80px',
    duration: 2000,
    reset: true
});

srLeft.reveal('.about-info',{delay: 100});
srLeft.reveal('.contact-info',{delay: 100});

const srRight = ScrollReveal({
    origin: 'right',
    distance: '80px',
    duration: 2000,
    reset: true
});

srRight.reveal('.skills-box',{delay: 100});
srRight.reveal('.form-control',{delay: 100});

// Typing Effect (AGORA DENTRO DE UMA FUNÇÃO)
// Esta função será chamada pelo 'language.js'
function initTyped(strings) {
    return new Typed(".typedText", {
        strings: strings,
        loop: true,
        typeSpeed: 80,
        backSpeed: 80,
        backDelay: 2000
    });
}

// Enhanced Scroll Active Function
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58, // Ajustado para 58px
            sectionId = current.getAttribute('id');

        const navLink = document.querySelector('.nav-menu a[href*=' + sectionId + ']');
        
        if (navLink) {
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
                navLink.classList.add('active'); // Usa 'active' como no seu HTML/CSS
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);