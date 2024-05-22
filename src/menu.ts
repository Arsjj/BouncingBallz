const Menu = `
   <div>
    <button class="settings-button">
    <svg
      stroke="currentColor"
      fill="currentColor"
      stroke-width="0"
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0V0z"></path>
      <path
        d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.5.5 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.566.566 0 0 0-.18-.03c-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46a.5.5 0 0 0 .61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
      ></path>
    </svg>
  </button>
  <div class="controls">
    <label for="dx"
      >Left/Right:
      <input type="range" id="dx" min="-5" max="5" step="0.1" value="0" />
    </label>
    <label for="dy"
      >Top/Bottom:
      <input type="range" id="dy" min="-5" max="5" step="0.1" value="-2" />
    </label>
    <label for="gravity"
      >Gravity:
      <input
        type="range"
        id="gravity"
        min="-0.5"
        max="0.5"
        step="0.01"
        value="0.1"
      />
    </label>
    <label for="elasticity"
      >Elasticity:
      <input
        type="range"
        id="elasticity"
        min="0"
        max="1"
        step="0.01"
        value="0.6"
      />
    </label>
    <label for="friction"
      >Friction:
      <input
        type="range"
        id="friction"
        min="0.9"
        max="1"
        step="0.01"
        value="0.99"
      />
    </label>
  </div>
  </div>
    `;

export function renderMenu() {
  const container = document.querySelector(".settings");
  if (container) {
    container.innerHTML = Menu;
  }

  const button = document.querySelector("svg");
  const menu = document.querySelector(".controls");

  button?.addEventListener("click", () => {
    menu?.classList.toggle("transform");
  });
}
