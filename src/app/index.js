import * as PIXI from 'pixi.js';
import {dimensions} from './const';
import {setup} from './setup';
import assets from './assets';

const {Application} = PIXI;

const loadProgressHandler = (loader, resource) => {
    console.log(`Loading "${resource.name}" @ "${resource.url}" -- ${loader.progress}%"`);
};

export const createPixiApplication = () => {
    const app = new Application({
        width: dimensions.width,
        height: dimensions.height,
        antialias: true,
        transparent: true,
    });

    app.loader
        .add(assets)
        .on('progress', loadProgressHandler)
        .load(() => setup(app));

    return app;
};
