import { boardSizes } from "../types/board-size";
import { Player } from "../interfaces/player";
import { gameOverTemplate } from "../templates/game-over-template";
import { gameWorldTemplate } from "../templates/game-world-template";
import { settingsTemplate } from "../templates/settings-template";
import { Card } from "./card";
import { ImageHub } from "./manager-models/image-hub";
import { Settings } from "./settings";
import { theme } from "../types/theme";
import { BoardSize } from "../interfaces/board-size";

export class GameWorld {
  parent_container_ref: HTMLElement;
  cards_container_ref!: HTMLElement;

  static THEME: theme;

  static PLAYER_1: Player = {
    color: "blue",
    score: 0,
    el_ref: null,
    score_ref: null,
  };

  static PLAYER_2: Player = {
    color: "orange",
    score: 0,
    el_ref: null,
    score_ref: null,
  };

  currentPlayer!: Player;

  static BOARD_SIZE_16: BoardSize = {
    size: 16,
    el_ref: null,
  };

  static BOARD_SIZE_24: BoardSize = {
    size: 24,
    el_ref: null,
  };

  static BOARD_SIZE_36: BoardSize = {
    size: 36,
    el_ref: null,
  };

  static SELECTED_BOARD_SIZE: boardSizes = 24;

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
    GameWorld.THEME = this.settings.selectedTheme;

    GameWorld.PLAYER_1.score_ref = document.getElementById("score-1") as HTMLElement;
    GameWorld.PLAYER_2.score_ref = document.getElementById("score-2");
    this.currentPlayer = this.settings.selectedPlayer;
    this.currentPlayer.el_ref = document.getElementById("current-player") as HTMLElement;

    this.cards_container_ref = document.getElementById("cards") as HTMLElement;

    this.calculateImgThemeIndex();
    this.createCards();

    this.setCurrentPlayer();
  }

  setCurrentPlayer() {
    if (this.currentPlayer.color == "blue") this.currentPlayer.el_ref!.setAttribute("src", "/icons/blue.png");
    else this.currentPlayer.el_ref!.setAttribute("src", "/icons/orange.png");
  }

  createCards(): void {
    for (let i = 0; i < GameWorld.SELECTED_BOARD_SIZE; i++) {
      let j: number = GameWorld.IMG_THEME_INDEX[i];
      const card: Card = new Card(i, ImageHub.CODING_THEME[j], this);
      this.cards.push(card);
    }
  }

  calculateImgThemeIndex() {
    const imgQuantity: number = GameWorld.SELECTED_BOARD_SIZE / 2;

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

      if (this.currentPlayer.color == "blue" && GameWorld.PLAYER_1.score_ref) {
        GameWorld.PLAYER_1.score++;
        GameWorld.PLAYER_1.score_ref.innerHTML = GameWorld.PLAYER_1.score.toString();
      }

      if (this.currentPlayer.color == "orange" && GameWorld.PLAYER_2.score_ref) {
        GameWorld.PLAYER_2.score++;
        GameWorld.PLAYER_2.score_ref.innerHTML = GameWorld.PLAYER_2.score.toString();
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

    this.gameOver();
  }

  IS_GAME_OVER: boolean = false;

  gameOver() {
    this.IS_GAME_OVER = this.cards.every(this.isCardMatched);

    if (this.IS_GAME_OVER) {
      this.parent_container_ref.innerHTML = gameOverTemplate();
      let final_score_1_ref = document.getElementById("final-score-1") as HTMLElement;
      let final_score_2_ref = document.getElementById("final-score-2") as HTMLElement;
      final_score_1_ref.innerHTML = GameWorld.PLAYER_1.score.toString();
      final_score_2_ref.innerHTML = GameWorld.PLAYER_2.score.toString();
      setTimeout(() => this.showWinner(), 2000);
    }
  }

  showWinner() {
    const content1: HTMLElement = document.getElementById("content-1") as HTMLElement;
    const content2: HTMLElement = document.getElementById("content-2") as HTMLElement;
    const bluePlayerRef: HTMLElement = document.getElementById("player-blue") as HTMLElement;
    const orangePlayerRef: HTMLElement = document.getElementById("player-orange") as HTMLElement;
    const drawScaleRef: HTMLElement = document.getElementById("draw-scale") as HTMLElement;

    const btnRestart: HTMLElement = document.getElementById("btn-home") as HTMLElement;

    content1.classList.add("d-none");
    content2.classList.remove("d-none");

    if (GameWorld.PLAYER_1.score == GameWorld.PLAYER_2.score) drawScaleRef.classList.add("draw-scale");
    if (GameWorld.PLAYER_1.score > GameWorld.PLAYER_2.score) bluePlayerRef.classList.add("player-blue");
    if (GameWorld.PLAYER_1.score < GameWorld.PLAYER_2.score) orangePlayerRef.classList.add("player-orange");

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
    if (this.currentPlayer.color == "blue") {
      this.currentPlayer.color = "orange";
      this.currentPlayer.el_ref!.setAttribute("src", "/icons/orange.png");
    } else {
      this.currentPlayer.color = "blue";
      this.currentPlayer.el_ref!.setAttribute("src", "/icons/blue.png");
    }
  }
}
