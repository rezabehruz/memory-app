import { Player } from "../interfaces/player";
import { theme } from "../types/theme";
import { GameWorld } from "./game-world";
import { BoardSize } from "../interfaces/board-size";

export class Settings {
  // #region Properties

  coding_theme_ref: HTMLElement;
  gaming_theme_ref: HTMLElement;
  da_theme_ref: HTMLElement;
  food_theme_ref: HTMLElement;
  selected_theme_ref: HTMLElement;
  image_theme_ref: HTMLElement;

  selectedTheme: theme = "coding";

  selectedPlayer: Player = GameWorld.PLAYER_1;

  // #endregion

  // #region Constructor()

  constructor() {
    this.coding_theme_ref = document.getElementById("coding-theme") as HTMLElement;
    this.gaming_theme_ref = document.getElementById("gaming-theme") as HTMLElement;
    this.da_theme_ref = document.getElementById("da-theme") as HTMLElement;
    this.food_theme_ref = document.getElementById("food-theme") as HTMLElement;
    this.selected_theme_ref = this.coding_theme_ref;
    this.image_theme_ref = document.getElementById("img-theme") as HTMLElement;

    GameWorld.PLAYER_1.el_ref = document.getElementById("blue") as HTMLElement;
    GameWorld.PLAYER_2.el_ref = document.getElementById("orange") as HTMLElement;

    GameWorld.BOARD_SIZE_16.el_ref = document.getElementById("card-16") as HTMLElement;
    GameWorld.BOARD_SIZE_24.el_ref = document.getElementById("card-24") as HTMLElement;
    GameWorld.BOARD_SIZE_36.el_ref = document.getElementById("card-36") as HTMLElement;

    this.addEvents();
  }

  // #endregion

  // #region Methods

  addEvents() {
    this.coding_theme_ref.addEventListener("click", () => this.changeTheme("coding", this.coding_theme_ref));
    this.coding_theme_ref.addEventListener("mouseenter", () =>
      this.mouseEnterThemeAnim("coding", this.coding_theme_ref),
    );
    this.coding_theme_ref.addEventListener("mouseleave", () => this.mouseLeaveThemeAnim());

    this.gaming_theme_ref.addEventListener("click", () => this.changeTheme("gaming", this.gaming_theme_ref));
    this.gaming_theme_ref.addEventListener("mouseenter", () =>
      this.mouseEnterThemeAnim("gaming", this.gaming_theme_ref),
    );
    this.gaming_theme_ref.addEventListener("mouseleave", () => this.mouseLeaveThemeAnim());

    this.da_theme_ref.addEventListener("click", () => this.changeTheme("da", this.da_theme_ref));
    this.da_theme_ref.addEventListener("mouseenter", () => this.mouseEnterThemeAnim("da", this.da_theme_ref));
    this.da_theme_ref.addEventListener("mouseleave", () => this.mouseLeaveThemeAnim());

    this.food_theme_ref.addEventListener("click", () => this.changeTheme("food", this.food_theme_ref));
    this.food_theme_ref.addEventListener("mouseenter", () => this.mouseEnterThemeAnim("food", this.food_theme_ref));
    this.food_theme_ref.addEventListener("mouseleave", () => this.mouseLeaveThemeAnim());

    if (GameWorld.PLAYER_1.el_ref && GameWorld.PLAYER_2.el_ref) {
      GameWorld.PLAYER_1.el_ref.addEventListener("click", () => this.togglePlayer(GameWorld.PLAYER_1));
      GameWorld.PLAYER_2.el_ref.addEventListener("click", () => this.togglePlayer(GameWorld.PLAYER_2));
    }

    if (GameWorld.BOARD_SIZE_16.el_ref && GameWorld.BOARD_SIZE_24.el_ref && GameWorld.BOARD_SIZE_36.el_ref) {
      GameWorld.BOARD_SIZE_16.el_ref.addEventListener("click", () => this.changeBoardSize(GameWorld.BOARD_SIZE_16));
      GameWorld.BOARD_SIZE_24.el_ref.addEventListener("click", () => this.changeBoardSize(GameWorld.BOARD_SIZE_24));
      GameWorld.BOARD_SIZE_36.el_ref.addEventListener("click", () => this.changeBoardSize(GameWorld.BOARD_SIZE_36));
    }
  }

  mouseEnterThemeAnim(theme: theme, el: HTMLElement) {
    this.coding_theme_ref.classList.remove("selected");
    this.gaming_theme_ref.classList.remove("selected");
    this.da_theme_ref.classList.remove("selected");
    this.food_theme_ref.classList.remove("selected");

    el.classList.add("selected");

    this.image_theme_ref.setAttribute("src", `/images/themes/${theme}.png`);
  }

  mouseLeaveThemeAnim() {
    this.coding_theme_ref.classList.remove("selected");
    this.gaming_theme_ref.classList.remove("selected");
    this.da_theme_ref.classList.remove("selected");
    this.food_theme_ref.classList.remove("selected");

    this.selected_theme_ref.classList.add("selected");

    this.image_theme_ref.setAttribute("src", `/images/themes/${this.selectedTheme}.png`);
  }

  changeTheme(theme: theme, el: HTMLElement) {
    this.coding_theme_ref.classList.remove("selected");
    this.gaming_theme_ref.classList.remove("selected");
    this.da_theme_ref.classList.remove("selected");
    this.food_theme_ref.classList.remove("selected");

    this.selectedTheme = theme;
    this.selected_theme_ref = el;
    this.selected_theme_ref.classList.add("selected");

    document.documentElement.dataset.theme = this.selectedTheme;
    this.image_theme_ref.setAttribute("src", `/images/themes/${theme}.png`);
  }

  togglePlayer(player: Player) {
    if (player.el_ref && GameWorld.PLAYER_1.el_ref && GameWorld.PLAYER_2.el_ref) {
      GameWorld.PLAYER_1.el_ref.classList.remove("selected");
      GameWorld.PLAYER_2.el_ref.classList.remove("selected");

      player.el_ref.classList.add("selected");
    }

    this.selectedPlayer = player;
  }

  changeBoardSize(boardSize: BoardSize) {
    GameWorld.BOARD_SIZE_16.el_ref!.classList.remove("selected");
    GameWorld.BOARD_SIZE_24.el_ref!.classList.remove("selected");
    GameWorld.BOARD_SIZE_36.el_ref!.classList.remove("selected");

    boardSize.el_ref!.classList.add("selected");

    GameWorld.SELECTED_BOARD_SIZE = boardSize.size;
  }

  // #endregion
}
