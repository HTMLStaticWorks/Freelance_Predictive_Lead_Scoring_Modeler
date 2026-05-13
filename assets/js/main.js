/* 
   Scorelytics - Main JavaScript
*/

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    const themeIcons = document.querySelectorAll('.theme-toggle-icon');
    const currentTheme = localStorage.getItem('theme') || 'light';

    const updateThemeIcons = (theme) => {
        themeIcons.forEach(icon => {
            if (theme === 'dark') {
                icon.classList.remove('ph-moon');
                icon.classList.add('ph-sun');
            } else {
                icon.classList.remove('ph-sun');
                icon.classList.add('ph-moon');
            }
        });
    };

    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcons(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcons(newTheme);
        });
    });

    // RTL Toggle Logic
    const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');

    const toggleRTL = () => {
        const currentDir = document.documentElement.getAttribute('dir');
        if (currentDir === 'rtl') {
            document.documentElement.setAttribute('dir', 'ltr');
        } else {
            document.documentElement.setAttribute('dir', 'rtl');
        }
    };

    const addMobileHomeLinks = () => {
        document.querySelectorAll('.navbar .nav-item.dropdown').forEach(dropdown => {
            const toggle = dropdown.querySelector('.nav-link.dropdown-toggle');
            if (!toggle || toggle.textContent.trim() !== 'Home') return;
            dropdown.classList.add('home-dropdown');
            const parent = dropdown.parentElement;
            if (parent && parent.querySelector('.mobile-home-link')) return;
            const items = Array.from(dropdown.querySelectorAll('.dropdown-item'));
            // Only add the second item (Home 2) as a separate link
            if (items.length > 1) {
                const item = items[1];
                const li = document.createElement('li');
                li.className = 'nav-item d-lg-none mobile-home-link';
                const anchor = document.createElement('a');
                anchor.className = 'nav-link';
                anchor.href = item.href;
                anchor.textContent = item.textContent.trim();
                li.appendChild(anchor);
                dropdown.insertAdjacentElement('afterend', li);
            }
        });
        
        // Highlight active mobile home link
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        document.querySelectorAll('.mobile-home-link .nav-link').forEach(link => {
            const href = link.getAttribute('href').split('/').pop();
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    };


    const originalParentByNode = new WeakMap();
    const originalNextSiblingByNode = new WeakMap();
    const moveNavTogglesToCollapse = () => {
        document.querySelectorAll('.navbar .nav-toggles').forEach(toggles => {
            const navbar = toggles.closest('.navbar');
            const collapse = navbar?.querySelector('.navbar-collapse');
            if (!collapse) return;

            if (window.innerWidth <= 1024) {
                if (!collapse.contains(toggles)) {
                    originalParentByNode.set(toggles, toggles.parentElement);
                    originalNextSiblingByNode.set(toggles, toggles.nextSibling);
                    collapse.appendChild(toggles);
                }
            } else {
                if (collapse.contains(toggles) && originalParentByNode.has(toggles)) {
                    const originalParent = originalParentByNode.get(toggles);
                    const originalNextSibling = originalNextSiblingByNode.get(toggles);
                    if (originalNextSibling && originalParent.contains(originalNextSibling)) {
                        originalParent.insertBefore(toggles, originalNextSibling);
                    } else {
                        originalParent.appendChild(toggles);
                    }
                }
            }
        });
    };

    const updateResponsiveNav = () => {
        addMobileHomeLinks();
        moveNavTogglesToCollapse();
    };

    updateResponsiveNav();
    window.addEventListener('resize', updateResponsiveNav);

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleRTL);
    });

    // Scroll Top Button
    const scrollTopBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled', 'shadow-sm');
        } else {
            navbar.classList.remove('navbar-scrolled', 'shadow-sm');
        }
    });

    // Form Validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
});
