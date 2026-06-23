const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

const img = document.getElementById("icon");
const audio = document.getElementById("som");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let angulo = 0;
let tocando = false;
let mouse = { x: 0, y: 0 };

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

/* 🔓 desbloqueio obrigatório de áudio */
window.addEventListener("click", () => {
    audio.play().then(() => {
        audio.pause();
        audio.currentTime = 0;
    }).catch(() => {});
}, { once: true });

function distanciaCentro() {
    return Math.hypot(
        mouse.x - canvas.width / 2,
        mouse.y - canvas.height / 2
    );
}

function desenharPentagrama(cx, cy, raio, intensidade) {
    const pontos = [];

    for (let i = 0; i < 5; i++) {
        const a = -Math.PI / 2 + i * Math.PI * 2 / 5;
        pontos.push({
            x: cx + Math.cos(a) * raio,
            y: cy + Math.sin(a) * raio
        });
    }

    const ordem = [0, 2, 4, 1, 3, 0];

    ctx.beginPath();
    ctx.moveTo(pontos[ordem[0]].x, pontos[ordem[0]].y);

    for (let i = 1; i < ordem.length; i++) {
        ctx.lineTo(pontos[ordem[i]].x, pontos[ordem[i]].y);
    }

    ctx.strokeStyle = `rgba(255,45,45,${0.5 + intensidade})`;
    ctx.lineWidth = 4 + intensidade * 4;
    ctx.shadowColor = "#ff0000";
    ctx.shadowBlur = 20 + intensidade * 50;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, Math.PI * 2);
    ctx.stroke();
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const dist = distanciaCentro();
    const intensidade = Math.max(0, 1 - dist / 500);

    const brilho = 20 + intensidade * 60 + Math.sin(Date.now() / 400) * 10;

    ctx.shadowBlur = brilho;
    ctx.shadowColor = "#ff0000";

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angulo);

    desenharPentagrama(0, 0, 250, intensidade);

    ctx.restore();

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.font = "bold 48px Courier New";
    ctx.fillStyle = "#ff2d2d";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.shadowBlur = brilho * 0.6;
    ctx.fillText("D&D", 0, 0);

    ctx.restore();

    angulo += 0.002 + intensidade * 0.01;

    /* áudio inteligente */
    if (intensidade > 0.4) {
        if (!tocando) {
            audio.loop = true;
            audio.volume = 0.25;
            audio.play().catch(() => {});
            tocando = true;
        }
    } else {
        audio.pause();
        tocando = false;
    }

    requestAnimationFrame(animar);
}

animar();