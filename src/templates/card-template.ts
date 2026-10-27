import { theme } from "../types/theme";

export function cardsTemplate(id: string,_src: string, theme:theme) {
  return /*html*/ `
      <button id="${id}" class="card">
        <div class="card__inner">
          <img src="/images/backgrounds/${theme}-theme/${theme}-background.png" alt="${theme}-back-image" class="card__face" />
          <img src="/images/backgrounds/${theme}-theme/${_src}.png" alt="${_src}" class="card__face card__face--back" />
        </div>
      </button>
    `;
}