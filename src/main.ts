import "./styles/main.scss";
import { Settings } from "./models/settings";
import { settingsTemplate } from "./templates/settingsTemplate";


const MAIN_CONTAINER: HTMLElement = document.getElementById("main-container") as HTMLElement;

init();

function toggleCard() {
  const field = document.getElementById("field");

  field?.addEventListener("click", (e) => {
    const card = (e.target as HTMLElement).closest(".card");

    card?.classList.toggle("is-flipped");
  });
}

function init() {
  const BTN_PLAY: HTMLElement = document.getElementById("btn-play") as HTMLElement;
  BTN_PLAY.addEventListener("click", playGame);

  const Setting: Settings = new Settings();
  console.log(Setting);
}

function playGame() {
  console.log("from playGame() function");
  MAIN_CONTAINER.innerHTML = settingsTemplate();
}
