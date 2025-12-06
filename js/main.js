// DTV Business Process Report - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initMermaid();
    initTabs();
    initAccordions();
    initSmoothScroll();
    initAnimations();
});

// ===== Mobile Menu =====
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// ===== Mermaid Initialization =====
function initMermaid() {
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'base',
            themeVariables: {
                primaryColor: '#003366',
                primaryTextColor: '#ffffff',
                primaryBorderColor: '#001A33',
                lineColor: '#0066CC',
                secondaryColor: '#E6F2FF',
                tertiaryColor: '#f8fafc',
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '14px',
                // Flowchart specific
                nodeBorder: '#003366',
                clusterBkg: '#E6F2FF',
                clusterBorder: '#0066CC',
                // Gantt specific
                gridColor: '#e2e8f0',
                todayLineColor: '#DC2626',
                taskBkgColor: '#003366',
                activeTaskBkgColor: '#0066CC',
                doneTaskBkgColor: '#10B981',
                critBkgColor: '#DC2626',
                taskTextColor: '#ffffff',
                taskTextOutsideColor: '#1e293b',
                sectionBkgColor: '#f8fafc',
                altSectionBkgColor: '#ffffff'
            },
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis',
                padding: 20
            },
            gantt: {
                useMaxWidth: true,
                leftPadding: 75,
                gridLineStartPadding: 35,
                barHeight: 30,
                barGap: 8,
                topPadding: 50,
                sectionFontSize: 14,
                numberSectionStyles: 4
            }
        });
    }
}

// ===== Tabs =====
function initTabs() {
    const tabButtons = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-tab-target');

            // Remove active styles from all buttons and add inactive styles
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-[#003366]', 'text-white');
                btn.classList.add('text-gray-600', 'bg-transparent');
                btn.style.backgroundColor = 'transparent';
                btn.style.color = '#4B5563'; // gray-600
            });

            // Hide all tab contents
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active styles to clicked button using inline styles for reliability
            button.classList.add('active', 'bg-[#003366]', 'text-white');
            button.classList.remove('text-gray-600', 'bg-transparent');
            button.style.backgroundColor = '#003366';
            button.style.color = '#ffffff';

            // Show corresponding content
            const targetContent = document.querySelector(`[data-tab-content="${targetId}"]`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// ===== Accordions =====
function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');

            // Toggle current accordion
            header.classList.toggle('open');
            content.classList.toggle('open');

            // Optionally close other accordions (uncomment for single-open behavior)
            // accordionHeaders.forEach(otherHeader => {
            //     if (otherHeader !== header) {
            //         otherHeader.classList.remove('open');
            //         otherHeader.nextElementSibling.classList.remove('open');
            //     }
            // });
        });
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Scroll Animations =====
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements with animation class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== Utility Functions =====

// Format date
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Show toast notification
function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-dtv-primary text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, duration);
}

// Toggle dark mode (if needed in future)
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Print specific section
function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>DTV Report - Print</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2/dist/tailwind.min.css" rel="stylesheet">
            <style>
                body { padding: 2rem; }
                @media print {
                    body { padding: 0; }
                }
            </style>
        </head>
        <body>
            ${section.innerHTML}
        </body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// Export table to CSV
function exportTableToCSV(tableId, filename = 'export.csv') {
    const table = document.getElementById(tableId);
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData = [];
        cols.forEach(col => {
            let text = col.innerText.replace(/"/g, '""');
            rowData.push(`"${text}"`);
        });
        csv.push(rowData.join(','));
    });

    const csvContent = csv.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}

// Highlight active navigation
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.classList.add('bg-dtv-secondary');
        }
    });
}

// Call on page load
highlightActiveNav();
