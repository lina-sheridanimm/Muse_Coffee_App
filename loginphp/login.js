document.addEventListener('DOMContentLoaded', () => {
    // Get button elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const guestBtn = document.getElementById('guestBtn');

    // Login button handler
    loginBtn.addEventListener('click', () => {
        window.location.href = 'emaillogin.html';
    });

    // Signup button handler
    signupBtn.addEventListener('click', () => {
        window.location.href = 'signup.php';
    });
});