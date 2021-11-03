export default class Game {

    constructor(callback) {
        this.running = false;
        this.callback = callback;
        this.lastFrame = Date.now();
    }

    tick() {
        if(this.running) {
            if(Date.now() - this.lastFrame >= (1000/30)) {
                this.callback();
                this.lastFrame = Date.now();
            }
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