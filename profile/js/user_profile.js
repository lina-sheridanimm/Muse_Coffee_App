// Function to handle tab switching
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content > div');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
  
        // Show corresponding content
        const targetContent = tab.textContent.toLowerCase();
        tabContents.forEach(content => {
          content.style.display = content.classList.contains(targetContent) ? 'block' : 'none';
        });
      });
    });
  }
  
  // Function to set user theme based on personality type
  function setUserTheme(userType) {
    const container = document.querySelector('.profile-container');
    // Remove any existing theme classes
    container.classList.remove(
      'arabica-adventurer',
      'matcha-mystic',
      'espresso-emperor',
      'mocha-muse'
    );
    
    // Add the appropriate theme class
    container.classList.add(userType.toLowerCase());
  }
  
  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    // Get the user type from the server or data attribute
    const userType = document.querySelector('.profile-container').dataset.userType;
    if (userType) {
        setUserTheme(userType);
    }
  });