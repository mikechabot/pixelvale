import {createPixiApplication} from './app';

const {view} = createPixiApplication();

const application = document.createElement('div');
const container = document.getElementById('pixelvale');

application.id = 'pixi-application';
application.style.display = 'flex';
application.style.justifyContent = 'center';
application.style.marginTop = '10px';

application.appendChild(view);
container.appendChild(application);
