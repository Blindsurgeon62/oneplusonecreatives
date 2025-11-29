// Security and Content Protection for One Plus One Creatives
(function() {
    'use strict';
    
    // Disable right-click context menu on images and videos
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG' || 
            e.target.tagName === 'VIDEO' || 
            e.target.classList.contains('protected') ||
            e.target.closest('.protected-content')) {
            e.preventDefault();
            showProtectionWarning();
            return false;
        }
    });
    
    // Disable drag and drop for images
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG' || 
            e.target.tagName === 'VIDEO' ||
            e.target.classList.contains('protected')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable text selection on protected elements
    document.addEventListener('selectstart', function(e) {
        if (e.target.classList.contains('no-select') ||
            e.target.closest('.protected-content')) {
            e.preventDefault();
            return false;
        }
    });
    
    // Disable print functionality for the page
    document.addEventListener('keydown', function(e) {
        // Ctrl+P or Cmd+P
        if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
            e.preventDefault();
            showProtectionWarning('Printing has been disabled to protect creative content.');
            return false;
        }
        
        // Ctrl+S or Cmd+S
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            showProtectionWarning('Saving has been disabled to protect creative content.');
            return false;
        }
        
        // PrintScreen key (limited effectiveness)
        if (e.key === 'PrintScreen') {
            showProtectionWarning('Screenshots are discouraged. Please respect the creators.');
        }
    });
    
    // Add CSS to disable print media
    const style = document.createElement('style');
    style.innerHTML = `
        @media print {
            body { display: none !important; }
        }
        
        /* Additional protection for images */
        img.protected, video.protected {
            pointer-events: none;
            -webkit-user-drag: none;
            -khtml-user-drag: none;
            -moz-user-drag: none;
            -o-user-drag: none;
            user-drag: none;
        }
        
        /* Disable highlighting */
        .protected-content {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
        }
    `;
    document.head.appendChild(style);
    
    // Console warning message
    console.log('%cSTOP!', 'color: red; font-size: 50px; font-weight: bold;');
    console.log('%cThis is a browser feature intended for developers.', 'color: red; font-size: 16px;');
    console.log('%cThe creative content on this site is protected by copyright.', 'color: red; font-size: 16px;');
    console.log('%cPlease respect the artists and creators featured here.', 'color: red; font-size: 16px;');
    console.log('%cFor licensing or usage inquiries: contact@oneplusonecreatives.com', 'color: blue; font-size: 14px;');
    
    // Protection warning notification
    let warningTimeout;
    function showProtectionWarning(message = 'This content is protected. Please respect the creators.') {
        clearTimeout(warningTimeout);
        
        let warning = document.getElementById('protection-warning');
        if (!warning) {
            warning = document.createElement('div');
            warning.id = 'protection-warning';
            warning.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 15px 20px;
                border-radius: 8px;
                font-size: 14px;
                z-index: 10000;
                max-width: 300px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5);
                transition: opacity 0.3s;
            `;
            document.body.appendChild(warning);
        }
        
        warning.textContent = message;
        warning.style.opacity = '1';
        warning.style.display = 'block';
        
        warningTimeout = setTimeout(function() {
            warning.style.opacity = '0';
            setTimeout(function() {
                warning.style.display = 'none';
            }, 300);
        }, 3000);
    }
    
    // Protect all images and videos on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Add protection class to all images
        document.querySelectorAll('img').forEach(function(img) {
            if (!img.classList.contains('unprotected')) {
                img.classList.add('protected');
                img.setAttribute('draggable', 'false');
            }
        });
        
        // Add protection class to all videos
        document.querySelectorAll('video').forEach(function(video) {
            video.classList.add('protected');
            video.setAttribute('controlsList', 'nodownload');
            video.disablePictureInPicture = true;
        });
        
        // Disable developer tools (limited effectiveness)
        // Note: This is easily bypassed but shows intent
        let devtools = {open: false, orientation: null};
        const threshold = 160;
        const emitEvent = function(state, orientation) {
            if (state) {
                showProtectionWarning('Developer tools detected. Content is protected by copyright.');
            }
        };
        
        setInterval(function() {
            if (window.outerHeight - window.innerHeight > threshold || 
                window.outerWidth - window.innerWidth > threshold) {
                if (!devtools.open) {
                    emitEvent(true, null);
                    devtools.open = true;
                }
            } else {
                devtools.open = false;
            }
        }, 500);
    });
    
    // Add watermark to dynamically loaded images (optional)
    window.addWatermark = function(imageElement, text = '© One Plus One Creatives') {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        imageElement.onload = function() {
            canvas.width = imageElement.width;
            canvas.height = imageElement.height;
            
            // Draw the image
            ctx.drawImage(imageElement, 0, 0);
            
            // Add watermark
            ctx.font = '16px Arial';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.textAlign = 'right';
            ctx.fillText(text, canvas.width - 10, canvas.height - 10);
            
            // Replace image src with watermarked version
            imageElement.src = canvas.toDataURL();
        };
    };
    
})();
