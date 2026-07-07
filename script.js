document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const playBtn = document.getElementById('play-btn');
    const posterPlayBtn = document.getElementById('poster-play');
    const player = document.getElementById('netflix-player');
    const closePlayer = document.getElementById('close-player');
    const playerHeader = document.getElementById('player-header');
    const fullVideo = document.getElementById('full-video');
    const heroVideo = document.getElementById('hero-video');
    
    let idleTimeout;

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const openPlayer = () => {
        player.classList.add('active');
        heroVideo.pause(); // Pause background video
        fullVideo.play();  // Play fullscreen video
        
        // Enter fullscreen if possible for maximum immersion
        if (player.requestFullscreen) {
            player.requestFullscreen().catch(err => console.log(err));
        } else if (player.webkitRequestFullscreen) { /* Safari */
            player.webkitRequestFullscreen();
        } else if (player.msRequestFullscreen) { /* IE11 */
            player.msRequestFullscreen();
        }
        
        resetIdleTimer();
    };

    // Play buttons
    playBtn.addEventListener('click', openPlayer);
    if(posterPlayBtn) posterPlayBtn.addEventListener('click', openPlayer);

    // Close player
    closePlayer.addEventListener('click', () => {
        player.classList.remove('active');
        fullVideo.pause();
        fullVideo.currentTime = 0; // Reset video
        heroVideo.play(); // Resume background video
        
        // Exit fullscreen
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.log(err));
        }
    });

    // Handle mouse movement to hide/show back button
    player.addEventListener('mousemove', () => {
        resetIdleTimer();
    });

    function resetIdleTimer() {
        playerHeader.classList.remove('idle');
        clearTimeout(idleTimeout);
        
        // Hide header (back button) after 3 seconds of inactivity
        idleTimeout = setTimeout(() => {
            if(!fullVideo.paused) {
                playerHeader.classList.add('idle');
            }
        }, 3000);
    }
});
