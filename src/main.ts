import "./styles/main.scss";
import { Settings } from "./models/settings";
import { settingsTemplate } from "./templates/settings-template";
import { gameWorldTemplate } from "./templates/game-world-template";
import { GameWorld } from "./models/game-world";

const MAIN_CONTAINER: HTMLElement = document.getElementById("main-container") as HTMLElement;
const BTN_PLAY: HTMLElement = document.getElementById("btn-play") as HTMLElement;
let BTN_START_GAME: HTMLElement;

let settings: Settings;

init();

function toggleCard() {
  const field = document.getElementById("field");

  field?.addEventListener("click", (e) => {
    const card = (e.target as HTMLElement).closest(".card");

    card?.classList.toggle("is-flipped");
  });
}

function init() {
  BTN_PLAY.addEventListener("click", playGame);
}

function playGame() {
  MAIN_CONTAINER.innerHTML = settingsTemplate();
  settings = new Settings();

  BTN_START_GAME = document.getElementById("btn-start") as HTMLElement;
  BTN_START_GAME.addEventListener("click", startGame);
}

function startGame() {
  MAIN_CONTAINER.innerHTML = gameWorldTemplate();

  const GAME_WORLD = new GameWorld(settings);
  
}
