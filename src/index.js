import {createPixiApplication} from './app';
import {dimensions} from './app/const';

const {view} = createPixiApplication();

const container = document.createElement('div');
container.id = 'pixelvale';
container.style.border = '1px solid red';
container.style.width = `${dimensions.width}px`;
container.style.height = `${dimensions.height}px`;

container.appendChild(view);

document.body.appendChild(container);
