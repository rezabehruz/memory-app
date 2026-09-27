import "./styles/main.scss";

init();

function init() {
  const field = document.getElementById("field");

  field?.addEventListener("click", (e) => {
    const card = (e.target as HTMLElement).closest(".card");
    
    card?.classList.toggle("is-flipped");
  });

}
