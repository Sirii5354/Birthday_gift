

// Initialize Lucide icons
lucide.createIcons();

// DOM Elements
const loginPage = document.getElementById('login-page');
const birthdayPage = document.getElementById('birthday-page');
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');
const logoutButton = document.getElementById('logout-button');
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

// Particle Animation
class Particle {
    constructor(type) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = type === 'star' ? Math.random() * 6 + 6 : Math.random() * 4 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.color = `hsla(${Math.random() * 180 + 180}, 100%, 70%, ${this.alpha})`;
        this.type = type;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color;

        if (this.type === 'circle') {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        } else if (this.type === 'star') {
            drawStar(this.x, this.y, 5, this.size, this.size / 2);
        }

        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
}

function drawStar(x, y, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let step = Math.PI / spikes;
    ctx.moveTo(x, y - outerRadius);

    for (let i = 0; i < spikes; i++) {
        let x1 = x + Math.cos(rot) * outerRadius;
        let y1 = y + Math.sin(rot) * outerRadius;
        ctx.lineTo(x1, y1);
        rot += step;

        x1 = x + Math.cos(rot) * innerRadius;
        y1 = y + Math.sin(rot) * innerRadius;
        ctx.lineTo(x1, y1);
        rot += step;
    }

    ctx.lineTo(x, y - outerRadius);
    ctx.closePath();
}

// Initialize particles
const particles = [];
function initParticles() {
    particles.length = 0;
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle('circle'));
    }
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle('star'));
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

// Handle canvas resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Card flip function
function flipCard(card) {
    // Simply toggle the flipped class on the clicked card
    card.classList.toggle('flipped');
}

// Authentication functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}

function login(username, password) {
    if (username === 'Sirii' && password === 'Aunty') {
        loginPage.classList.add('hidden');
        birthdayPage.classList.remove('hidden');
        resizeCanvas();
        initParticles();
        animate();
        pl()
    } else {
        showError('Invalid credentials');
    }
}

function logout() {
    birthdayPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    loginForm.reset();
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password);
});

logoutButton.addEventListener('click', logout);
window.addEventListener('resize', resizeCanvas);

// Initialize Lucide icons when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});


function pl() {
    const birthdayMusic = document.getElementById('birthday-music');
    const toggleMusicBtn = document.getElementById("toggle-music");
    console.log("hello")
    if (birthdayMusic.paused) {
        birthdayMusic.play();
        toggleMusicBtn.textContent = "🔊";
    } else {
        birthdayMusic.pause();
        toggleMusicBtn.textContent = "🔈";
    }
}



// document.addEventListener('DOMContentLoaded', () => {
//     lucide.createIcons();

//     const birthdayMusic = document.getElementById('birthday-music');
//     const toggleMusicBtn = document.getElementById("toggle-music");

//     toggleMusicBtn.addEventListener("click", () => {
//         console.log("hello")
//         if (birthdayMusic.paused) {
//             birthdayMusic.play();
//             toggleMusicBtn.textContent = "🔊";
//         } else {
//             birthdayMusic.pause();
//             toggleMusicBtn.textContent = "🔈";
//         }
//     });
// });
