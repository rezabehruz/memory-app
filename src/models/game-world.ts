import { cardsTemplate } from "../templates/card-template";
import { Settings } from "./settings";

export class GameWorld {
  cardsContainer: HTMLElement;
  currentPlayer: SelectedPlayer;
  players: Player;
  boardSize: BoardSize;

  constructor(settings: Settings) {
    this.cardsContainer = document.getElementById("cards") as HTMLElement;
    this.players = settings.player;
    this.currentPlayer = settings.player.selectedPlayer;
    this.boardSize = settings.boardSize;

    this.renderCards();
  }

  renderCards() {
    for (let i = 0; i < this.boardSize.selectedBoardSize; i++) {
      this.cardsContainer.innerHTML += cardsTemplate();
    }
  }
}
