export function gameWorldTemplate(): string {
  return /*html*/ `
  <section class="world">
        <div class="content">
          <div class="header">
            <div class="players">
              <div class="player-1">
                <img src="/icons/blue.png" alt="blue arrow" />
                <p>Blue <span id="score-1"> 0 </span></p>
              </div>
              <div class="player-2">
                <img src="/icons/orange.png" alt="orange arrow" />
                <p>Orange <span id="score-2"> 0 </span></p>
              </div>
            </div>
            <div class="current-player">
              <span>
                Current player
              </span>
              <img src="/icons/orange.png" alt="current player arrow" id="current-player"/>
            </div>
            <button class="exit-game">
              <img src="/icons/exit.png" alt="exit game" />
              Exit game
            </button>
          </div>
          <div id="cards" class="cards">
          </div>
        </div>
      </section>
  `;
}
