import React from 'react';

import DungeonStore from '../stores/dungeonStore';

export const storesContext = React.createContext({
    dungeonStore: new DungeonStore(),
});

export const useStores = () => React.useContext(storesContext)
