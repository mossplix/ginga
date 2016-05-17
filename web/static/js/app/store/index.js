import { createStore, applyMiddleware,compose } from 'redux';
import { routerMiddleware }             from 'react-router-redux';
import createLogger                     from 'redux-logger';
import thunkMiddleware                  from 'redux-thunk';
import reducers                         from '../reducers';
import reduxPromise from 'redux-promise';



const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

const initialState = {
    phase: 'pending',
    error: null,
    loading:true
};


export default function configureStore(browserHistory) {

     const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const createStoreWithMiddleware = compose(applyMiddleware(thunkMiddleware,reduxPromise,reduxRouterMiddleware,loggerMiddleware),window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);
  const store=createStoreWithMiddleware(reducers);
/*    store.subscribe(() => {
    switch (action.type) {
        case UPDATE_TITLE:

        break;
        default:
            // do nothing
    }
});*/

return store;

}

