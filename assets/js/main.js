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
