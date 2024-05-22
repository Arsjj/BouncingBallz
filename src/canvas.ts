export const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
export const ctx = canvas.getContext("2d");




if (!ctx) {
  throw new Error("Failed to get canvas context");
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const img = new Image()
img.src = "./pngtree-track-area-in-an-athletic-stadium-with-sun-shining-on-it-picture-image_2476690.jpg"
ctx?.drawImage(img, 10, 10);

img?.addEventListener("load", () => {
  ctx?.drawImage(img, 10, 10);
});

class Ball {
  x: number;
  y: number;
  dx: number = 0; // Horizontal velocity
  dy: number = -2; // Initial vertical velocity (Negative for the ball to move up first)
  radius: number;
  color: string;
  gravity: number = 0.1; // Strength of gravity
  elasticity: number = 0.6; // Bounce back energy loss factor
  friction: number = 0.99; // Friction factor for horizontal movement

  constructor(x: number, y: number, radius: number, color: string) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }

  bounceOff(other: Ball) {
    // Calculate the vector between the ball centers
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate collision angle
    const collisionAngle = Math.atan2(dy, dx);

    // Calculate velocities in relation to the collision angle
    const speed1 = Math.sqrt(this.dx ** 2 + this.dy ** 2);
    const speed2 = Math.sqrt(other.dx ** 2 + other.dy ** 2);

    const direction1 = Math.atan2(this.dy, this.dx);
    const direction2 = Math.atan2(other.dy, other.dx);

    // Calculate new velocities based on the conservation of momentum
    // Assuming equal mass & perfectly elastic collision for simplicity
    const velocityX1 = speed1 * Math.cos(direction1 - collisionAngle);
    const velocityY1 = speed1 * Math.sin(direction1 - collisionAngle);
    const velocityX2 = speed2 * Math.cos(direction2 - collisionAngle);
    const velocityY2 = speed2 * Math.sin(direction2 - collisionAngle);

    // Final velocities after collision, applying conservation of momentum
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

    // Added: Separate the balls to prevent sticking
    const overlap = 0.5 * (distance - this.radius - other.radius);
    this.x -= (overlap * (this.x - other.x)) / distance;
    this.y -= (overlap * (this.y - other.y)) / distance;

    other.x += (overlap * (this.x - other.x)) / distance;
    other.y += (overlap * (this.y - other.y)) / distance;
  }

  collidesWith(other: Ball): boolean {
    const distance = Math.sqrt(
      (this.x - other.x) ** 2 + (this.y - other.y) ** 2,
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

    // Bounce off the floor
    if (this.y + this.radius > canvas.height) {
      this.y = canvas.height - this.radius;
      this.dy = -this.dy * this.elasticity;
      this.dx *= this.friction; // Apply friction when bounced
    }

    // Bounce off the walls
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

let balls: Ball[] = []; // Array to hold all balls

export function initializeUserEvents() {
  canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const randomRadius = Math.floor(Math.random() * 20) + 10;
    const ball = new Ball(x, y, randomRadius, getRandomColor()); // Create a new ball
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

  ctx.fillStyle = "#f0f0f0"; // Clear canvas with background color
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
    ball.draw();
    ball.update();
  });

  requestAnimationFrame(tick);
}

// Start with a clear screen
if (ctx) {
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

