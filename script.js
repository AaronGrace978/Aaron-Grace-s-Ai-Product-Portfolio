/* ===================================
   AARON GRACE PORTFOLIO - SCRIPTS
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    initProjectFilter();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initIntersectionObserver();
    initParallaxEffects();
    initMobileProjectsToggle();
});

/* Project Category Filter */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.dataset.category;

            // Filter projects with animation
            projectCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* Smooth Scrolling for Navigation */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* Navbar Scroll Effect */
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add background on scroll
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

/* Intersection Observer for Animations */
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Stagger children animations
                const children = entry.target.querySelectorAll('.project-card, .highlight-card, .skill-category, .contact-card');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                    child.classList.add('animate-in');
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

/* Parallax Effects */
function initParallaxEffects() {
    const orbitContainer = document.querySelector('.orbit-container');
    
    if (orbitContainer) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 50;
            const y = (window.innerHeight / 2 - e.pageY) / 50;
            
            orbitContainer.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}

/* Add CSS for animations */
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card, .highlight-card, .skill-category, .contact-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease, background 0.25s ease, box-shadow 0.25s ease;
    }
    
    .animate-in .project-card,
    .animate-in .highlight-card,
    .animate-in .skill-category,
    .animate-in .contact-card {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Make hero section visible immediately */
    .hero {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(style);

/* Console Easter Egg */
console.log(`
%c◈ Aaron Grace Portfolio
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Building AI that understands, 
remembers, and connects.

25+ Projects | 100K+ Lines of Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`, 
'color: #6366f1; font-size: 18px; font-weight: bold;',
'color: #8b5cf6; font-size: 12px;'
);

/* Stats Counter Animation */
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const isPlus = text.includes('+');
        const isK = text.includes('K');
        let target = parseInt(text.replace(/[^0-9]/g, ''));
        
        if (isK) target = target * 1000;
        
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            let display = Math.floor(current);
            if (isK) display = Math.floor(current / 1000) + 'K';
            if (isPlus) display += '+';
            
            stat.textContent = display;
        }, stepTime);
    });
}

// Trigger counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

const hero = document.querySelector('.hero');
if (hero) heroObserver.observe(hero);

/* Project Card Click to Expand */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't expand if clicking a link
        if (e.target.tagName === 'A') return;
        
        openProjectModal(this);
    });
    
    card.addEventListener('mouseenter', function() {
        this.style.cursor = 'pointer';
    });
});

/* Project Modal System */
function openProjectModal(card) {
    // Extract all content from the card - clone first to avoid modifying original
    const cardClone = card.cloneNode(true);
    
    // Remove fade gradient if it exists
    const fadeGradient = cardClone.querySelector('.features-fade');
    if (fadeGradient) fadeGradient.remove();
    
    // Extract content
    const badgeEl = cardClone.querySelector('.project-badge');
    const badge = badgeEl ? badgeEl.textContent.trim() : '';
    
    const iconEl = cardClone.querySelector('.project-icon');
    const icon = iconEl ? iconEl.textContent.trim() : '⚡';
    
    const titleEl = cardClone.querySelector('.project-title');
    const title = titleEl ? titleEl.textContent.trim() : 'Project';
    
    const tagEl = cardClone.querySelector('.project-tag');
    const tag = tagEl ? tagEl.textContent.trim() : '';
    
    const descEl = cardClone.querySelector('.project-description');
    const description = descEl ? descEl.textContent.trim() : 'No description available.';
    
    // Get features HTML - remove any fade gradients
    const featuresEl = cardClone.querySelector('.project-features');
    let featuresHTML = '<p>No features listed.</p>';
    if (featuresEl) {
        // Clone features to avoid modifying original
        const featuresClone = featuresEl.cloneNode(true);
        const fade = featuresClone.querySelector('.features-fade');
        if (fade) fade.remove();
        featuresHTML = featuresClone.innerHTML.trim();
        if (!featuresHTML) featuresHTML = '<p>No features listed.</p>';
    }
    
    // Get tech HTML
    const techEl = cardClone.querySelector('.project-tech');
    const techHTML = techEl ? techEl.innerHTML.trim() : '';
    
    // Debug: Log extracted content
    console.log('Modal Content:', { title, description: description.substring(0, 50), featuresLength: featuresHTML.length, techLength: techHTML.length });
    
    // Create modal if it doesn't exist
    let modal = document.getElementById('project-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.className = 'project-modal';
        document.body.appendChild(modal);
    }
    
    // Build modal HTML with all content - ensure we always have content
    const modalHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close" aria-label="Close">&times;</button>
            <div class="modal-body">
                ${badge ? `<div class="modal-badge">${escapeHtml(badge)}</div>` : ''}
                <div class="modal-header">
                    ${icon ? `<div class="modal-icon">${icon}</div>` : '<div class="modal-icon">⚡</div>'}
                    <div class="modal-title-section">
                        <h2 class="modal-title">${escapeHtml(title)}</h2>
                        ${tag ? `<span class="modal-tag">${escapeHtml(tag)}</span>` : ''}
                    </div>
                </div>
                <p class="modal-description">${escapeHtml(description)}</p>
                <div class="modal-features">${featuresHTML}</div>
                ${techHTML ? `<div class="modal-tech">
                    <h4>Technologies Used</h4>
                    <div class="tech-tags-container">${techHTML}</div>
                </div>` : ''}
            </div>
        </div>
    `;
    
    console.log('Setting modal HTML, length:', modalHTML.length);
    modal.innerHTML = modalHTML;
    
    // Attach close handlers
    const backdrop = modal.querySelector('.modal-backdrop');
    const closeBtn = modal.querySelector('.modal-close');
    
    if (backdrop) backdrop.addEventListener('click', closeProjectModal);
    if (closeBtn) closeBtn.addEventListener('click', closeProjectModal);
    
    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Animate in
    requestAnimationFrame(() => {
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }
    });
}

/* Escape HTML helper */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.querySelector('.modal-content').style.transform = 'scale(0.95)';
        modal.querySelector('.modal-content').style.opacity = '0';
        
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 200);
    }
}

/* Keyboard Navigation */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        if (modal && modal.classList.contains('active')) {
            closeProjectModal();
        } else {
            // Reset filter to all if modal not open
            document.querySelector('.filter-btn[data-category="all"]')?.click();
        }
    }
});

/* Truncate features in grid view, full view in modal */
document.querySelectorAll('.project-card:not(.modal-card) .project-features').forEach(features => {
    features.style.maxHeight = '280px';
    features.style.overflow = 'hidden';
    features.style.position = 'relative';
    
    // Add fade gradient at bottom
    const fadeGradient = document.createElement('div');
    fadeGradient.className = 'features-fade';
    fadeGradient.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: linear-gradient(transparent, var(--bg-card));
        pointer-events: none;
    `;
    features.style.position = 'relative';
    features.appendChild(fadeGradient);
});

/* Mobile Projects Toggle - Show/Hide projects on mobile */
function initMobileProjectsToggle() {
    const toggleBtn = document.getElementById('mobile-projects-toggle');
    const projectsGrid = document.querySelector('.projects-grid');
    const categoryFilter = document.querySelector('.category-filter');
    
    if (!toggleBtn || !projectsGrid) return;
    
    let isExpanded = false;
    
    toggleBtn.addEventListener('click', () => {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // Show projects
            projectsGrid.classList.add('mobile-visible');
            if (categoryFilter) categoryFilter.classList.add('mobile-visible');
            toggleBtn.classList.add('expanded');
            toggleBtn.querySelector('.toggle-text').textContent = 'Hide Projects';
            
            // Scroll to projects section smoothly
            setTimeout(() => {
                projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        } else {
            // Hide projects
            projectsGrid.classList.remove('mobile-visible');
            if (categoryFilter) categoryFilter.classList.remove('mobile-visible');
            toggleBtn.classList.remove('expanded');
            toggleBtn.querySelector('.toggle-text').textContent = 'Show Projects';
        }
    });
    
    // Check if we're on mobile and adjust visibility
    function checkMobileState() {
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            // On desktop, always show projects
            projectsGrid.classList.remove('mobile-visible');
            if (categoryFilter) categoryFilter.classList.remove('mobile-visible');
            toggleBtn.classList.remove('expanded');
            toggleBtn.querySelector('.toggle-text').textContent = 'Show Projects';
            isExpanded = false;
        }
    }
    
    // Check on resize
    window.addEventListener('resize', checkMobileState);
    
    // Initial check
    checkMobileState();
}
