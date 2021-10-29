export default class Cell {

    constructor(x, y) {
        this.dead = true;
        this.x = x;
        this.y = y;
        let node = document.createElement('div');
        node.className = 'entity';
        node.classList.add("dead");
        this.node = node;
    }

    changeStatus() {
        this.dead = !this.dead;
        if(this.dead) {
            this.node.classList.remove("alive");
            this.node.classList.add("dead");
        } else {
            this.node.classList.remove("dead");
            this.node.classList.add("alive");
        }
    }

    update() {
        if(this.nxt === true) {
            this.dead = this.nxt;
            this.node.classList.remove("alive");
            this.node.classList.add("dead");
        } else if (this.nxt === false) {
            this.dead = this.nxt;
            this.node.classList.remove("dead");
            this.node.classList.add("alive");
        }
    }
}