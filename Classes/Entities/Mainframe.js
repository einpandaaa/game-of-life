export default class Mainframe {

    constructor(matchfield, cells) {
        this.matchfield = matchfield;
        this.cells = cells;
    }

    setRowConfig(node) {
        this.rows = Math.floor(this.matchfield.clientHeight / node.clientHeight);
        this.cellsPerRow = Math.floor(this.matchfield.clientWidth / node.clientWidth);
    }

    addCell(cell) {
        this.cells.push(cell);
    }

    generateNextFrame() {
        this.cells.forEach(c => {
            let aliveRelatedCount = this.getAliveRelatedCount(c);
            c.nxt = undefined;
            if(c.dead) {
                // dead = true, arc = 3 -> alive
                if(aliveRelatedCount === 3) {
                    c.nxt = false;
                }
            } else {
                // dead = false, arc < 2 -> dead
                if(aliveRelatedCount < 2) {
                    c.nxt = true;
                // dead = false, arc > 3 -> dead
                } else if (aliveRelatedCount > 3) {
                    c.nxt = true;
                }
                // dead = false, arc 2 || 3 -> nothing
            }
        });
        this.cells.forEach(c => {
            c.update();
        });
    }

    getAliveRelatedCount(c) {
        let ax = c.x;
        let ay = c.y;

        let count = 0;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if(dy === 0 && dx === 0) {
                    continue;
                }
                let rel = this.getCellByCoords(ax + dx, ay + dy);
                if(!rel.dead) {
                    count++;
                }
            }
        }
        return count;
    }

    getCellByCoords(x, y) {
        return this.cells[(y + this.rows) % this.rows * this.cellsPerRow +  (x + this.cellsPerRow) % this.cellsPerRow];
    }
}