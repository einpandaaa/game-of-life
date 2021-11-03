import GolGame from "./Classes/Game/GolGame.js";

document.getElementById("next").addEventListener("click", () => game.nextStep());
document.getElementById("start").addEventListener("click", () => game.run());
document.getElementById("stop").addEventListener("click", () => game.stop());
document.getElementById("reset").addEventListener("click", () => game.reset());

let game = new GolGame();