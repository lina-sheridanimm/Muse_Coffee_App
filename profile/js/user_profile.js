document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs .tab');
    const reviewGrid = document.querySelector('.review-grid');
    const savedGrid = document.querySelector('.saved-grid');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Show corresponding content
            if (tab.textContent === 'Reviews') {
                reviewGrid.style.display = 'block';
                savedGrid.style.display = 'none';
            } else {
                reviewGrid.style.display = 'none';
                savedGrid.style.display = 'block';
            }
        });
    });
});