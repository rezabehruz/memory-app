import { cardsTemplate } from "../templates/card-template";
import { gameWorldTemplate } from "../templates/game-world-template";
import { Card } from "./card";
import { ImageHub } from "./manager-models/image-hub";
import { Settings } from "./settings";

export class GameWorld {
  cards_container_ref: HTMLElement;
  scorePlayer_1_ref: HTMLElement;
  scorePlayer_2_ref: HTMLElement;
  currentPlayer_img_ref: HTMLElement;

  static THEME: selectedTheme;

  currentPlayer: SelectedPlayer;
  players: Player;
  boardSize: selectedBoardSize;

  scorePlayer_1: number = 0;
  scorePlayer_2: number = 0;

  static IMG_THEME_INDEX: number[] = [];

  MAX_FLIPPED: number = 2;
  cards: Card[] = [];

  constructor(settings: Settings) {
    this.scorePlayer_1_ref = document.getElementById("score-1") as HTMLElement;
    this.scorePlayer_2_ref = document.getElementById("score-2") as HTMLElement;
    this.currentPlayer_img_ref = document.getElementById("current-player") as HTMLElement;

    this.players = settings.player;
    this.currentPlayer = settings.player.selectedPlayer;
    this.boardSize = settings.boardSize.selectedBoardSize;
    this.cards_container_ref = document.getElementById("cards") as HTMLElement;

    this.calculateImgThemeIndex();

    this.createCards();

    this.scorePlayer_1_ref.innerHTML = this.scorePlayer_1.toString();
    this.scorePlayer_2_ref.innerHTML = this.scorePlayer_2.toString();

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
        if (card.IS_FLIPPED && !card.IS_MATCHED) card.IS_MATCHED = true;
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
