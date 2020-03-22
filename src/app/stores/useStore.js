import React, {useState} from 'react';
import PropTypes from 'prop-types';

const StoreContext = React.createContext(null);

/**
 * Use state returns an arry of two items. The first being the state object,
 * the second is the change  state function. ust pull out the state object,
 * and use that as the Provider value.
 * @param rootStore
 * @param children
 * @returns {*}
 * @constructor
 */
export const StoreProvider = ({ rootStore, children }) => {
    const [store] = useState(rootStore);
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    );
};

StoreProvider.propTypes = {
    children: PropTypes.node.isRequired,
    rootStore: PropTypes.shape({
        monsterStore: PropTypes.instanceOf(Object),
        foodStore: PropTypes.instanceOf(Object),
    }).isRequired,
};

export const useStore = () => {
    const store = React.useContext(StoreContext);
    if (!store) {
        throw new Error('useStore must be used within a StoreProvider.');
    }
    return store;
};
