import { canvas, initializeUserEvents } from "./canvas.ts";
import "./style.css";
document.querySelector<HTMLDivElement>("#app")!.appendChild(canvas);
initializeUserEvents();
