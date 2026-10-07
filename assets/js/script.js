function closeModal() {
    const modal = document.getElementById('welcome-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// ================= JAVASCRIPT LOGIC =================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Hamburger Navigation Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Search Dropdown Toggle Logic
    const searchBtn = document.getElementById('search-toggle-btn');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    if (searchBtn && searchDropdown) {
        // Toggle dropdown on search button click
        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            searchDropdown.classList.toggle('hidden');
            if (!searchDropdown.classList.contains('hidden') && searchInput) {
                searchInput.focus();
            }
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (searchContainer && !searchContainer.contains(e.target)) {
                searchDropdown.classList.add('hidden');
            }
        });
    }

    // 3. Accordion Interactive Toggle Logic for Table of Contents
    const accordionBtns = document.querySelectorAll('.accordion-btn');

    accordionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                if (icon) icon.style.transform = 'rotate(0deg)';
            } else {
                // Close other opened accordions
                document.querySelectorAll('.accordion-content').forEach(c => c.style.maxHeight = null);
                document.querySelectorAll('.accordion-btn i').forEach(i => i.style.transform = 'rotate(0deg)');

                content.style.maxHeight = content.scrollHeight + 'px';
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 4. Counter Animation on Scroll (Stats Section)
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats-section');
    let animated = false;

    if (statsSection && counters.length > 0) {
        window.addEventListener('scroll', () => {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight;

            if (sectionPos < screenPos && !animated) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const speed = target / 50;

                    const updateCount = () => {
                        count += speed;
                        if (count < target) {
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 30);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                });
                animated = true;
            }
        });
    }

    // 5. Dynamic Review Submission Handler
    const reviewForm = document.getElementById('review-form');
    const reviewsGrid = document.getElementById('reviews-grid');

    if (reviewForm && reviewsGrid) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('rev-name').value;
            const text = document.getElementById('rev-text').value;

            const newCard = document.createElement('div');
            newCard.className = 'bg-white p-6 rounded-2xl shadow-sm border border-gray-100';
            newCard.innerHTML = `
                <div class="text-yellow-400 text-sm mb-3"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                <p class="text-gray-600 text-sm mb-4">"${text}"</p>
                <div class="font-bold text-gray-800 text-sm">- ${name}</div>
            `;

            reviewsGrid.appendChild(newCard);
            reviewForm.reset();
            alert('আপনার মতামতের জন্য ধন্যবাদ!');
        });
    }

    // 6. Checkout Form Submission Handler
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('ধন্যবাদ! আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। দ্রুতই যোগাযোগ করা হবে।');
        });
    }

    // 7. Newsletter Subscription Success Alert
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('ধন্যবাদ! আমাদের নিউজলেটারে সাবস্ক্রাইব করার জন্য।');
        });
    }

});

// --- Active Link Highlighter ---
    const currentPath = window.location.pathname.split("/").pop().toLowerCase() || 'index.html';
    const navLinks = document.querySelectorAll('header nav a, #mobileMenu a');
 
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href) return;
 
        const linkFile = href.split('#')[0].toLowerCase();
 
        if ((currentPath === '' || currentPath === 'index.html') && (href === '#home' || linkFile === 'index.html' || linkFile === '')) {
            link.classList.remove('text-gray-600', 'font-medium');
            link.classList.add('text-green-600', 'font-semibold');
        } else if (linkFile && currentPath.includes(linkFile)) {
            link.classList.remove('text-gray-600', 'font-medium');
            link.classList.add('text-green-600', 'font-semibold');
        } else {
            link.classList.remove('text-green-600', 'font-semibold');
            link.classList.add('text-gray-600', 'font-medium');
        }
    });
 