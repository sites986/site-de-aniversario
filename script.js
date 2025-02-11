const canvas = document.getElementById('confettiCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomColor() {
    const colors = ['#ff0', '#0f0', '#00f', '#f00', '#ff00ff', '#00ffff'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createConfetti() {
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 5 + 2,
            color: randomColor(),
            speed: Math.random() * 3 + 1,
            direction: Math.random() * 2 * Math.PI
        });
    }
    return particles;
}

function drawConfetti(particles) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += Math.cos(p.direction) * p.speed;
        p.y += Math.sin(p.direction) * p.speed;
        if (p.y > canvas.height) p.y = 0;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
    });
}

document.getElementById('celebrateButton').addEventListener('click', function() {
    const particles = createConfetti();
    const animate = () => {
        drawConfetti(particles);
        requestAnimationFrame(animate);
    };
    animate();
});