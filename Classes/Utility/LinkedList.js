import Node from "./Node.js";

export default class LinkedList {

    constructor() {
        this.head = null;
        this.size = 0;
        this.tail = null;
    }

    add() {
        let node = new Node(Date.now());
        if(!this.head) {
            this.head = this.tail = node;
            this.size++;
        } else {
            let last = this.tail;
            last.next = this.tail = node;
            this.size++;
        }
    }

    remove() {
        if(this.head) {
            this.head = this.head.next;
            this.size--;
        }
    }

    getSize() {
        let ts = Date.now();
        console.log(this.size);
        while (this.head && ts - this.head.value > 1000) {
            this.remove();
        }
        return this.size;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}