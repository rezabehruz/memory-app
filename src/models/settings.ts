export class Settings {
  // #region Properties

  coding_theme_ref: HTMLElement;
  gaming_theme_ref: HTMLElement;
  da_theme_ref: HTMLElement;
  food_theme_ref: HTMLElement;
  image_theme_ref: HTMLElement;

  color_blue_ref: HTMLElement;
  color_orange_ref: HTMLElement;

  card_16_ref: HTMLElement;
  card_24_ref: HTMLElement;
  card_36_ref: HTMLElement;

  theme: Theme = {
    coding: "coding",
    gaming: "gaming",
    da: "da",
    food: "food",
    selectedTheme: "coding",
  };

  player: Player = {
    blue: "blue",
    orange: "orange",
    selectedPlayer: "blue",
  };

  boardSize: BoardSize = {
    board_1: 16,
    board_2: 24,
    board_3: 36,
    selectedBoardSize: 24,
  };

  // #endregion

  // #region Constructor()

  constructor() {
    this.coding_theme_ref = document.getElementById("coding-theme") as HTMLElement;
    this.gaming_theme_ref = document.getElementById("gaming-theme") as HTMLElement;
    this.da_theme_ref = document.getElementById("da-theme") as HTMLElement;
    this.food_theme_ref = document.getElementById("food-theme") as HTMLElement;
    this.image_theme_ref = document.getElementById("img-theme") as HTMLElement;

    this.color_blue_ref = document.getElementById("blue") as HTMLElement;
    this.color_orange_ref = document.getElementById("orange") as HTMLElement;

    this.card_16_ref = document.getElementById("card-16") as HTMLElement;
    this.card_24_ref = document.getElementById("card-24") as HTMLElement;
    this.card_36_ref = document.getElementById("card-36") as HTMLElement;

    this.addEvents();
  }

  // #endregion

  // #region Methods

  addEvents() {
    this.coding_theme_ref.addEventListener("click", () => this.changeTheme("coding", this.coding_theme_ref));
    this.gaming_theme_ref.addEventListener("click", () => this.changeTheme("gaming", this.gaming_theme_ref));
    this.da_theme_ref.addEventListener("click", () => this.changeTheme("da", this.da_theme_ref));
    this.food_theme_ref.addEventListener("click", () => this.changeTheme("food", this.food_theme_ref));

    this.color_blue_ref.addEventListener("click", () => this.togglePlayer("blue", this.color_blue_ref));
    this.color_orange_ref.addEventListener("click", () => this.togglePlayer("orange", this.color_orange_ref));

    this.card_16_ref.addEventListener("click", () => this.changeBoardSize(16, this.card_16_ref));
    this.card_24_ref.addEventListener("click", () => this.changeBoardSize(24, this.card_24_ref));
    this.card_36_ref.addEventListener("click", () => this.changeBoardSize(36, this.card_36_ref));
  }

  changeTheme(theme: selectedTheme, el: HTMLElement) {
    this.coding_theme_ref.classList.remove("selected");
    this.gaming_theme_ref.classList.remove("selected");
    this.da_theme_ref.classList.remove("selected");
    this.food_theme_ref.classList.remove("selected");

    this.theme.selectedTheme = theme;
    el.classList.add("selected");

    this.image_theme_ref.setAttribute("src", `/images/themes/${theme}.png`);
  }

  togglePlayer(color: SelectedPlayer, el: HTMLElement) {
    this.color_blue_ref.classList.remove("selected");
    this.color_orange_ref.classList.remove("selected");

    el.classList.add("selected");

    this.player.selectedPlayer = color;
  }

  changeBoardSize(boardSize: selectedBoardSize, el: HTMLElement) {
    this.card_16_ref.classList.remove("selected");
    this.card_24_ref.classList.remove("selected");
    this.card_36_ref.classList.remove("selected");

    el.classList.add("selected");

    this.boardSize.selectedBoardSize = boardSize;
  }

  // #endregion
}
