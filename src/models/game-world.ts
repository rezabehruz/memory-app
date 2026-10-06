import { cardsTemplate } from "../templates/card-template";
import { ImageHub } from "./manager-models/image-hub";
import { Settings } from "./settings";

export class GameWorld {
  cards_container_ref: HTMLElement;
  cards_ref: HTMLCollection;
  scorePlayer_1_ref: HTMLElement;
  scorePlayer_2_ref: HTMLElement;
  currentPlayer_img_ref: HTMLElement;

  theme: selectedTheme;
  currentPlayer: SelectedPlayer;
  players: Player;
  boardSize: selectedBoardSize;

  imgThemeIndex: number[] = [];

  constructor(settings: Settings) {
    this.cards_container_ref = document.getElementById("cards") as HTMLElement;
    this.scorePlayer_1_ref = document.getElementById("score-1") as HTMLElement;
    this.scorePlayer_2_ref = document.getElementById("score-2") as HTMLElement;
    this.currentPlayer_img_ref = document.getElementById("current-player") as HTMLElement;

    this.theme = settings.theme.selectedTheme;
    this.players = settings.player;
    this.currentPlayer = settings.player.selectedPlayer;
    this.boardSize = settings.boardSize.selectedBoardSize;

    this.calculateImgThemeIndex();
    this.renderCards();
    this.cards_ref = document.getElementsByClassName("card") as HTMLCollection;
    this.addEvents();

    this.scorePlayer_1_ref.innerHTML = "5";
    this.scorePlayer_2_ref.innerHTML = "5";

    this.setCurrentPlayer();
  }

  setCurrentPlayer() {
    if (this.currentPlayer == "blue") this.currentPlayer_img_ref.setAttribute("src", "/icons/blue.png");
    else this.currentPlayer_img_ref.setAttribute("src", "/icons/orange.png");
  }

  renderCards() {
    for (let i = 0; i < this.boardSize; i++) {
      let j: number = this.imgThemeIndex[i];
      this.cards_container_ref.innerHTML += cardsTemplate(ImageHub.CODING_THEME[j], this.theme);
    }
  }

  calculateImgThemeIndex() {
    const imgQuantity: number = this.boardSize / 2;

    this.imgThemeIndex = Array.from({ length: imgQuantity }, (_, i) => [i, i]).flat();

    this.randomizeImgThemeIndex();
  }

  randomizeImgThemeIndex(): void {
    for (let i = this.imgThemeIndex.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [this.imgThemeIndex[i], this.imgThemeIndex[j]] = [this.imgThemeIndex[j], this.imgThemeIndex[i]];
    }
  }

  addEvents() {
    for (let i = 0; i < this.cards_ref.length; i++) {
      this.cards_ref[i].addEventListener("click", () => {
        this.cards_ref[i]?.classList.toggle("is-flipped");
      });
    }
  }
}
