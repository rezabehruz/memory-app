export function gameWorldTemplate(): string {
  return /*html*/ `
  <section class="world">
        <div class="content">
          <div class="header">
            <div class="players">
              <div class="player-1">
                <img src="/icons/blue.png" alt="blue arrow" id="player-1"/>
                <p>Blue <span id="score-1"> 0 </span></p>
              </div>
              <div class="player-2">
                <img src="/icons/orange.png" alt="orange arrow" id="player-2"/>
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
              <svg
                  class="exit-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                   >
                  <path d="M13 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" />
                  <path d="M16 16l5-4-5-4" />
                  <path d="M21 12H9" />
              </svg>
              Exit game
            </button>
          </div>
          <div id="cards" class="cards">
          </div>
        </div>
      </section>
  `;
}
