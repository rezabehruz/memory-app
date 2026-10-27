import { Player } from "../interfaces/player";
import { cardsTemplate } from "../templates/card-template";
import { GameWorld } from "./game-world";

export class Card {
  id: number;
  el_ref: HTMLElement;
  name: string;
  IS_FLIPPED: boolean = false;
  IS_MATCHED: boolean = false;
  gameWorld: GameWorld;

  constructor(_id: number, _name: string, _gameWorld: GameWorld) {
    this.id = _id;
    this.name = _name;
    this.gameWorld = _gameWorld;

    const card_ID = "card-" + this.id;
    this.renderCard(card_ID, this.name);

    this.el_ref = document.getElementById(card_ID) as HTMLElement;

    this.el_ref.addEventListener("click", () => {
      this.flippCard();
    });
  }

  renderCard(id: string, src: string): void {
    this.gameWorld.cards_container_ref.insertAdjacentHTML("beforeend", cardsTemplate(id, src, GameWorld.THEME));
  }

  flippCard() {
    // matched Cards are not allowed to flipp
    if (this.IS_FLIPPED && this.IS_MATCHED) return;

    // only unmatched Cards are allowed to flipp
    if (this.IS_FLIPPED && !this.IS_MATCHED) {
      this.IS_FLIPPED = false;
      this.el_ref.classList.toggle("is-flipped");
      return;
    }

    // maximum two unmatched cards are allowed to flipp
    if (this.gameWorld.isFlippable()) {
      this.IS_FLIPPED = true;
      this.el_ref.classList.toggle("is-flipped");

      this.gameWorld.checkMatch();
    }
  }
}
