// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Будь ласка, заповніть всі обов\'язкові поля');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Будь ласка, введіть коректний email');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Надсилається...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateNumber(stat, 0, target, 2000);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe stats section
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Number animation function
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + (element.textContent.includes('+') ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add active class to current navigation item
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active navigation link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #d32f2f !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #d32f2f;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    font-size: 18px;
`;

document.body.appendChild(scrollToTopBtn);

// Оптимізація зображень (lazy loading тільки для hero, fallback для каталогу)
function optimizeImages() {
    // Hero section
    const heroImgs = document.querySelectorAll('.hero img');
    heroImgs.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/400x300?text=No+Image';
        };
    });
    // Каталог продукції
    const catalogImgs = document.querySelectorAll('.products-grid img');
    catalogImgs.forEach(img => {
        img.removeAttribute('loading');
        img.decoding = 'async';
        img.onerror = function() {
            if (this.parentElement && this.parentElement.classList.contains('product-image')) {
                this.parentElement.classList.add('no-image');
            }
            this.style.display = 'none';
        };
        img.onload = function() {
            if (this.parentElement && this.parentElement.classList.contains('product-image')) {
                this.parentElement.classList.remove('no-image');
            }
            this.style.display = '';
        };
        // Якщо зображення вже не завантажилось (наприклад, 404), додаємо клас
        if (img.complete && img.naturalWidth === 0) {
            if (img.parentElement && img.parentElement.classList.contains('product-image')) {
                img.parentElement.classList.add('no-image');
            }
            img.style.display = 'none';
        }
    });
}

// Плавна поява секцій (без heavy анімацій)
function fadeInSections() {
    const elements = document.querySelectorAll('.testimonial-card, .stat-card, .products-grid, .about, .contact, .footer');
    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.7s cubic-bezier(.23,1.01,.32,1)';
        setTimeout(() => {
            el.style.opacity = '1';
        }, 200 + i * 100);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    optimizeImages();
    fadeInSections();
});

// Hero carousel logic
(function() {
  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const leftBtn = document.querySelector('.carousel-arrow.left');
  const rightBtn = document.querySelector('.carousel-arrow.right');
  const dotsContainer = document.querySelector('.carousel-dots');
  let current = 0;
  let interval;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
    });
    Array.from(dotsContainer.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
    current = idx;
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }
  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  // Dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
  });
  showSlide(0);

  // Arrows
  rightBtn.addEventListener('click', nextSlide);
  leftBtn.addEventListener('click', prevSlide);

  // Autoplay
  function startAuto() { interval = setInterval(nextSlide, 4000); }
  function stopAuto() { clearInterval(interval); }
  startAuto();
  dotsContainer.addEventListener('mouseenter', stopAuto);
  dotsContainer.addEventListener('mouseleave', startAuto);
  rightBtn.addEventListener('mouseenter', stopAuto);
  rightBtn.addEventListener('mouseleave', startAuto);
  leftBtn.addEventListener('mouseenter', stopAuto);
  leftBtn.addEventListener('mouseleave', startAuto);

  // Swipe for mobile
  let startX = null;
  document.querySelector('.hero-carousel').addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });
  document.querySelector('.hero-carousel').addEventListener('touchend', e => {
    if (startX === null) return;
    let dx = e.changedTouches[0].clientX - startX;
    if (dx > 50) prevSlide();
    if (dx < -50) nextSlide();
    startX = null;
  });
})();

// Анімація лічильника поставок з часовим зростанням
function animateCounter() {
    const counter = document.getElementById('wholesale-counter');
    if (!counter) return;
    
    // Базове число поставок на початок 2024 року
    const baseDate = new Date('2024-01-01').getTime();
    const currentDate = new Date().getTime();
    const daysPassed = Math.floor((currentDate - baseDate) / (1000 * 60 * 60 * 24));
    
    // Середня кількість поставок на день (приблизно 3-4)
    const baseCount = 1000 + (daysPassed * 3.5);
    let current = Math.floor(baseCount);
    
    // Оновлюємо лічильник кожну секунду
    const updateCounter = () => {
        current += 0.1; // Додаємо 0.1 поставки кожну секунду
        counter.textContent = Math.floor(current).toLocaleString();
    };
    
    // Запускаємо оновлення кожну секунду
    const interval = setInterval(updateCounter, 1000);
    
    // Зберігаємо інтервал для можливого зупинення
    counter.dataset.interval = interval;
}

// Запуск анімації лічильника при скролі
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter();
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Спостерігаємо за лічильником
document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('wholesale-counter');
    if (counter) {
        counterObserver.observe(counter);
    }
});

// Анімація статистики в реальному часі
function animateStats() {
    const stats = [
        { id: 'production-counter', target: 2500, suffix: '' },
        { id: 'delivery-counter', target: 45, suffix: '' },
        { id: 'satisfaction-counter', target: 98, suffix: '%' },
        { id: 'experience-counter', target: 15, suffix: '' }
    ];
    
    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        if (!element) return;
        
        const target = stat.target;
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + stat.suffix;
        }, 16);
    });
}

// Інтерактивна карта
function initInteractiveMap() {
    const mapPoints = document.querySelectorAll('.map-point');
    
    mapPoints.forEach(point => {
        point.addEventListener('click', () => {
            // Анімація кліку
            point.style.transform = 'scale(1.8)';
            setTimeout(() => {
                point.style.transform = 'scale(1)';
            }, 200);
            
            // Показуємо детальну інформацію
            const tooltip = point.querySelector('.point-tooltip');
            if (tooltip) {
                tooltip.style.opacity = '1';
                setTimeout(() => {
                    tooltip.style.opacity = '0';
                }, 3000);
            }
        });
    });
}

// Покращена продуктивність
function performanceOptimizations() {
    // Використовуємо Intersection Observer для анімацій
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Запускаємо анімацію статистики
                if (entry.target.classList.contains('live-stats')) {
                    animateStats();
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Спостерігаємо за секціями
    const sections = document.querySelectorAll('.testimonials, .live-stats, .interactive-map');
    sections.forEach(section => observer.observe(section));
}

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', () => {
    optimizeImages();
    performanceOptimizations();
    initInteractiveMap();
    
    // Додаємо плавну появу елементів
    const animateElements = document.querySelectorAll('.testimonial-card, .stat-card');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

console.log('М\'ясна Майстерня - веб-сайт завантажено успішно!'); 