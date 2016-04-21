import { createStore, applyMiddleware,compose } from 'redux';
import { routerMiddleware }             from 'react-router-redux';
import createLogger                     from 'redux-logger';
import thunkMiddleware                  from 'redux-thunk';
import reducers                         from '../reducers';



const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true,
});

export default function configureStore(browserHistory) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory)
  const createStoreWithMiddleware = compose(applyMiddleware(reduxRouterMiddleware, thunkMiddleware, loggerMiddleware),window.devToolsExtension ? window.devToolsExtension() : f => f)(createStore);

  return createStoreWithMiddleware(reducers);
}
