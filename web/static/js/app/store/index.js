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
    isLoading:true
};


export default function configureStore(browserHistory) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory)
    return createStore(
    reducers,
    initialState,
    applyMiddleware(reduxRouterMiddleware, thunkMiddleware,reduxPromise, loggerMiddleware)
);
}

