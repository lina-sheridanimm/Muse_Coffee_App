document.addEventListener('DOMContentLoaded', () => {
    // Button Elements
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const guestBtn = document.getElementById('guestBtn');

    // Event Listeners with button animation
    function addClickAnimation(element) {
        element.style.transform = 'scale(0.98)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 100);
    }

    loginBtn.addEventListener('click', (e) => {
        addClickAnimation(e.target);
        setTimeout(() => {
            window.location.href = 'emaillogin.html';
        }, 200);
    });

    signupBtn.addEventListener('click', (e) => {
        addClickAnimation(e.target);
        setTimeout(() => {
            window.location.href = 'signup.html';
        }, 200);
    });

    guestBtn.addEventListener('click', (e) => {
        e.preventDefault();
        handleGuestLogin();
    });

    // Guest login handler
    function handleGuestLogin() {
        console.log('Continuing as guest...');
        window.location.href = '/home?guest=true';
    }

    // Logo animation
    const logo = document.getElementById('logo');
    if (logo) {
        logo.addEventListener('load', () => {
            logo.classList.add('loaded');
        });
    }

    // Error handling
    window.addEventListener('error', (e) => {
        console.error('Page error:', e.message);
    });
});