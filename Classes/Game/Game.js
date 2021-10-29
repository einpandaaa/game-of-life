export default class Game {

    constructor(callback) {
        this.running = false;
        this.callback = callback;
    }

    tick() {
        if(this.running) {
            this.callback();
            requestAnimationFrame(() => this.tick());
        }
    }

    run() {
        this.running = true;
        requestAnimationFrame(() => this.tick());
    }

    stop() {
        this.running = false;
    }
}