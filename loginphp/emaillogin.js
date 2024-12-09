document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const backBtn = document.getElementById('backBtn');

    // Back button handler
    backBtn.addEventListener('click', () => {
        window.location.href = 'login.php';
    });
});