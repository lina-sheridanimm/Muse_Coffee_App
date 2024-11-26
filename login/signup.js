document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const backBtn = document.getElementById('backBtn');
    const signupForm = document.getElementById('signupForm');
    const errorDialog = document.getElementById('errorDialog');
    const loginRedirect = document.getElementById('loginRedirect');
    const cancelDialog = document.getElementById('cancelDialog');

    // Back button handler
    backBtn.addEventListener('click', () => {
        window.location.href = "login.html";
    });

    // Form submission handler
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;

        // Validate input
        if (!validateInput(username, email)) {
            return;
        }

        // Simulate API call
        try {
            const exists = await checkEmailExists(email);
            if (exists) {
                showErrorDialog();
            } else {
                // Proceed with registration
                handleRegistration(username, email);
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    });

    // Input validation
    function validateInput(username, email) {
        if (!username.trim()) {
            showError('Please enter a username');
            return false;
        }

        if (!email.trim() || !isValidEmail(email)) {
            showError('Please enter a valid email address');
            return false;
        }

        return true;
    }

    // Email validation
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Show error message
    function showError(message) {
        // You can implement your own error display logic here
        console.error(message);
    }

    // Simulate email check
    async function checkEmailExists(email) {
        // Simulate API call
        return new Promise(resolve => {
            setTimeout(() => {
                // Randomly return true to simulate existing email
                resolve(Math.random() > 0.5);
            }, 500);
        });
    }

    // Handle registration
    function handleRegistration(username, email) {
        console.log('Registering:', { username, email });
        // Redirect to verification page
        window.location.href = 'veri.html';
    }

    // Error dialog handlers
    function showErrorDialog() {
        errorDialog.style.display = 'flex';
    }

    loginRedirect.addEventListener('click', () => {
        window.location.href = 'emaillogin.html';
    });

    cancelDialog.addEventListener('click', () => {
        errorDialog.style.display = 'none';
    });
});