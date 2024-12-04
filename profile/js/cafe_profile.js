class PhotoGallery {
    constructor() {
        this.container = document.querySelector('.gallery-container');
        this.images = document.querySelectorAll('.gallery-image');
        this.currentIndex = 0;
        this.maxIndex = this.images.length - 1;
        
        this.overlay = document.querySelector('.photo-overlay');
        this.enlargedPhoto = document.querySelector('.enlarged-photo');
        this.isEnlarged = false;
        
        this.init();
    }

    init() {
        // Add hover areas to HTML
        this.addHoverAreas();
        
        // Listen for scroll end event
        this.container.addEventListener('scrollend', () => {
            this.updateCurrentIndex();
        });

        // Touch event support
        let startX = 0;
        let isDragging = false;

        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].clientX;
            const walk = startX - x;
            this.container.scrollLeft += walk;
            startX = x;
        });

        this.container.addEventListener('touchend', () => {
            isDragging = false;
            this.snapToClosestImage();
        });

        // Add click event handling
        this.images.forEach(img => {
            img.addEventListener('click', (e) => {
                this.togglePhotoEnlargement(e.target);
            });
        });

        // Add overlay click event
        this.overlay.addEventListener('click', (e) => {
            if (e.target !== this.enlargedPhoto) {
                this.closeEnlargedPhoto();
            }
        });

        // Add ESC key close functionality
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isEnlarged) {
                this.closeEnlargedPhoto();
            }
        });

        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        document.body.style.overflow = ''; // Restore scrolling
    }

    addHoverAreas() {
        const gallery = document.querySelector('.photo-gallery');
        
        const leftArea = document.createElement('div');
        leftArea.className = 'gallery-hover-area gallery-hover-left';
        
        const rightArea = document.createElement('div');
        rightArea.className = 'gallery-hover-area gallery-hover-right';
        
        leftArea.addEventListener('mouseenter', () => {
            if (this.currentIndex > 0) {
                this.scrollToPrevious();
            }
        });
        
        rightArea.addEventListener('mouseenter', () => {
            if (this.currentIndex < this.maxIndex) {
                this.scrollToNext();
            }
        });
        
        gallery.appendChild(leftArea);
        gallery.appendChild(rightArea);
    }

    updateCurrentIndex() {
        const scrollPosition = this.container.scrollLeft;
        const imageWidth = this.images[0].offsetWidth + parseInt(getComputedStyle(this.container).gap);
        this.currentIndex = Math.round(scrollPosition / imageWidth);
    }

    scrollToPrevious() {
        if (this.currentIndex > 0) {
            this.scrollToImage(this.currentIndex - 1);
        }
    }

    scrollToNext() {
        if (this.currentIndex < this.maxIndex) {
            this.scrollToImage(this.currentIndex + 1);
        }
    }

    scrollToImage(index) {
        // Ensure index is within valid range
        if (index < 0) index = 0;
        if (index > this.maxIndex) index = this.maxIndex;

        const imageWidth = this.images[0].offsetWidth + parseInt(getComputedStyle(this.container).gap);
        this.container.scrollTo({
            left: imageWidth * index,
            behavior: 'smooth'
        });
        this.currentIndex = index;
    }

    snapToClosestImage() {
        const imageWidth = this.images[0].offsetWidth + parseInt(getComputedStyle(this.container).gap);
        const scrollPosition = this.container.scrollLeft;
        const index = Math.round(scrollPosition / imageWidth);
        this.scrollToImage(index);
    }

    togglePhotoEnlargement(imageElement) {
        if (!this.isEnlarged) {
            this.enlargePhoto(imageElement);
        } else {
            this.closeEnlargedPhoto();
        }
    }

    enlargePhoto(imageElement) {
        this.enlargedPhoto.src = imageElement.src;
        this.enlargedPhoto.alt = imageElement.alt;
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        this.isEnlarged = true;
    }

    closeEnlargedPhoto() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        this.isEnlarged = false;
    }
}

class TagsScroller {
    constructor() {
        this.container = document.querySelector('.tags-scroll-container');
        this.wrapper = document.querySelector('.tags-wrapper');
        
        this.init();
    }

    init() {
        // Check if scroll indicator is needed
        this.checkScrollIndicator();

        // Add horizontal scroll touch support
        let isDown = false;
        let startX;
        let scrollLeft;

        this.container.addEventListener('mousedown', (e) => {
            isDown = true;
            this.container.style.cursor = 'grabbing';
            startX = e.pageX - this.container.offsetLeft;
            scrollLeft = this.container.scrollLeft;
        });

        this.container.addEventListener('mouseleave', () => {
            isDown = false;
            this.container.style.cursor = 'grab';
        });

        this.container.addEventListener('mouseup', () => {
            isDown = false;
            this.container.style.cursor = 'grab';
        });

        this.container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - this.container.offsetLeft;
            const walk = (x - startX) * 2;
            this.container.scrollLeft = scrollLeft - walk;
        });
    }

    checkScrollIndicator() {
        const hasOverflow = this.wrapper.scrollWidth > this.container.clientWidth;
        const indicator = document.querySelector('.scroll-indicator');
        if (indicator) {
            indicator.style.display = hasOverflow ? 'block' : 'none';
        }
    }
}

// Tab switching functionality
class TabSwitcher {
    constructor() {
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.menuView = document.querySelector('.menu-view');
        this.reviewsView = document.querySelector('.reviews-view');
        
        console.log('TabSwitcher initialized:', {
            tabButtons: this.tabButtons,
            menuView: this.menuView,
            reviewsView: this.reviewsView
        });
        
        this.init();
    }

    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                console.log('Tab clicked:', button.textContent);
                
                // Remove active state from all tabs
                this.tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active state to clicked tab
                button.classList.add('active');
                
                // Toggle content visibility
                if (button.textContent === 'Reviews') {
                    console.log('Switching to Reviews view');
                    this.menuView.classList.remove('active');
                    this.reviewsView.classList.add('active');
                    this.loadReviews();
                } else {
                    console.log('Switching to Menu view');
                    this.menuView.classList.add('active');
                    this.reviewsView.classList.remove('active');
                }
            });
        });
    }

    async loadReviews() {
        const urlParams = new URLSearchParams(window.location.search);
        const cafeId = urlParams.get('id') || 1;
        
        console.log('Loading reviews for cafe:', cafeId);
        
        try {
            const response = await fetch(`reviews-api.php?cafe_id=${cafeId}`);
            const data = await response.json();
            console.log('Reviews data:', data);
            
            if (data.status === 'success') {
                const reviewsHTML = data.reviews.map(review => `
                    <div class="review-card" onclick="window.location.href='user-page.php?id=${review.user_id}'">
                        <div class="review-header">
                            <img src="assets/users/${review.portrait_image}" alt="${review.user_name}" class="reviewer-image">
                            <div class="reviewer-info">
                                <h4>${review.user_name}</h4>
                                <div class="rating-beans">${'☕'.repeat(review.rating)}</div>
                            </div>
                        </div>
                        <p class="review-text">${review.review_text}</p>
                    </div>
                `).join('');
                
                const reviewsContainer = document.querySelector('.reviews-container');
                console.log('Reviews container:', reviewsContainer);
                if (reviewsContainer) {
                    reviewsContainer.innerHTML = reviewsHTML;
                } else {
                    console.error('Reviews container not found');
                }
            }
        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }
}

// // Initialize when DOM is loaded
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('DOM loaded, initializing TabSwitcher');
//     new TabSwitcher();
// }); 