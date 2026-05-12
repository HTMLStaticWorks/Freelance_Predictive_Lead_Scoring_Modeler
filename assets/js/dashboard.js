/* 
   Scorelytics - Dashboard Logic
*/

document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebarCollapse');
    const sidebarMobileToggle = document.getElementById('sidebarMobileToggle');
    const sidebar = document.getElementById('sidebar');
    
    const toggleSidebar = () => {
        if (window.innerWidth < 992) {
            sidebar.classList.toggle('show');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    };

    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
    if (sidebarMobileToggle) sidebarMobileToggle.addEventListener('click', toggleSidebar);

    // Dashboard Section Switching (Simulation)
    const navLinks = document.querySelectorAll('#sidebar .nav-link');
    const sections = document.querySelectorAll('.dashboard-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Show target section
                sections.forEach(section => {
                    section.classList.add('d-none');
                    if (section.id === targetId) {
                        section.classList.remove('d-none');
                    }
                });

                // Close sidebar on mobile after clicking
                if (window.innerWidth < 992) {
                    sidebar.classList.remove('show');
                }
            }
        });
    });

    // File Upload Simulation
    const dropzone = document.getElementById('dropzone');
    if (dropzone) {
        ['dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropzone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        dropzone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                simulateUpload(files[0].name);
            }
        });
    }
});

function simulateUpload(filename) {
    const statusPanel = document.getElementById('upload-status');
    if (!statusPanel) return;

    statusPanel.classList.remove('d-none');
    statusPanel.innerHTML = `
        <div class="d-flex align-items-center gap-3">
            <div class="spinner-border spinner-border-sm text-primary" role="status"></div>
            <span>Analyzing ${filename}...</span>
        </div>
    `;

    setTimeout(() => {
        statusPanel.innerHTML = `
            <div class="alert alert-success d-flex align-items-center gap-2 mb-0">
                <i class="ph-check-circle"></i>
                <span>Successfully processed ${filename}. 8,400 leads identified.</span>
            </div>
        `;
    }, 2000);
}
