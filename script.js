// Store the last scroll position for each section
let sectionPositions = {};

// Function to store current section position
function storeSectionPosition(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        sectionPositions[sectionId] = section.offsetTop - 100; // Account for header
    }
}

// Function to scroll to stored position
function scrollToStoredPosition(sectionId) {
    if (sectionPositions[sectionId]) {
        setTimeout(() => {
            window.scrollTo({
                top: sectionPositions[sectionId],
                behavior: 'smooth'
            });
        }, 100);
    }
}

// Enhanced back button functionality
function setupBackButton() {
    // Get the referrer information from URL parameters or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const fromSection = urlParams.get('from');
    
    if (fromSection) {
        // Update back button to go to specific section
        const backButtons = document.querySelectorAll('.back-button');
        backButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = `index.html#${fromSection}`;
                setTimeout(() => {
                    scrollToStoredPosition(fromSection);
                }, 200);
            });
        });
    }
}

// Store positions when navigating away from homepage
function setupSectionNavigation() {
    const sectionLinks = document.querySelectorAll('.section h2 a');
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) {
                // Store current scroll position
                const sectionId = this.closest('.section').id;
                if (sectionId) {
                    localStorage.setItem('lastSection', sectionId);
                    localStorage.setItem('lastPosition', window.pageYOffset);
                }
            }
        });
    });
}

// Setup individual post links to include referrer information
function setupPostLinks() {
    const postLinks = document.querySelectorAll('.project-card h3 a');
    postLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('posts/')) {
                // Find which section this post belongs to
                const section = this.closest('.section');
                if (section && section.id) {
                    // Store the section info
                    localStorage.setItem('lastSection', section.id);
                    localStorage.setItem('lastPosition', window.pageYOffset);
                    
                    // Add section parameter to URL
                    const newHref = `${href}?from=${section.id}`;
                    this.setAttribute('href', newHref);
                }
            }
        });
    });
}

// Toggle content function with improved UX
function toggleContent(button) {
    const card = button.closest('.project-card');
    const fullText = card.querySelector('.project-full-text');
    
    if (fullText.style.display === 'none' || fullText.style.display === '') {
        fullText.style.display = 'block';
        button.textContent = 'See Less';
        // Smooth scroll to show the content
        setTimeout(() => {
            fullText.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 100);
    } else {
        fullText.style.display = 'none';
        button.textContent = 'See More';
    }
}

// Header background on scroll
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Add hover effects to project cards
function setupHoverEffects() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.01)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
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
}

// Check if returning from another page
function handlePageReturn() {
    const lastSection = localStorage.getItem('lastSection');
    const lastPosition = localStorage.getItem('lastPosition');
    
    if (lastSection && lastPosition && window.location.hash === '') {
        // We're returning to the homepage from another page
        setTimeout(() => {
            window.scrollTo({
                top: parseInt(lastPosition),
                behavior: 'smooth'
            });
        }, 100);
        
        // Clear the stored position
        localStorage.removeItem('lastSection');
        localStorage.removeItem('lastPosition');
    } else if (window.location.hash) {
        // Handle hash navigation
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupScrollEffects();
    setupHoverEffects();
    setupSmoothScrolling();
    setupSectionNavigation();
    setupPostLinks();
    setupBackButton();
    handlePageReturn();
    
    // Make toggleContent available globally
    window.toggleContent = toggleContent;
});

// Handle browser back/forward navigation
window.addEventListener('popstate', function(event) {
    handlePageReturn();
});

function showYear(year) {
  // show the matching year section
  document.querySelectorAll('.year-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === `year-${year}`);
  });
  // update active tab styling
  document.querySelectorAll('.year-tab').forEach(tab => {
    const isActive = tab.textContent.trim() === String(year);
    tab.classList.toggle('active', isActive);
  });
  // optional: scroll to that section
  const target = document.getElementById(`year-${year}`);
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleContent(btn) {
  const card = btn.closest('.project-card');
  const full = card && card.querySelector('.project-full-text');
  if (!full) return;
  const expanded = full.classList.toggle('expanded');
  btn.textContent = expanded ? 'See Less' : 'See More';
}

// expose to inline onclick handlers
window.showYear = showYear;
window.toggleContent = toggleContent;
