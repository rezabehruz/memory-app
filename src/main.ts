import "./styles/main.scss";
import { GameWorld } from "./models/game-world";
import { homeTemplate } from "./templates/home-template";

init();

function init() {
  const MAIN_CONTAINER: HTMLElement = document.getElementById("main-container") as HTMLElement;
  MAIN_CONTAINER.innerHTML = homeTemplate();

  const BTN_PLAY: HTMLElement = document.getElementById("btn-play") as HTMLElement;
  BTN_PLAY.addEventListener("click", playGame);
}

function playGame() {
  const gameWorld = new GameWorld();
}
