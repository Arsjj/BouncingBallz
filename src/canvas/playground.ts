export default function drawPlayground(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  // // Draw sky with gradient
  const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  skyGradient.addColorStop(0, "#87CEEB");
  skyGradient.addColorStop(1, "#ffffff");
  ctx.fillStyle = skyGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const grassGradient = ctx.createLinearGradient(
    0,
    canvas.height * 0.5,
    0,
    canvas.height
  );
  grassGradient.addColorStop(0, " #a0d911");
  grassGradient.addColorStop(1, "#32CD32");
  ctx.fillStyle = grassGradient;
  ctx.fillRect(0, canvas.height * 0.6, canvas.width, canvas.height * 0.4);

  // Draw tennis court lines
  ctx.strokeStyle = "#FFFFFF";
  ctx.lineWidth = 2;

  // Outer boundary
  ctx.strokeRect(
    10,
    canvas.height * 0.65 + 10,
    canvas.width - 20,
    canvas.height * 0.3 - 20
  );

  // Center line
  //   ctx.beginPath();
  //   ctx.moveTo(canvas.width / 2.02, canvas.height * 0.65 + 10);
  //   ctx.lineTo(canvas.width / 2.02, canvas.height * 0.95 - 10);
  //   ctx.stroke();

  //   ctx.beginPath();
  //   ctx.moveTo(canvas.width / 1.98, canvas.height * 0.65 + 10);
  //   ctx.lineTo(canvas.width / 1.98, canvas.height * 0.95 - 10);
  //   ctx.stroke();

  // Service boxes
  ctx.beginPath();
  ctx.moveTo(10, canvas.height * 0.75);
  ctx.lineTo(10 + 50, canvas.height * 0.75);
  ctx.lineTo(10 + 50, canvas.height * 0.55);
  ctx.lineTo(10, canvas.height * 0.55);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(canvas.width - 10, canvas.height * 0.75);
  ctx.lineTo(canvas.width - 10 - 50, canvas.height * 0.75);
  ctx.lineTo(canvas.width - 10 - 50, canvas.height * 0.55);
  ctx.lineTo(canvas.width - 10, canvas.height * 0.55);
  ctx.stroke();

  // Net
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, canvas.height * 0.65 + 10);
  ctx.lineTo(canvas.width / 2, canvas.height * 0.95 - 10);
  ctx.setLineDash([5, 15]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw some additional playground elements (e.g., trees, benches, etc.)
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(
    canvas.width * 0.2,
    canvas.height * 0.55,
    20,
    canvas.height * 0.1
  );
  ctx.fillStyle = "#228B22";
  ctx.beginPath();
  ctx.arc(canvas.width * 0.21, canvas.height * 0.55, 30, 0, Math.PI * 2);
  ctx.fill();

  // Draw a bench
  ctx.fillStyle = "#CD853F";
  ctx.fillRect(canvas.width * 0.7, canvas.height * 0.6, 80, 20);
  ctx.fillRect(canvas.width * 0.7 + 10, canvas.height * 0.6 - 10, 10, 30);
  ctx.fillRect(canvas.width * 0.7 + 60, canvas.height * 0.6 - 10, 10, 30);
}
