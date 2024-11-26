document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const backBtn = document.getElementById('backBtn');
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const errorDialog = document.getElementById('errorDialog');
    const okButton = document.getElementById('okButton');

    // Back button handler
    backBtn.addEventListener('click', () => {
        window.location.href = 'login.html';
    });

    // Form submission handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value;

        // Validate email
        if (!validateEmail(email)) {
            showErrorDialog();
            return;
        }

        // Simulate API call
        try {
            const isValidUser = await checkEmail(email);
            if (isValidUser) {
                // Redirect to next step (verification page)
                window.location.href = 'verification.html';
            } else {
                showErrorDialog();
            }
        } catch (error) {
            console.error('Login error:', error);
            showErrorDialog();
        }
    });

    // Email validation
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Simulate email check
    async function checkEmail(email) {
        // Simulate API call
        return new Promise(resolve => {
            setTimeout(() => {
                // Random validation for demo
                resolve(Math.random() > 0.5);
            }, 500);
        });
    }

    // Error dialog handlers
    function showErrorDialog() {
        errorDialog.style.display = 'flex';
    }

    okButton.addEventListener('click', () => {
        errorDialog.style.display = 'none';
        emailInput.focus();
    });
});