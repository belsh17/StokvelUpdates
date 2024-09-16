const stickMan = document.getElementById('stickMan');
const cactus = document.getElementById('cactus');
const gameArea = document.getElementById('gameArea');
// const jumpButton = document.getElementById('jumpButton'); // Reference to the button

let isJumping = false;
let isAlive = true;

document.addEventListener('keydown', (event) => {
    // Check if the pressed key is the Spacebar (key code 32)
    if (event.code === 'Space' && !isJumping) {
        jump();
    }
});

// jumpButton.addEventListener('click', () => {
//     if (!isJumping) {
//         jump();
//     }
// });

// function for stick man to jump if 'isJumping' exists
function jump() {
    if (isJumping) return;
    isJumping = true;
    stickMan.classList.add('jump');
    setTimeout(() => {
        stickMan.classList.remove('jump');
        isJumping = false;
    }, 300);
}

function moveCactus() {
    let cactusPosition = gameArea.clientWidth;
    const cactusSpeed = 8; // Speed of the cactus

    setInterval(() => {
        if (isAlive) {
            cactusPosition -= cactusSpeed;
            cactus.style.left = cactusPosition + 'px';

            if (cactusPosition < -30) { // Reset cactus when it goes off screen
                cactusPosition = gameArea.clientWidth;
            }

            // Check for collision
            const stickManRect = stickMan.getBoundingClientRect();
            const cactusRect = cactus.getBoundingClientRect();

            if (
                cactusRect.left < stickManRect.right &&
                cactusRect.right > stickManRect.left &&
                cactusRect.top < stickManRect.bottom &&
                cactusRect.bottom > stickManRect.top
            ) {
                if (!isJumping) {
                    // Game Over condition
                    alert('Game Over!');
                    isAlive = false;
                    location.reload(); // Reload the page to restart the game
                }
            }
        }
    }, 20); // Refresh rate
}

moveCactus();