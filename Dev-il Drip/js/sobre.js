const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

let angulo = 0;

function desenharPentagrama(cx, cy, raio) {

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

    ctx.strokeStyle = "#ff2d2d";
    ctx.lineWidth = 4;
    ctx.shadowColor = "#ff0000";
    ctx.shadowBlur = 40;
    ctx.stroke();

   
    ctx.beginPath();
    ctx.arc(cx, cy, raio, 0, Math.PI * 2);
    ctx.stroke();
}

function animar() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.save();

    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(angulo);

    const brilho = 30 + Math.sin(Date.now()/500)*15;
    ctx.shadowBlur = brilho;

    desenharPentagrama(0,0,250);

    ctx.restore();

    angulo += 0.002;

    requestAnimationFrame(animar);
}

animar();