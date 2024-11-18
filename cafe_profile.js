class PhotoGallery {
    constructor() {
        this.container = document.querySelector('.gallery-container');
        this.images = document.querySelectorAll('.gallery-image');
        this.indicators = document.querySelectorAll('.indicator-dot');
        
        // Initialize states
        this.isDragging = false;
        this.startX = 0;
        this.scrollLeft = 0;
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // Mouse events
        this.container.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.container.style.cursor = 'grabbing';
            this.startX = e.pageX - this.container.offsetLeft;
            this.scrollLeft = this.container.scrollLeft;
        });

        this.container.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            e.preventDefault();
            const x = e.pageX - this.container.offsetLeft;
            const walk = (x - this.startX);
            this.container.scrollLeft = this.scrollLeft - walk;
        });

        const stopDragging = () => {
            this.isDragging = false;
            this.container.style.cursor = 'grab';
            this.snapToClosestImage();
        };

        this.container.addEventListener('mouseup', stopDragging);
        this.container.addEventListener('mouseleave', stopDragging);

        // Touch events
        this.container.addEventListener('touchstart', (e) => {
            this.isDragging = true;
            this.startX = e.touches[0].pageX - this.container.offsetLeft;
            this.scrollLeft = this.container.scrollLeft;
        });

        this.container.addEventListener('touchmove', (e) => {
            if (!this.isDragging) return;
            const x = e.touches[0].pageX - this.container.offsetLeft;
            const walk = (x - this.startX);
            this.container.scrollLeft = this.scrollLeft - walk;
        });

        this.container.addEventListener('touchend', () => {
            this.isDragging = false;
            this.snapToClosestImage();
        });

        // Indicator click events
        this.indicators.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.scrollToImage(index);
            });
        });

        // Listen for scroll to update indicators
        this.container.addEventListener('scroll', () => {
            this.updateIndicators();
        });
    }

    snapToClosestImage() {
        const imageWidth = this.container.offsetWidth;
        const scrollPosition = this.container.scrollLeft;
        const index = Math.round(scrollPosition / imageWidth);
        this.scrollToImage(index);
    }

    scrollToImage(index) {
        if (index < 0) index = 0;
        if (index >= this.images.length) index = this.images.length - 1;

        const imageWidth = this.container.offsetWidth;
        this.container.scrollTo({
            left: imageWidth * index,
            behavior: 'smooth'
        });

        this.currentIndex = index;
        this.updateIndicators();
    }

    updateIndicators() {
        const imageWidth = this.container.offsetWidth;
        const scrollPosition = this.container.scrollLeft;
        const currentIndex = Math.round(scrollPosition / imageWidth);

        this.indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
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
        this.init();
    }

    init() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove all active states
                this.tabButtons.forEach(btn => btn.classList.remove('active'));
                // Add active state to current button
                button.classList.add('active');
                
                // Add content switching logic here
                // For example, show corresponding menu or reviews content
            });
        });
    }
}

// Initialize all functionalities
document.addEventListener('DOMContentLoaded', () => {
    new PhotoGallery();
    new TagsScroller();
    new TabSwitcher();
}); 