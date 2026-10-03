export function settingsTemplate(): string {
  return /*html*/ `
          <section class="settings">
        <div class="content">
          <div class="content-1">
            <div class="header">
              <h3>Settings</h3>
              <div class="line-diamond">
                <span class="line"></span>
                <span class="diamond"></span>
              </div>
            </div>
            <section class="themes">
              <div class="themes__header">
                <img src="/icons/settings.png" alt="settings" />
                <h3>Game Themes</h3>
              </div>
              <ul>
                <li id="code-theme" class="theme">
                  <span class="theme__radio"></span>
                  <span>Code vibes theme</span>
                  <div class="line-diamond">
                    <span class="line"></span>
                    <span class="diamond"></span>
                  </div>
                </li>
                <li id="gaming-theme" class="theme">
                  <span class="theme__radio"></span>
                  <span>Gaming theme</span>
                  <div class="line-diamond">
                    <span class="line"></span>
                    <span class="diamond"></span>
                  </div>
                </li>
                <li id="da-theme" class="theme">
                  <span class="theme__radio"></span>
                  <span>DA Projects theme</span>
                  <div class="line-diamond">
                    <span class="line"></span>
                    <span class="diamond"></span>
                  </div>
                </li>
                <li id="food-theme" class="theme">
                  <span class="theme__radio"></span>
                  <span>Foods theme</span>
                  <div class="line-diamond">
                    <span class="line"></span>
                    <span class="diamond"></span>
                  </div>
                </li>
              </ul>
            </section>
            <section class="players">
              <div class="players__header">
                <img src="/icons/player.png" alt="player" />
                <h3>Choose player</h3>
              </div>
              <ul>
                <li id="blue" class="player">
                  <span class="player__radio"></span>
                  <span>Blue</span>
                  <div class="line-diamond">
                    <span class="line"></span>
                    <span class="diamond"></span>
                  </div>
                </li>
                <li id="orange" class="player">
                  <span class="player__radio"></span>
                  <span>Orange</span>
                  <div class="line-diamond">
                    <span class="line"></span>
                    <span class="diamond"></span>
                  </div>
                </li>
              </ul>
            </section>
            <section class="boards">
              <div class="boards__header">
                <img src="/icons/board-size.png" alt="board-size" />
                <h3>Board size</h3>
              </div>
              <ul>
                <li id="card-16" class="board">
                  <span class="board__radio"></span>
                  <span>16 cards</span>
                  <div class="line-diamond">
                    <span class="line"></span>
                    <span class="diamond"></span>
                  </div>
                </li>
                <li id="card-24" class="board">
                  <span class="board__radio"></span>
                  <span>24 cards</span>
                  <div class="line-diamond">
                    <span class="line"></span>
                    <span class="diamond"></span>
                  </div>
                </li>
                <li id="card-36" class="board">
                  <span class="board__radio"></span>
                  <span>36 cards</span>
                  <div class="line-diamond">
                    <span class="line"></span>
                    <span class="diamond"></span>
                  </div>
                </li>
              </ul>
            </section>
          </div>

          <div class="content-2">
            <img src="/images/themes/code-theme.png" alt="code theme" class="img-theme" />
            <div class="specs-start">
              <div class="specs">
                <span>Game theme</span>
                <div class="line"></div>
                <span>Player</span>
                <div class="line"></div>
                <span>Board size</span>
              </div>
              <button>
                <img src="/icons/btn-start.png" alt="start icon" />
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
}
