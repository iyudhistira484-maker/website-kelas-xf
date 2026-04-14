// script.js - JavaScript lengkap untuk website Kelas X-F

// ===== INISIALISASI AOS =====
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
    mirror: false
});

// ===== NAVBAR RESPONSIVE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Tutup mobile menu saat link diklik
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navbar link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== GALERY DYNAMIC =====
const galleryImages = [
    'https://img.sanishtech.com/u/52e45d9d37c4bae6d6281c6d4712e503.jpg',
    'https://img.sanishtech.com/u/b80cf9b5aabb2f1cc99c5c618dc64b7c.jpg',
    'https://www.image2url.com/r2/default/images/1776138412086-1c9cf6bf-3b26-447d-ab78-f91c44c43a85.jpg',
    'https://www.image2url.com/r2/default/images/1776138508161-91bd0d74-7ee7-4590-9e8e-9a4a8ae4e419.jpg',
    'https://i.ibb.co.com/gMX56YxM/1776140093538.webp',
    'https://i.ibb.co.com/gMX56YxM/1776140093538.webp',
    'https://i.ibb.co.com/gMX56YxM/1776140093538.webp',
    'https://i.ibb.co.com/gMX56YxM/1776140093538.webp',
    'https://i.ibb.co.com/gMX56YxM/1776140093538.webp',
    'https://i.ibb.co.com/gMX56YxM/1776140093538.webp',
    'https://i.ibb.co.com/gMX56YxM/1776140093538.webp',
    'https://i.ibb.co.com/gMX56YxM/1776140093538.webp'
];

function createGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    galleryImages.forEach((imgSrc, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${imgSrc}" alt="Gallery ${index + 1}" loading="lazy">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        galleryItem.style.animationDelay = `${index * 0.1}s`;
        galleryGrid.appendChild(galleryItem);
    });
}

// Gallery lightbox effect
document.addEventListener('click', (e) => {
    if (e.target.closest('.gallery-item')) {
        const imgSrc = e.target.closest('.gallery-item').querySelector('img').src;
        openLightbox(imgSrc);
    }
});

function openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="Fullscreen">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
}

// ===== EVENTS CALENDAR =====
const eventsData = [
    {
        date: 'Senin',
        title: 'Jadwal Hari ke  1',
        description: 'Bhs indonesia, Agama, Biologi, Kimia, PJOK.',
        icon: 'fas fa-calendar-alt'
    },
    {
        date: 'Selasa',
        title: 'Jadwal Hari ke 2',
        description: 'Sosiologi, Sejarah, Matematika, Fisika, Ekonomi.',
        icon: 'fas fa-calendar-alt'
    },
    {
        date: 'Rabu',
        title: 'Jadwal hari ke 3',
        description: 'Bhs Jawa, Seni budaya, Informatika, Kimia, Bhs Indonesia.',
        icon: 'fas fa-calendar-alt'
    },
    {
        date: 'Kamis',
        title: 'Jadwal Hari ke 4',
        description: 'Geografi, Bhs Inggris, BK, Matematika, Biologi, PPKN.',
        icon: 'fas fa-calendar-alt'
    },
    {
        date: 'Jumat',
        title: 'Jadwal Hari ke 5',
        description: 'Bhs Inggris, Sejarah, Fisika, Geografi, Ekonomi, Agama.',
        icon: 'fas fa-calendar-alt'
    }
];

function createEvents() {
    const eventCalendar = document.getElementById('event-calendar');
    eventsData.forEach(event => {
        const eventItem = document.createElement('div');
        eventItem.className = 'event-item';
        eventItem.innerHTML = `
            <div class="event-date">
                <i class="${event.icon}"></i>
                <div>
                    <strong>${event.date}</strong>
                </div>
            </div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
        `;
        eventCalendar.appendChild(eventItem);
    });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Terima kasih! Pesan Anda telah terkirim. Kami akan balas dalam 24 jam.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// ===== PARTICLE BACKGROUND (OPTIONAL) =====
function createParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        hero.appendChild(particle);
    }
}

// ===== SMOOTH SCROLLING FOR ALL LINKS =====
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

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.student-card, .achievement-item, .event-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ===== LAZY LOADING IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== INIT ALL FUNCTIONS =====
document.addEventListener('DOMContentLoaded', () => {
    createGallery();
    createEvents();
    
    // Trigger AOS refresh
    setTimeout(() => {
        AOS.refresh();
    }, 100);
    
    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    });
    
    // Typing effect for hero title (optional)
    typeWriter();
});

function typeWriter() {
    const heroTitle = document.querySelector('.hero h1');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    function type() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }
    setTimeout(type, 500);
}

// ===== PERFORMANCE OPTIMIZATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preload critical images
const criticalImages = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
];

criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
});

// ===== PWA SERVICE WORKER (OPTIONAL) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered'))
            .catch(err => console.log('SW registration failed'));
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
});

// ===== MEMORY MANAGEMENT =====
let rafId;
function loop() {
    // Animation loop if needed
    rafId = requestAnimationFrame(loop);
}
loop();

// ===== END OF SCRIPT =====
console.log('🚀 The website has been deployed. The creator is Muhammad Ilham.The website has been deployed. The creator is Muhammad Ilham Yudhistira');
