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


document.querySelector('#edit-bio-form').addEventListener('submit', function(event) {
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
    document.querySelector('#delete-account-popup').style.display = 'flex';
});

// Close the popup
function closeDeletePopup() {
    document.querySelector('#delete-account-popup').style.display = 'none';
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


// editing reviews:

document.addEventListener('DOMContentLoaded', () => {
    const reviewModal = document.querySelector('#review-modal');
    const closeModal = document.querySelector('#close-modal');
    const reviewForm = document.querySelector('#review-form');
    const reviewRating = document.querySelector('#rating');
    const reviewDescription = document.querySelector('#description');
    const deleteBtn = document.querySelector('#deletebtn');
    let currentReviewId = null;

    // Open the modal and fill the fields
    document.querySelectorAll('.edit-review-btn').forEach(button => {
        button.addEventListener('click', () => {
            const reviewId = button.getAttribute('data-review-id');
            const reviewText = button.getAttribute('data-review-text');
            const reviewRatingValue = button.getAttribute('data-review-rating');

            currentReviewId = reviewId;
            reviewDescription.value = reviewText;
            reviewRating.value = reviewRatingValue;

            reviewModal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        reviewModal.style.display = 'none';
    });

    reviewForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const updatedText = reviewDescription.value.trim();
        const updatedRating = reviewRating.value;

        if (!updatedText || !updatedRating) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('user-page.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    review_id: parseInt(currentReviewId, 10), 
                    review_text: updatedText.trim(),
                    rating: parseInt(updatedRating, 10) 
                })
            });

            const responseText = await response.text();
            console.log('Raw response from server:', responseText);

            let result;
            try {
                result = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Failed to parse JSON:', parseError);
                alert('The server response is not valid JSON.');
                return;
            }

            if (result.status === 'success') {
                console.log('Review updated:', result);
                alert('Review updated successfully!');
                location.reload();
            } else {
                console.error('Error updating review:', result);
                alert(result.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error updating review:', error);
            alert('Failed to update review. Please try again.');
        }
    });

    // delete the review
    deleteBtn.addEventListener('click', async () => {
        if (!currentReviewId) {
            alert('No review selected for deletion.');
            return;
        }

        if (confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
            try {
                const response = await fetch('user-page.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ review_id: parseInt(currentReviewId, 10) })
                });

                const result = await response.json();
                console.log('Delete response:', result);

                if (result.status === 'success') {
                    alert('Review deleted successfully!');
                    location.reload();
                } else {
                    alert(result.message || 'Failed to delete review.');
                }
            } catch (error) {
                console.error('Error deleting review:', error);
                alert('Failed to delete review. Please try again.');
            }
        }
    });
});





