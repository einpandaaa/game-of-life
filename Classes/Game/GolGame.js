import Game from "./Game.js";
import Mainframe from "../Entities/Mainframe.js";
import Cell from "../Entities/Cell.js";
import LinkedList from "../Utility/LinkedList.js";

export default class GolGame extends Game {

    constructor() {
        super(() => this.nextStep());
        this.mainframe = new Mainframe(document.getElementById("mainframe"), []);
        this.init();
        this.generate();
    }

    init() {
        this.frames = new LinkedList();
        let cell = new Cell(0, 0);
        this.mainframe.matchfield.appendChild(cell.node);
        this.mainframe.setRowConfig(cell.node);
        this.mainframe.matchfield.removeChild(cell.node);
    }

    generate() {
        for (let r = 0; r < this.mainframe.rows; r++) {
            let row = document.createElement('div');
            row.className = 'row';
            this.mainframe.matchfield.appendChild(row);

            for (let c = 0; c < this.mainframe.cellsPerRow; c++) {
                let cell = new Cell(c, r);
                this.mainframe.addCell(cell);
                row.appendChild(cell.node);
                cell.node.addEventListener("click", e => cell.changeStatus());
            }
        }
    }

    tick() {
        if(this.running) {
            this.frames.add();
            this.displayFps();
        }
        super.tick();
    }

    run() {
        document.getElementById("start").classList.add("d-none");
        document.getElementById("stop").classList.remove("d-none");
        super.run();
    }

    stop() {
        this.frames.clear();
        document.getElementById("start").classList.remove("d-none");
        document.getElementById("stop").classList.add("d-none");
        this.displayFps();
        super.stop();
    }

    displayFps() {
        document.getElementById("fps").innerText = this.frames.getSize() + " fps";
    }

    nextStep() {
        this.mainframe.generateNextFrame();
    }

    previousStep() {
        this.mainframe.generatePreviousFrame();
    }
}