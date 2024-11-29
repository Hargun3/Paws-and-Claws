// bgMusic.js
const bgMusic = new Audio('../universal/bg.mp3'); // Your audio file path
bgMusic.loop = true; // Set to loop continuously
bgMusic.volume = 0.5; // Adjust volume as needed

// Play the music if it's not already playing
if (!localStorage.getItem('musicPlaying')) {
    bgMusic.play(); // Start music
    localStorage.setItem('musicPlaying', 'true'); // Mark that music is playing
}

// Stop the music if the user quits (optional, you can modify this logic)
window.onbeforeunload = () => {
    localStorage.removeItem('musicPlaying');
};
