import { gameOverTemplate } from "../templates/game-over-template";
import { gameWorldTemplate } from "../templates/game-world-template";
import { settingsTemplate } from "../templates/settings-template";
import { Card } from "./card";
import { ImageHub } from "./manager-models/image-hub";
import { Settings } from "./settings";

export class GameWorld {
  parent_container_ref: HTMLElement;
  cards_container_ref!: HTMLElement;
  scorePlayer_1_ref!: HTMLElement;
  scorePlayer_2_ref!: HTMLElement;
  currentPlayer_img_ref!: HTMLElement;

  static THEME: selectedTheme;

  currentPlayer!: SelectedPlayer;
  players!: Player;
  boardSize!: selectedBoardSize;

  scorePlayer_1: number = 0;
  scorePlayer_2: number = 0;

  static IMG_THEME_INDEX: number[] = [];

  MAX_FLIPPED: number = 2;
  cards: Card[] = [];

  settings: Settings;
  BTN_START_GAME: HTMLElement;

  constructor() {
    this.parent_container_ref = document.getElementById("main-container") as HTMLElement;

    this.parent_container_ref.innerHTML = settingsTemplate();
    this.settings = new Settings();

    this.BTN_START_GAME = document.getElementById("btn-start") as HTMLElement;
    this.BTN_START_GAME.addEventListener("click", () => this.startGame());
  }

  startGame() {
    this.parent_container_ref.innerHTML = gameWorldTemplate();
    GameWorld.THEME = this.settings.theme.selectedTheme;

    this.scorePlayer_1_ref = document.getElementById("score-1") as HTMLElement;
    this.scorePlayer_2_ref = document.getElementById("score-2") as HTMLElement;
    this.currentPlayer_img_ref = document.getElementById("current-player") as HTMLElement;

    this.players = this.settings.player;
    this.currentPlayer = this.settings.player.selectedPlayer;
    this.boardSize = this.settings.boardSize.selectedBoardSize;
    this.cards_container_ref = document.getElementById("cards") as HTMLElement;

    this.calculateImgThemeIndex();
    this.createCards();

    this.setCurrentPlayer();
  }

  setCurrentPlayer() {
    if (this.currentPlayer == "blue") this.currentPlayer_img_ref.setAttribute("src", "/icons/blue.png");
    else this.currentPlayer_img_ref.setAttribute("src", "/icons/orange.png");
  }

  createCards(): void {
    for (let i = 0; i < this.boardSize; i++) {
      let j: number = GameWorld.IMG_THEME_INDEX[i];
      const card: Card = new Card(i, ImageHub.CODING_THEME[j], this);
      this.cards.push(card);
    }
  }

  calculateImgThemeIndex() {
    const imgQuantity: number = this.boardSize / 2;

    GameWorld.IMG_THEME_INDEX = Array.from({ length: imgQuantity }, (_, i) => [i, i]).flat();

    this.randomizeIMG_THEME_INDEX();
  }

  randomizeIMG_THEME_INDEX(): void {
    for (let i = GameWorld.IMG_THEME_INDEX.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [GameWorld.IMG_THEME_INDEX[i], GameWorld.IMG_THEME_INDEX[j]] = [
        GameWorld.IMG_THEME_INDEX[j],
        GameWorld.IMG_THEME_INDEX[i],
      ];
    }
  }

  isFlippable() {
    let flippCount: number = 0;

    this.cards.forEach((card) => {
      if (card.IS_FLIPPED && !card.IS_MATCHED) flippCount++;
    });

    if (flippCount >= this.MAX_FLIPPED) return false;
    else return true;
  }

  checkMatch() {
    // if just two Cards are flipped for matching, then Matching Process
    let flippCount: number = 0;

    this.cards.forEach((card) => {
      if (card.IS_FLIPPED && !card.IS_MATCHED) flippCount++;
    });

    if (flippCount !== this.MAX_FLIPPED) return;

    // save Card's name for Matching Process
    let card_1: string = "card_1";
    let card_2: string = "card_2";

    this.cards.forEach((card) => {
      if (card.IS_FLIPPED && !card.IS_MATCHED) {
        if (card_1 == "card_1") card_1 = card.name;
        else card_2 = card.name;
      }
    });

    // if two cards are matched and did'nt match
    if (card_1 == card_2) {
      this.cards.forEach((card) => {
        if (card.IS_FLIPPED && !card.IS_MATCHED) {
          card.IS_MATCHED = true;
          card.MATCHED_BY = this.currentPlayer;
        }
      });

      card_1 = "card_1";
      card_2 = "card_2";

      if (this.currentPlayer == "blue") {
        this.scorePlayer_1++;
        this.scorePlayer_1_ref.innerHTML = this.scorePlayer_1.toString();
      }

      if (this.currentPlayer == "orange") {
        this.scorePlayer_2++;
        this.scorePlayer_2_ref.innerHTML = this.scorePlayer_2.toString();
      }
    } else {
      setTimeout(() => {
        this.switchUser();

        this.cards.forEach((card) => {
          if (card.IS_FLIPPED && !card.IS_MATCHED) {
            card.flippCard();
          }
        });
      }, 1000);
    }

    this.isGameOver();
  }

  IS_GAME_OVER: boolean = false;

  isGameOver() {
    this.IS_GAME_OVER = this.cards.every(this.isCardMatched);
    if (this.IS_GAME_OVER) {
      this.parent_container_ref.innerHTML = gameOverTemplate();

      this.showWinner();
    }
  }

  showWinner() {
    let matchedByBlue: number = 0;
    let matchedByOrange: number = 0;

    const content1: HTMLElement = document.getElementById("content-1") as HTMLElement;
    const content2: HTMLElement = document.getElementById("content-2") as HTMLElement;
    const bluePlayerRef: HTMLElement = document.getElementById("player-blue") as HTMLElement;
    const orangePlayerRef: HTMLElement = document.getElementById("player-orange") as HTMLElement;
    const drawScaleRef: HTMLElement = document.getElementById("draw-scale") as HTMLElement;

    const btnRestart: HTMLElement = document.getElementById("btn-home") as HTMLElement;

    this.cards.forEach((card) => {
      if (card.MATCHED_BY == "blue") matchedByBlue++;
      if (card.MATCHED_BY == "orange") matchedByOrange++;
    });

    content1.classList.add("d-none");
    content2.classList.remove("d-none");

    if (matchedByBlue == matchedByOrange) drawScaleRef.classList.add("draw-scale");
    if (matchedByBlue > matchedByOrange) bluePlayerRef.classList.add("player-blue");
    if (matchedByBlue < matchedByOrange) orangePlayerRef.classList.add("player-orange");

    btnRestart.addEventListener("click", () => {
      this.restartGame();
    });
  }

  restartGame() {
    this.parent_container_ref.innerHTML = settingsTemplate();
    this.settings = new Settings();

    this.BTN_START_GAME = document.getElementById("btn-start") as HTMLElement;
    this.BTN_START_GAME.addEventListener("click", () => this.startGame());
  }

  isCardMatched(card: Card): boolean {
    return card.IS_MATCHED;
  }

  switchUser() {
    if (this.currentPlayer == "blue") {
      this.currentPlayer = "orange";
      this.currentPlayer_img_ref.setAttribute("src", "/icons/orange.png");
    } else {
      this.currentPlayer = "blue";
      this.currentPlayer_img_ref.setAttribute("src", "/icons/blue.png");
    }
  }
}
