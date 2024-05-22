const button = document.querySelector("svg");
const menu = document.querySelector(".controls");


export function renderMenu() {
  const settingsElement = document.querySelector('.settings');

  // Remove the 'hidden' attribute. Setted hidden to prevent showing before canvas, css tricks doesn't work,  rend element with js have some issues with functionality. Not the best way,  but anyway
  if (settingsElement) {
      settingsElement.removeAttribute('hidden');
  }

  button?.addEventListener("click", () => {
    menu?.classList.toggle("transform");
  });
}
