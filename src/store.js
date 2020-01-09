import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';


export default function configureStore() {
    const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ({
        name:"Metro"
    }) : compose
 return createStore(
  rootReducer,
  storeEnhancers(applyMiddleware(thunk))
 );
}