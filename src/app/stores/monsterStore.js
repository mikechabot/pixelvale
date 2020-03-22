import {computed, observable} from 'mobx';

class MonsterStore {
    @observable monsters = [];

    constructor(rootStore, monsters) {
        this.rootStore = rootStore;
        this.monsters = monsters;
    }

    @computed get count() {
        return this.rootStore.monsterStore.monsters.length
    }

    @computed get averageSpeed() {
        const totalSpeed = this.monsters.reduce((acc, cur) => acc + cur.getSpeed(), 0);
        return totalSpeed / this.count
    }
}

export default MonsterStore;
