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
        this.switchState = false;
        this.mainframe.matchfield.addEventListener("mousedown", (e) => this.mousedown(e));
        this.mainframe.matchfield.addEventListener("mousemove", (e) => this.mousemove(e));
        document.querySelector("html").addEventListener("mouseup", () => this.mouseup());
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
            }
        }
    }

    tick() {
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
        if(this.running) {
            this.frames.add();
            this.displayFps();
        }
        this.mainframe.generateNextFrame();
    }

    mousedown(e) {
        if(!this.running) {
            this.switchState = true;
            this.last = this.mainframe.getCellByCoords(e.target.getAttribute("data-value-x") - 0, e.target.getAttribute("data-value-y") - 0);
            this.last.changeStatus();
        }
    }

    mousemove(e) {
        if(!this.running) {
            if(this.switchState) {
                let tmp = this.mainframe.getCellByCoords(e.target.getAttribute("data-value-x") - 0, e.target.getAttribute("data-value-y") - 0);
                if(tmp !== this.last) {
                    this.last = tmp;
                    this.last.changeStatus();
                }
            }
        }
    }

    mouseup() {
        this.switchState = false;
    }

    reset() {
        this.mainframe.cells.forEach(c => {
            c.dead = true;
            c.updateNode();
        });
    }
}