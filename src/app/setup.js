import * as PIXI from 'pixi.js';

import gameLoop from './gameLoop';

const {Sprite, Rectangle, utils: {TextureCache}} = PIXI;

const ROCKETS = 2;

export const setup = (app) => {
    const baseTexture = TextureCache['tileset'];

    let rockets = [];
    for (let i=0; i < ROCKETS; i++) {
        const texture =  baseTexture.clone();
        const rectangle = new Rectangle(192, 128, 64, 64);

        texture.frame = rectangle;

        const rocket = new Sprite(texture);
        rocket.anchor.x = 0.5;
        rocket.anchor.y = 0.5;
        rocket.x = 0;
        rocket.y = 0;

        rockets.push(rocket);

        app.stage.addChild(rocket);
    }

    app.renderer.render(app.stage);

    app.ticker.add(delta => gameLoop(delta, rockets, app));
};
