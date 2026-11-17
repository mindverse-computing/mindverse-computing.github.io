/**
 * Mindverse Computing - Investor Enhancement Effects
 * Interactive JavaScript for premium experience
 */

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== ANIMATED PARTICLES BACKGROUND =====
  function createParticles() {
    const hero = document.querySelector('.hero-enhanced');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'quantum-particles';
    
    // Create 30 particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 2-6px
      const size = Math.random() * 4 + 2;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      
      // Random position
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      
      // Random animation delay and duration
      particle.style.animationDelay = Math.random() * 20 + 's';
      particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
      
      particlesContainer.appendChild(particle);
    }
    
    hero.insertBefore(particlesContainer, hero.firstChild);
  }
  
  // ===== SCROLL REVEAL ANIMATIONS =====
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOnScroll = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, {
      threshold: 0.15
    });
    
    revealElements.forEach(el => revealOnScroll.observe(el));
  }
  
  // ===== ANIMATED STATISTICS COUNTER =====
  function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        element.textContent = end.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }
  
  function initStatCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          
          const targetValue = parseInt(entry.target.dataset.value);
          const prefix = entry.target.dataset.prefix || '';
          const suffix = entry.target.dataset.suffix || '';
          
          let endValue = targetValue;
          entry.target.textContent = '0';
          
          animateValue(entry.target, 0, endValue, 2000);
          
          // Add prefix/suffix after animation
          setTimeout(() => {
            entry.target.textContent = prefix + entry.target.textContent + suffix;
          }, 2000);
        }
      });
    }, {
      threshold: 0.5
    });
    
    statNumbers.forEach(stat => counterObserver.observe(stat));
  }
  
  // ===== CTA BUTTON PULSE ON HOVER =====
  function initCTAPulse() {
    const ctaButtons = document.querySelectorAll('.cta-primary-glow');
    
    ctaButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        button.classList.add('pulse');
      });
      
      button.addEventListener('mouseleave', () => {
        button.classList.remove('pulse');
      });
    });
  }
  
  // ===== GLASS CARD TILT EFFECT =====
  function initCardTilt() {
    const cards = document.querySelectorAll('.glass-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }
  
  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }
  
  // ===== INITIALIZE ALL EFFECTS =====
  createParticles();
  initScrollReveal();
  initStatCounters();
  initCTAPulse();
  initCardTilt();
  initSmoothScroll();
  
  // Add reveal class to elements by default
  document.querySelectorAll('.glass-card, .highlight-card').forEach((el, index) => {
    el.classList.add('reveal-on-scroll');
    el.style.transitionDelay = (index * 0.1) + 's';
  });
  
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle function for scroll events
function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return func(...args);
  };
}
