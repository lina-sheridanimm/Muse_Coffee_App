document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('backBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const resendBtn = document.getElementById('resendBtn');
    const codeInputs = document.querySelectorAll('.code-input');
    const errorMessage = document.getElementById('errorMessage');

    // Back button handler
    backBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.history.back();
    });

    // Handle verification code input
    codeInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '');
            
            const index = parseInt(e.target.dataset.index);
            if (e.target.value && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
            
            updateVerifyButton();
        });

        input.addEventListener('keydown', (e) => {
            const index = parseInt(e.target.dataset.index);
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
    });

    function updateVerifyButton() {
        const isComplete = Array.from(codeInputs).every(input => input.value.length === 1);
        verifyBtn.disabled = !isComplete;
        verifyBtn.style.opacity = isComplete ? '1' : '0.5';
    }

    // Handle verification
    verifyBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(window.location.href, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    code: Array.from(codeInputs).map(input => input.value).join('')
                })
            });

            const data = await response.json();
            
            if (data.success) {
                // Redirect based on user type
                if (data.isNewUser) {
                    window.location.href = 'main.html';
                } else {
                    window.location.href = 'home.html';
                }
            } else {
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Verification error:', error);
            errorMessage.style.display = 'block';
        }
    });

    // Handle resend
    resendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Disable resend button
        resendBtn.style.opacity = '0.5';
        resendBtn.style.pointerEvents = 'none';
        
        // Reset inputs
        codeInputs.forEach(input => {
            input.value = '';
            input.classList.remove('error');
        });
        errorMessage.style.display = 'none';
        codeInputs[0].focus();
        
        // Re-enable resend button after 30 seconds
        setTimeout(() => {
            resendBtn.style.opacity = '1';
            resendBtn.style.pointerEvents = 'auto';
        }, 30000);
    });

    // Initial focus
    codeInputs[0].focus();
});