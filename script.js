/* Navigation Active State */
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.ul-list li');
    const sections = document.querySelectorAll('section[id]');
    
    // Highlight on scroll
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.querySelector('a').getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Highlight on click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    window.addEventListener('scroll', highlightNavOnScroll);
    highlightNavOnScroll(); // Initial call
});

/* Scroll Reveal Animation */
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active-reveal');
        } else {
            reveal.classList.remove('active-reveal');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

/* Blog Pagination and Filtering Logic */
document.addEventListener('DOMContentLoaded', () => {
    const allCards = document.querySelectorAll('.blog-item');
    const paginationContainer = document.getElementById('pagination');
    const categorySelect = document.getElementById('category-select');
    
    if (!allCards.length || !paginationContainer || !categorySelect) return;

    const cardsPerPage = 10;
    let currentPage = 1;
    let currentFilter = 'all';
    let filteredCards = Array.from(allCards);

    // Filter functionality with select dropdown
    categorySelect.addEventListener('change', (e) => {
        currentFilter = e.target.value;
        
        // Filter cards
        if (currentFilter === 'all') {
            filteredCards = Array.from(allCards);
        } else {
            filteredCards = Array.from(allCards).filter(card => 
                card.dataset.category === currentFilter
            );
        }
        
        // Reset to page 1
        currentPage = 1;
        showPage(1);
    });

    function showPage(page) {
        const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;

        // Hide all cards first
        allCards.forEach(card => {
            card.style.display = 'none';
        });

        // Show filtered cards for current page
        filteredCards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.style.display = 'flex';
                // Add fade-in animation
                card.style.opacity = 0;
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s';
                    card.style.opacity = 1;
                }, 50);
            }
        });
        
        updateButtons(totalPages);
    }

    function updateButtons(totalPages) {
        paginationContainer.innerHTML = '';
        
        // Previous Button
        if (currentPage > 1) {
            const prevBtn = document.createElement('button');
            prevBtn.textContent = '<';
            prevBtn.className = 'page-btn';
            prevBtn.onclick = () => {
                currentPage--;
                showPage(currentPage);
            };
            paginationContainer.appendChild(prevBtn);
        }

        // Page Numbers
        for (let i = 1; i <= totalPages; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            btn.onclick = () => {
                currentPage = i;
                showPage(currentPage);
            };
            paginationContainer.appendChild(btn);
        }

        // Next Button
        if (currentPage < totalPages) {
            const nextBtn = document.createElement('button');
            nextBtn.textContent = '>';
            nextBtn.className = 'page-btn';
            nextBtn.onclick = () => {
                currentPage++;
                showPage(currentPage);
            };
            paginationContainer.appendChild(nextBtn);
        }
    }

    // Initialize
    showPage(1);
});

// Certificate Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dots .dot');

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
    });

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function nextCertificate() {
    showSlide(currentSlide + 1);
}

function prevCertificate() {
    showSlide(currentSlide - 1);
}

function goToSlide(index) {
    showSlide(index);
}

// Auto-play carousel (optional - every 5 seconds)
// setInterval(() => {
//     nextCertificate();
// }, 5000);

// Lightbox Functions
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.classList.add('active');
    lightboxImg.src = imageSrc;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Close lightbox on ESC key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show/Hide scroll button based on scroll position
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }
});
