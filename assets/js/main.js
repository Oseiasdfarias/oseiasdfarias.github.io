// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('light-theme')) {
        themeToggle.classList.remove('uil-moon');
        themeToggle.classList.add('uil-sun');
    } else {
        themeToggle.classList.remove('uil-sun');
        themeToggle.classList.add('uil-moon');
    }
});

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

// Active Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
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

// Typing Effect
var typingEffect = new Typed(".typedText",{
    strings : ["Desenvolvedor Backend", "Engenheiro de Dados", "Apaixonado por Java | Python"],
    loop : true,
    typeSpeed : 80, 
    backSpeed : 80,
    backDelay : 2000
});

// Enhanced Scroll Active Function
function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}

window.addEventListener('scroll', scrollActive);