import {computed, observable} from 'mobx';

class FoodStore {
    @observable foods = [];

    constructor(rootStore, foods) {
        this.rootStore = rootStore;
        this.foods = foods;
    }

    @computed get count() {
        return this.rootStore.foodStore.foods.length;
    }
}

export default FoodStore;
