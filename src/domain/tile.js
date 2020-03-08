class Tile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.room = null;
    }

    toString() {
        return `x:${this.x},y${this.y}`;
    }
}

export default Tile;
