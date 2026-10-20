import "./styles/main.scss";
import { GameWorld } from "./models/game-world";

init();

function init() {
  const BTN_PLAY: HTMLElement = document.getElementById("btn-play") as HTMLElement;
  BTN_PLAY.addEventListener("click", playGame);
}

function playGame() {
  const gameWorld = new GameWorld();
}
