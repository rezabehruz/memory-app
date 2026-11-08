export function homeTemplate(): string {
  return /*html*/ `
      <section class="home">
        <div class="content">
          <p>It's play time. <span class="to-play">Ready to play?</span></p>
          <button id="btn-play">
            <img src="/icons/stadia-controller.png" alt="play-button" class="img-play" />
            <span class="play"> Play </span>
            <div class="arrow-icon">
              <span></span>
            </div>
          </button>
          <img src="/images/backgrounds/stadia-controller.png" alt="satdia controller" class="stadia-controller" />
        </div>
      </section>
  `;
}
