// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursorFollower.style.left = cursorX + 'px';
    cursorFollower.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .menu-item, .gallery-item, input, textarea, select');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.background = 'var(--dark-pink)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'transparent';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// ===========================
// PRELOADER
// ===========================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('hidden');
    }, 2000);
});

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLL
// ===========================
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

// ===========================
// ACTIVE NAVIGATION LINK
// ===========================
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
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

// ===========================
// COUNTER ANIMATION
// ===========================
const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 20);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===========================
// MENU TABS
// ===========================
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Remove active class
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.classList.remove('active'));
        
        // Add active class
        btn.classList.add('active');
        const activePanel = document.querySelector(`[data-panel="${tabName}"]`);
        activePanel.classList.add('active');
        
        // Animate menu items
        const menuItems = activePanel.querySelectorAll('.menu-item');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('[data-scroll]').forEach(el => {
    scrollObserver.observe(el);
});

// ===========================
// PARALLAX EFFECT
// ===========================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    const heroBg = document.querySelector('.hero-bg-animation');
    
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (heroBg) {
        heroBg.style.transform = `scale(${1 + scrolled * 0.0005}) rotate(${scrolled * 0.01}deg)`;
    }
});

// ===========================
// FLOATING OBJECTS
// ===========================
const floatingItems = document.querySelectorAll('.float-item');
floatingItems.forEach((item, index) => {
    // Random initial position
    item.style.left = `${Math.random() * 100}%`;
    item.style.top = `${Math.random() * 100}%`;
    
    // Mouse move parallax
    document.addEventListener('mousemove', (e) => {
        const speed = 0.02;
        const x = (e.clientX - window.innerWidth / 2) * speed;
        const y = (e.clientY - window.innerHeight / 2) * speed;
        item.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===========================
// GALLERY TILT EFFECT
// ===========================
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ===========================
// MENU ITEM HOVER
// ===========================
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const image = item.querySelector('.menu-item-image');
        image.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        const image = item.querySelector('.menu-item-image');
        image.style.transform = 'scale(1) rotate(0deg)';
    });
});

// ===========================
// TESTIMONIALS SLIDER
// ===========================
const testimonialTrack = document.querySelector('.testimonial-track');
if (testimonialTrack) {
    // Clone testimonials for infinite loop
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach(testimonial => {
        const clone = testimonial.cloneNode(true);
        testimonialTrack.appendChild(clone);
    });
    
    // Pause on hover
    testimonialTrack.addEventListener('mouseenter', () => {
        testimonialTrack.style.animationPlayState = 'paused';
    });
    
    testimonialTrack.addEventListener('mouseleave', () => {
        testimonialTrack.style.animationPlayState = 'running';
    });
}

// ===========================
// RESERVATION FORM
// ===========================
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Create success modal
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            " onclick="this.remove()">
                <div style="
                    background: linear-gradient(135deg, #FFF5F9 0%, #FFE1EE 100%);
                    padding: 3rem;
                    border-radius: 30px;
                    box-shadow: 0 20px 60px rgba(255, 105, 180, 0.4);
                    text-align: center;
                    max-width: 500px;
                    animation: popIn 0.5s ease;
                " onclick="event.stopPropagation()">
                    <div style="font-size: 5rem; margin-bottom: 1rem;">🍓</div>
                    <h3 style="
                        font-family: 'Cormorant Garamond', serif;
                        font-size: 2.5rem;
                        margin-bottom: 1rem;
                        color: #2D2D2D;
                    ">Reservation Confirmed!</h3>
                    <p style="
                        color: #6B6B6B;
                        font-size: 1.1rem;
                        margin-bottom: 2rem;
                        line-height: 1.6;
                    ">Thank you! We'll see you soon at Berries. A confirmation will be sent to your email.</p>
                    <button onclick="this.parentElement.parentElement.remove()" style="
                        padding: 1rem 3rem;
                        background: linear-gradient(135deg, #FFB6D9 0%, #FF85C0 100%);
                        border: none;
                        border-radius: 50px;
                        color: white;
                        font-weight: 600;
                        font-size: 1.1rem;
                        cursor: pointer;
                        box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
                        transition: all 0.3s ease;
                    " onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                        Close
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Reset form
        reservationForm.reset();
        
        // Auto close after 5 seconds
        setTimeout(() => {
            if (modal.parentElement) {
                modal.remove();
            }
        }, 5000);
    });
}

// ===========================
// NEWSLETTER FORM
// ===========================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input').value;
        
        // Create success notification
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                bottom: 3rem;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #FFB6D9 0%, #FF85C0 100%);
                color: white;
                padding: 1.5rem 3rem;
                border-radius: 50px;
                box-shadow: 0 10px 30px rgba(255, 105, 180, 0.4);
                z-index: 10000;
                animation: slideUp 0.5s ease;
                font-weight: 600;
            ">
                🍓 Thank you for subscribing!
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Reset form
        newsletterForm.reset();
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
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

// ===========================
// RIPPLE EFFECT
// ===========================
const buttons = document.querySelectorAll('button:not(.hamburger)');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===========================
// MAGNETIC EFFECT FOR BUTTONS
// ===========================
buttons.forEach(btn => {
    btn.style.position = 'relative';
    btn.style.transition = 'transform 0.3s ease';
    
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ===========================
// SPARKLE EFFECT
// ===========================
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                sparkle.innerHTML = '✨';
                sparkle.style.position = 'absolute';
                sparkle.style.left = Math.random() * 100 + '%';
                sparkle.style.top = Math.random() * 100 + '%';
                sparkle.style.fontSize = '1.5rem';
                sparkle.style.pointerEvents = 'none';
                sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
                card.style.position = 'relative';
                card.appendChild(sparkle);
                
                setTimeout(() => sparkle.remove(), 1000);
            }, i * 100);
        }
    });
});

// ===========================
// IMAGE LAZY LOADING
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
};

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
        }
    });
}, observerOptions);

document.querySelectorAll('.menu-item-image, .gallery-item').forEach(img => {
    img.style.opacity = '0';
    img.style.transform = 'scale(0.9)';
    img.style.transition = 'all 0.6s ease';
    imageObserver.observe(img);
});

// ===========================
// ADDITIONAL CSS ANIMATIONS
// ===========================
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translate(-50%, 20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(0);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 40 - 20}px, -50px) scale(1);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// QUICK VIEW FUNCTIONALITY
// ===========================
document.querySelectorAll('.quick-view').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const menuItem = btn.closest('.menu-item');
        const itemName = menuItem.querySelector('h3').textContent;
        const itemPrice = menuItem.querySelector('.price').textContent;
        const itemDesc = menuItem.querySelector('.menu-desc').textContent;
        
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            " onclick="this.remove()">
                <div style="
                    background: linear-gradient(135deg, #FFF5F9 0%, #FFE1EE 100%);
                    padding: 3rem;
                    border-radius: 30px;
                    box-shadow: 0 20px 60px rgba(255, 105, 180, 0.4);
                    max-width: 500px;
                    width: 90%;
                    animation: popIn 0.5s ease;
                " onclick="event.stopPropagation()">
                    <h2 style="
                        font-family: 'Cormorant Garamond', serif;
                        font-size: 2.5rem;
                        color: #2D2D2D;
                        margin-bottom: 1rem;
                    ">${itemName}</h2>
                    <p style="
                        font-size: 2rem;
                        color: #FF69B4;
                        font-weight: 700;
                        margin-bottom: 1.5rem;
                    ">${itemPrice}</p>
                    <p style="
                        color: #6B6B6B;
                        line-height: 1.8;
                        margin-bottom: 2rem;
                        font-size: 1.1rem;
                    ">${itemDesc}</p>
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                            flex: 1;
                            padding: 1rem;
                            background: linear-gradient(135deg, #FFB6D9 0%, #FF85C0 100%);
                            border: none;
                            border-radius: 50px;
                            color: white;
                            font-weight: 600;
                            cursor: pointer;
                            font-size: 1rem;
                        ">Add to Order</button>
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
                            flex: 1;
                            padding: 1rem;
                            background: transparent;
                            border: 2px solid #FFB6D9;
                            border-radius: 50px;
                            color: #2D2D2D;
                            font-weight: 600;
                            cursor: pointer;
                            font-size: 1rem;
                        ">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    });
});

// ===========================
// RESERVE BUTTON IN NAVBAR
// ===========================
const navReserveBtn = document.querySelector('.reserve-btn');
if (navReserveBtn) {
    navReserveBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-dependent code here
    });
}, { passive: true });

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log('%c🍓 Welcome to Berries Café! ', 'font-size: 24px; font-weight: bold; color: #FF69B4; background: #FFF0F7; padding: 15px; border-radius: 10px;');
console.log('%c✨ Crafted with love and magic ', 'font-size: 16px; color: #FFB6D9; font-style: italic;');
console.log('%c💻 Premium Website by Your Developer ', 'font-size: 14px; color: #FF85C0;');

// ===========================
// PREVENT RIGHT CLICK (OPTIONAL)
// ===========================
// Uncomment if you want to protect images
// document.addEventListener('contextmenu', (e) => {
//     if (e.target.tagName === 'IMG') {
//         e.preventDefault();
//     }
// });

// ===========================
// INITIALIZATION COMPLETE
// ===========================
console.log('%c✅ All features loaded successfully!', 'color: #25D366; font-weight: bold;');
