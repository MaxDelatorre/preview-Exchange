// JavaScript for enhancing dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        const dropbtn = dropdown.querySelector('.dropbtn');
        
        // For mobile: toggle dropdown on click
        dropbtn.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
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
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                if (content.classList.contains('active')) {
                    content.classList.remove('active');
                    content.style.display = 'none';
                    content.closest('.dropdown').querySelector('.dropbtn').classList.remove('active');
                }
            });
        }
    });
    
    // Ensure proper behavior on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 992) {
            document.querySelectorAll('.dropdown-content').forEach(content => {
                content.style.display = '';
            });
        } else {
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
    
    // Run on load and resize
    adjustMegaMenuPosition();
    window.addEventListener('resize', adjustMegaMenuPosition);
});