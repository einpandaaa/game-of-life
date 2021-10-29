import GolGame from "./Classes/Game/GolGame.js";

document.getElementById("next").addEventListener("click", () => game.nextStep());
document.getElementById("start").addEventListener("click", () => game.run());
document.getElementById("stop").addEventListener("click", () => game.stop());
document.getElementById("revert").addEventListener("click", () => game.previousStep());

let game = new GolGame();