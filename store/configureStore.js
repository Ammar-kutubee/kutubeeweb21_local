import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import mainReducer from './reducers/root';
import avatarProps from './reducers/avatarProps';

const middlewares = [
    /* other middlewares */
];
const rootReducer = combineReducers({
    mainReducer,
    avatarProps
});
const composeEnhancers = compose(
    (typeof window !== 'undefined' && window.devToolsExtension) ? window.devToolsExtension() : f => f
);

const configureStore =
    createStore(
        rootReducer,
        undefined,
        // applyMiddleware(...middlewares),
        composeEnhancers
    )
    ;

export default configureStore