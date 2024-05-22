import drawPlayground from "./playground";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Failed to get canvas context");
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 10;
  ctx && drawPlayground(canvas, ctx);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const dxControl = document.getElementById("dx") as HTMLInputElement;
const dyControl = document.getElementById("dy") as HTMLInputElement;
const gravityControl = document.getElementById("gravity") as HTMLInputElement;
const elasticityControl = document.getElementById(
  "elasticity"
) as HTMLInputElement;
const frictionControl = document.getElementById("friction") as HTMLInputElement;

let dxValue: number = 0;
let dyValue: number = -2;

dxControl?.addEventListener("input", () => {
  dxValue = parseFloat(dxControl.value);
});

dyControl?.addEventListener("input", () => {
  dyValue = parseFloat(dyControl.value);
});

gravityControl?.addEventListener("input", () => {
  balls.forEach((ball) => (ball.gravity = parseFloat(gravityControl.value)));
});

elasticityControl?.addEventListener("input", () => {
  balls.forEach(
    (ball) => (ball.elasticity = parseFloat(elasticityControl.value))
  );
});

frictionControl?.addEventListener("input", () => {
  balls.forEach((ball) => (ball.friction = parseFloat(frictionControl.value)));
});

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

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string,
    dx: number,
    dy: number,
    gravity: number,
    elasticity: number,
    friction: number
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
    this.gravity = gravity;
    this.elasticity = elasticity;
    this.friction = friction;
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
    this.dx =
      ((velocityX1 * (1 - 1) + 2 * velocityX2) / (1 + 1)) *
        Math.cos(collisionAngle) -
      velocityY1 * Math.sin(collisionAngle);
    this.dy =
      velocityY1 * Math.cos(collisionAngle) +
      ((velocityX1 * (1 - 1) + 2 * velocityX2) / (1 + 1)) *
        Math.sin(collisionAngle);
    other.dx =
      ((velocityX2 * (1 - 1) + 2 * velocityX1) / (1 + 1)) *
        Math.cos(collisionAngle) -
      velocityY2 * Math.sin(collisionAngle);
    other.dy =
      velocityY2 * Math.cos(collisionAngle) +
      ((velocityX2 * (1 - 1) + 2 * velocityX1) / (1 + 1)) *
        Math.sin(collisionAngle);
    const overlap = 0.5 * (distance - this.radius - other.radius);
    this.x -= (overlap * (this.x - other.x)) / distance;
    this.y -= (overlap * (this.y - other.y)) / distance;
    other.x += (overlap * (this.x - other.x)) / distance;
    other.y += (overlap * (this.y - other.y)) / distance;
  }

  collidesWith(other: Ball): boolean {
    const distance = Math.sqrt(
      (this.x - other.x) ** 2 + (this.y - other.y) ** 2
    );
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
      this.x =
        this.x - this.radius < 0 ? this.radius : canvas.width - this.radius;
    }
    if (Math.abs(this.dy) < 0.01) {
      this.dy = 0;
    }
  }
}

let balls: Ball[] = [];

export function initializeUserEvents() {
  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const dx = dxValue;
    const dy = dyValue;
    const randomRadius = Math.floor(Math.random() * 20) + 10;
    const gravity = 0.1; // default value for gravity
    const elasticity = 0.6; // default value for elasticity
    const friction = 0.99; // default value for friction
    const ball = new Ball(
      x,
      y,
      randomRadius,
      getRandomColor(),
      dx,
      dy,
      gravity,
      elasticity,
      friction
    );
    if (balls.length >= 100) {
      balls.shift();
    }
    balls.push(ball);
  });
  tick();
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function tick() {
  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw the playground background
  drawPlayground(canvas, ctx);

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

export { canvas, ctx };
