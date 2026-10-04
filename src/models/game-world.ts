import { cardsTemplate } from "../templates/card-template";
import { Settings } from "./settings";

export class GameWorld {
  cards_container_ref: HTMLElement;
  cards_ref: HTMLCollection;
  scorePlayer_1_ref: HTMLElement;
  scorePlayer_2_ref: HTMLElement;
  currentPlayer_img_ref: HTMLElement;

  currentPlayer: SelectedPlayer;
  players: Player;
  boardSize: selectedBoardSize;

  constructor(settings: Settings) {
    this.cards_container_ref = document.getElementById("cards") as HTMLElement;
    this.scorePlayer_1_ref = document.getElementById("score-1") as HTMLElement;
    this.scorePlayer_2_ref = document.getElementById("score-2") as HTMLElement;
    this.currentPlayer_img_ref = document.getElementById("current-player") as HTMLElement;

    this.players = settings.player;
    this.currentPlayer = settings.player.selectedPlayer;
    this.boardSize = settings.boardSize.selectedBoardSize;

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
      this.cards_container_ref.innerHTML += cardsTemplate();
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
