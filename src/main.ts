import { canvas, initializeUserEvents } from "./canvas/canvas.ts";
import { renderMenu } from "./menu.ts";
import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.appendChild(canvas);
renderMenu();
initializeUserEvents();
