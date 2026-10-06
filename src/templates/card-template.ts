export function cardsTemplate(_src: string, theme: selectedTheme) {
  return /*html*/ `
      <button class="card">
        <div class="card__inner">
          <img src="/images/backgrounds/${theme}-theme/${theme}-background.png" alt="" class="card__face" />
          <img src="/images/backgrounds/coding-theme/${_src}.png" alt="" class="card__face card__face--back" />
        </div>
      </button>
    `;
}