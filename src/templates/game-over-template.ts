export function gameOverTemplate(){
    return /*html*/ `
          <section class="game-over">
        <div class="content-1">
          <h2>Game over</h2>
          <p class="header">Final score</p>
          <div class="players">
            <div class="player-1">
              <img src="/icons/blue.png" alt="blue arrow" />
              <p>Blue <span id="final-score-1"> 0 </span></p>
            </div>
            <div class="player-2">
              <img src="/icons/orange.png" alt="orange arrow" />
              <p>Orange <span id="final-score-2"> 0 </span></p>
            </div>
          </div>
        </div>

        <div class="content-2">
          <div class="player-orange">
            <p>The winner is</p>
            <h3>Orange Player</h3>
            <img id="logo-player" src="/icons/player-orange.png" alt="player-orange" />
          </div>

          <div class="player-blue d-none">
            <p>The winner is</p>
            <h3>Blue Player</h3>
            <img id="logo-player" src="/icons/player-blue.png" alt="player-blue" />
          </div>

          <div class="draw-scale d-none">
            <p>It's a</p>
            <h3>DRAW</h3>
            <img src="/icons/scale-icon.png" alt="scale-icon" />
          </div>

          <button id="btn-home">Back to start</button>
        </div>
      </section>
    `;
}