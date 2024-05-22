// import { canvas, initializeUserEvents } from "./canvas.ts";
// import "./style.css";
// document.querySelector<HTMLDivElement>("#app")!.appendChild(canvas);

// initializeUserEvents();


export const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
export const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Failed to get canvas context");
}

function resizeCanvas() {
  canvas.width = window.innerWidth- 30;
  canvas.height = window.innerHeight - 30;
  drawPlayground();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Ball {
  x: number;
  y: number;
  dx: number = 0;
  dy: number = -2;
  radius: number;
  color: string;
  gravity: number = 0.1;
  elasticity: number = 0.6;
  friction: number = 0.99;

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  bounceOff(other: Ball) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const collisionAngle = Math.atan2(dy, dx);
    const speed1 = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    const speed2 = Math.sqrt(other.dx ** 2 + other.dy ** 2);
    const direction1 = Math.atan2(this.dy, this.dx);
    const direction2 = Math.atan2(other.dy, other.dx);
    const velocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
    const velocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
    const velocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
    const velocityY2 = speed2 * Math.sin(direction2 - collisionAngle);
    this.dx = ((velocityX1 * (1 - 1) + 2 * velocityX2) / (1 + 1)) * Math.cos(collisionAngle) - velocityY1 * Math.sin(collisionAngle);
    this.dy = velocityY1 * Math.cos(collisionAngle) + ((velocityX1 * (1 - 1) + 2 * velocityX2) / (1 + 1)) * Math.sin(collisionAngle);
    other.dx = ((velocityX2 * (1 - 1) + 2 * velocityX1) / (1 + 1)) * Math.cos(collisionAngle) - velocityY2 * Math.sin(collisionAngle);
    other.dy = velocityY2 * Math.cos(collisionAngle) + ((velocityX2 * (1 - 1) + 2 * velocityX1) / (1 + 1)) * Math.sin(collisionAngle);
    const overlap = 0.5 * (distance - this.radius - other.radius);
    this.x -= (overlap * (this.x - other.x)) / distance;
    this.y -= (overlap * (this.y - other.y)) / distance;
    other.x += (overlap * (this.x - other.x)) / distance;
    other.y += (overlap * (this.y - other.y)) / distance;
  }

  collidesWith(other: Ball): boolean {
    const distance = Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
    return distance <= this.radius + other.radius;
  }

  draw() {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.dy += this.gravity;
    this.y += this.dy;
    this.x += this.dx;
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.dy = -this.dy * this.elasticity;
      this.dx *= this.friction;
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
      this.x = this.x - this.radius < 0 ? this.radius : canvas.width - this.radius;
    }
    if (Math.abs(this.dy) < 0.01) {
      this.dy = 0;
    }
  }
}

let balls: Ball[] = [];

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const randomRadius = Math.floor(Math.random() * 20) + 10;
  const ball = new Ball(x, y, randomRadius, getRandomColor());
  if (balls.length >= 100) {
    balls.shift();
  }
  balls.push(ball);
});

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function drawPlayground() {
  if (!ctx) return;

  // Draw sky with gradient
  const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGradient.addColorStop(0, "#87CEEB");
  skyGradient.addColorStop(1, "#ffffff");
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grass
  const grassGradient = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
  grassGradient.addColorStop(0, " #a0d911");
  grassGradient.addColorStop(1, "#32CD32");
  ctx.fillStyle = grassGradient;
  ctx.fillRect(0, canvas.height * 0.5, canvas.width, canvas.height * 0.5);

  // Draw playground elements

  // Slide
  ctx.fillStyle = "#FFD700";
  ctx.beginPath();
  ctx.moveTo(canvas.width * 0.2, canvas.height * 0.5);
  ctx.lineTo(canvas.width * 0.3, canvas.height * 0.8);
  ctx.lineTo(canvas.width * 0.25, canvas.height * 0.8);
  ctx.lineTo(canvas.width * 0.15, canvas.height * 0.5);
  ctx.fill();

  // Swing set
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(canvas.width * 0.6, canvas.height * 0.4, 10, 100);
  ctx.fillRect(canvas.width * 0.8, canvas.height * 0.4, 10, 100);
  ctx.fillRect(canvas.width * 0.6, canvas.height * 0.4, 200, 10);
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(canvas.width * 0.65, canvas.height * 0.4);
  ctx.lineTo(canvas.width * 0.65, canvas.height * 0.6);
  ctx.moveTo(canvas.width * 0.75, canvas.height * 0.4);
  ctx.lineTo(canvas.width * 0.75, canvas.height * 0.6);
  ctx.stroke();

  // Sandbox
//   ctx.fillStyle = "#FFD700";
//   ctx.fillRect(canvas.width * 0.4, canvas.height * 0.7, 100, 50);

  // Trees
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(canvas.width * 0.05, canvas.height * 0.5, 20, 50);
  ctx.fillRect(canvas.width * 0.85, canvas.height * 0.6, 20, 50);
  ctx.fillStyle = "#006400";
  ctx.beginPath();
  ctx.arc(canvas.width * 0.05 + 10, canvas.height * 0.48, 40, 0, Math.PI * 2);
  ctx.arc(canvas.width * 0.85 + 10, canvas.height * 0.6, 30, 0, Math.PI * 2);
  ctx.fill();
}

function tick() {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the playground background
  drawPlayground();

  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const ballA = balls[i];
      const ballB = balls[j];
      if (ballA.collidesWith(ballB)) {
        ballA.bounceOff(ballB);
      }
    }
  }

  balls.forEach((ball) => {
    ball.update();
    ball.draw();
  });

  requestAnimationFrame(tick);
}

tick();
