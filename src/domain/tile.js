class Tile {
    constructor(x, y, world) {
        this.x = x;
        this.y = y;
        this.world = world;
        this.room = null;
    }

    toString() {
        return `x:${this.x},y${this.y}`;
    }

    getTileAtOffset(offsetX, offsetY) {
        return this.world.getTileAt(this.x + offsetX, this.y + offsetY);
    }

    /**
     * Return an array of neighbor tiles (N, E, S, W)
     * Also allow the return of diagonal tiles (N, E, S, W, NE, SE, SW, NW)
     * @param allowDiagonals
     * @returns {[void, void, void, void]|void[]}
     */
    getNeighbors(allowDiagonals = false) {

        const neighbors = [this.north(), this.east(), this.south(), this.west()];

        if (!allowDiagonals) return neighbors;

        return [
            ...neighbors,
            this.northEast(),
            this.southEast(),
            this.southWest(),
            this.northWest()
        ];
    }

    north() {
        return this.getTileAtOffset(0, -1);
    }

    east() {
        return this.getTileAtOffset(1, 0);
    }

    south() {
        return this.getTileAtOffset(0, 1);
    }

    west() {
        return this.getTileAtOffset(-1, 0);
    }

    northEast() {
        return this.getTileAtOffset(1, -1);
    }

    southEast() {
        return this.getTileAtOffset(1, 1);
    }

    southWest() {
        return this.getTileAtOffset(-1, 1);
    }

    northWest() {
        return this.getTileAtOffset(-1, -1);
    }
}

export default Tile;
