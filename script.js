// JavaScript for enhancing dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navContainer = document.querySelector('.nav-container');
    
    // Fix for iOS touch events
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Hamburger menu toggle functionality with touchstart for mobile
    if (hamburgerMenu) {
        ['click', 'touchstart'].forEach(eventType => {
            hamburgerMenu.addEventListener(eventType, function(e) {
                e.preventDefault();
                hamburgerMenu.classList.toggle('active');
                navContainer.classList.toggle('active');
            });
        });
    }
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        // For ALL screen sizes: toggle dropdown on click/touch (not just mobile)
        ['click', 'touchstart'].forEach(eventType => {
            dropbtn.addEventListener(eventType, function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    if (content !== dropdownContent && content.classList.contains('active')) {
                        content.classList.remove('active');
                        content.style.display = 'none';
                        content.closest('.dropdown').querySelector('.dropbtn').classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                if (dropdownContent.classList.contains('active')) {
                    dropdownContent.classList.remove('active');
                    dropdownContent.style.display = 'none';
                    dropbtn.classList.remove('active');
                } else {
                    dropdownContent.classList.add('active');
                    dropdownContent.style.display = 'block';
                    dropbtn.classList.add('active');
                }
            });
        });
    });
    
    // Ensure touchstart events are properly handled for devices
    ['click', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, function(e) {
            // Only close dropdowns if click is outside dropdown and not on hamburger menu
            if (!e.target.closest('.dropdown') && !e.target.closest('.hamburger-menu')) {
                // Don't close the entire nav-container if we're on mobile and clicked outside
                // Only close individual dropdowns
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    if (content.classList.contains('active')) {
                        content.classList.remove('active');
                        content.style.display = 'none';
                        content.closest('.dropdown').querySelector('.dropbtn').classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close the mobile menu when clicking outside of it (but not on the hamburger icon)
    ['click', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, function(e) {
            if (window.innerWidth < 992) {
                if (!e.target.closest('.nav-container') && !e.target.closest('.hamburger-menu')) {
                    if (navContainer.classList.contains('active')) {
                        navContainer.classList.remove('active');
                        hamburgerMenu.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Ensure proper behavior on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            // Reset display properties for desktop view
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = '';
                content.classList.remove('active');
            });
            
            // Make sure nav container is visible on desktop regardless of previous state
            navContainer.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        } else {
            // Ensure correct display property for active dropdowns on mobile
            document.querySelectorAll('.dropdown-content.active').forEach(content => {
                content.style.display = 'block';
            });
        }
    });
    
    // Fix for mega menu positioning on different screen sizes
    function adjustMegaMenuPosition() {
        const windowWidth = window.innerWidth;
        const megaMenus = document.querySelectorAll('.mega-menu');
        
        megaMenus.forEach(menu => {
            // Reset inline styles that might have been applied
            menu.style.width = '';
            
            if (windowWidth < 768) {
                // Mobile view
                menu.style.width = '100%';
            }
        });
    }
    
    // Force a layout recalculation on mobile
    function forceRepaint() {
        document.body.style.display = 'none';
        // Trigger a reflow
        void document.body.offsetHeight; 
        document.body.style.display = '';
    }
    
    // Run on load and resize
    adjustMegaMenuPosition();
    window.addEventListener('resize', adjustMegaMenuPosition);
    
    // Fix for initial mobile rendering
    if (window.innerWidth < 992) {
        setTimeout(forceRepaint, 100);
    }
});