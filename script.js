// Chart Data (using Chart.js if included)
if (typeof Chart !== 'undefined') {
    // Example chart configuration
    const ctx = document.getElementById('activitiesChart');
    if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
                datasets: [{
                    label: 'Patients',
                    data: [12, 19, 15, 17, 14, 10, 8],
                    borderColor: '#4e73df',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// Date and Time Update
function updateDateTime() {
    const now = new Date();
    const dateTimeElement = document.querySelector('.datetime');
    if (dateTimeElement) {
        dateTimeElement.textContent = now.toLocaleString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

// Update date/time every minute
setInterval(updateDateTime, 60000);
updateDateTime();

// Add smooth scrolling to all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Validation (if needed)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                createNotification(Le champ ${field.getAttribute('name')} est requis, 'error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // Handle form submission
            createNotification('Formulaire soumis avec succès', 'success');
        }
    });
});

// Add loading states to buttons
function addLoadingState(button) {
    button.disabled = true;
    const originalText = button.textContent;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
    return () => {
        button.disabled = false;
        button.textContent = originalText;
    };
}

// Example usage for action buttons
const actionButtons = document.querySelectorAll('.action-button'); // Assurez-vous que cette classe est correcte
actionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const removeLoading = addLoadingState(button);
        // Simulate API call
        setTimeout(removeLoading, 1500);
    });
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle resize operations
        const sidebar = document.querySelector('.sidebar'); // Assurez-vous que cette classe est correcte
        if (window.innerWidth > 992 && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    }, 250);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    const sidebar = document.querySelector('.sidebar'); // Assurez-vous que cette classe est correcte
    if (e.key === 'Escape') {
        sidebar.classList.remove('active');
    }
});

// Initialize tooltips if needed
const tooltips = document.querySelectorAll('[data-tooltip]');
tooltips.forEach(tooltip => {
    tooltip.addEventListener('mouseenter', (e) => {
        const tip = document.createElement('div');
        tip.className = 'tooltip';
        tip.textContent = e.target.dataset.tooltip;
        document.body.appendChild(tip);

        const rect = e.target.getBoundingClientRect();
        tip.style.top = ${rect.top - tip.offsetHeight - 10}px;
        tip.style.left = ${rect.left + (rect.width - tip.offsetWidth) / 2}px;

        // Remove tooltip on mouse leave
        tooltip.addEventListener('mouseleave', () => {
            tip.remove();
        });
    });
});
