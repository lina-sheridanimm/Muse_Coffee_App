document.addEventListener('DOMContentLoaded', () => {
    // Update time in status bar
    function updateTime() {
        const timeElement = document.querySelector('.time');
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }

    // Update time initially and every minute
    updateTime();
    setInterval(updateTime, 60000);

    // Elements
    const backBtn = document.getElementById('backBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const resendBtn = document.getElementById('resendBtn');
    const codeInputs = document.querySelectorAll('.code-input');
    const errorMessage = document.querySelector('.error-message');

    // Back button handler
    backBtn.addEventListener('click', () => {
        window.location.href = "signup.html";
    });

    // Handle input of verification code
    codeInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            // Only allow numbers
            e.target.value = e.target.value.replace(/[^0-9]/g, '');

            const index = parseInt(e.target.dataset.index);
            if (e.target.value && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }

            updateVerifyButtonState();
            errorMessage.style.display = 'none';
        });

        input.addEventListener('keydown', (e) => {
            const index = parseInt(e.target.dataset.index);
            
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });

        // Prevent paste of non-numeric characters
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedText = (e.clipboardData || window.clipboardData).getData('text');
            const numbers = pastedText.match(/[0-9]/g);
            
            if (numbers) {
                numbers.forEach((number, index) => {
                    if (index < codeInputs.length) {
                        codeInputs[index].value = number;
                        if (index < codeInputs.length - 1) {
                            codeInputs[index + 1].focus();
                        }
                    }
                });
            }
        });
    });

    // Update verify button state
    function updateVerifyButtonState() {
        const allFilled = Array.from(codeInputs).every(input => input.value.length === 1);
        verifyBtn.style.opacity = allFilled ? '1' : '0.5';
        verifyBtn.disabled = !allFilled;
    }

    // Verify button handler
    verifyBtn.addEventListener('click', () => {
        const code = Array.from(codeInputs).map(input => input.value).join('');
        verifyCode(code);
    });

    // Verify code function
    async function verifyCode(code) {
        // Simulate API verification
        const isValid = code === '1234'; // Replace with actual verification logic

        if (isValid) {
            // Redirect to success page or home
            window.location.href = '/home';
        } else {
            // Show error and highlight inputs in red
            errorMessage.style.display = 'block';
            codeInputs.forEach(input => {
                input.classList.add('error');
            });
        }
    }

    // Resend button handler
    resendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Disable resend button temporarily
        resendBtn.style.opacity = '0.5';
        resendBtn.style.pointerEvents = 'none';
        
        // Clear inputs
        codeInputs.forEach(input => {
            input.value = '';
            input.classList.remove('error');
        });
        errorMessage.style.display = 'none';
        codeInputs[0].focus();

        // Simulate resending code
        setTimeout(() => {
            resendBtn.style.opacity = '1';
            resendBtn.style.pointerEvents = 'auto';
        }, 30000); // 30 seconds cooldown
    });

    // Initial focus
    codeInputs[0].focus();
});