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


function openBioPopup() {
    document.getElementById("edit-bio-popup").style.display = "flex";
}

function closeBioPopup() {
    document.getElementById("edit-bio-popup").style.display = "none";
}

document.querySelector('.edit-profile-btn').addEventListener('click', openBioPopup);


document.getElementById('edit-bio-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const bio = document.getElementById('new-bio').value;

    fetch('user-page.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ 'bio': bio })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            document.querySelector('.bio').textContent = data.bio;
            closeBioPopup();
        } else {
            alert(data.message || 'Failed to update bio.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while updating the bio.');
    });
});


// Show the delete account popup when the settings button is clicked
document.querySelector('.settings-btn').addEventListener('click', function() {
    document.getElementById('delete-account-popup').style.display = 'flex';
});

// Close the popup
function closeDeletePopup() {
    document.getElementById('delete-account-popup').style.display = 'none';
}

// Handle the account deletion process
function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        fetch('delete-account.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({ 'action': 'delete_account' })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Your account has been deleted.');
                window.location.href = '../loginphp/login.php'; // Redirect to filter page or login page
            } else {
                alert('Error deleting account: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while deleting the account.');
        });
    }
}
