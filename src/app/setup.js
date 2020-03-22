import React from 'react';
import ReactDOM from 'react-dom';
import * as PIXI from 'pixi.js';

import PixelvaleStats from './components';
import RootStore from './stores/rootStore';

import loop from './loop';

import {StoreProvider} from './stores/useStore';
import {buildFoodSprites, buildMonsterSprites} from './util/sprite';

import {SPRITE_KEY} from './const';

const {utils: {TextureCache}} = PIXI;

let pause = false;

const actionButton = document.getElementById('action');
actionButton.addEventListener('click', () => {
    if (!pause) {
        pause = true;
        actionButton.innerText = 'Start';
    } else {
        pause = false;
        actionButton.innerText = 'Pause';
    }
});

export const setup = (app) => {

    /**
     * Remove a sprite from the stage
     * @param sprite
     */
    const removeSprite = (sprite) => {
        sprite.destroy();
        app.stage.removeChild(sprite);
    };

    /**
     * Add a sprite to the stage
     * @param sprite
     */
    const addSprite = sprite => {
        app.stage.addChild(sprite);
    };

    /**
     * Create the monster sprites
     */
    const monsterSpriteMap = TextureCache[SPRITE_KEY.MONSTER];
    const {monsters, monsterContainers} = buildMonsterSprites(monsterSpriteMap);

    monsterContainers.forEach(container => {
        addSprite(container);
    });

    /**
     * Create the food sprites
     */
    const foodSpriteMap = TextureCache[SPRITE_KEY.FOOD];
    const foods = buildFoodSprites(foodSpriteMap);

    foods.forEach(food => {
        addSprite(food.getSprite());
    });

    app.renderer.render(app.stage);

    const spriteMaps = {monsterSpriteMap, foodSpriteMap};
    const utilities = {addSprite, removeSprite};

    const store = new RootStore(monsters, foods);

    const rootElement = document.getElementById('react-root');
    ReactDOM.render(
        <StoreProvider rootStore={store}>
            <PixelvaleStats/>
        </StoreProvider>,
        rootElement
    );

    app.ticker.add(() => {
        if (!pause) {
            loop(
                app,
                utilities,
                store,
                spriteMaps
            );
        }
    });
};
