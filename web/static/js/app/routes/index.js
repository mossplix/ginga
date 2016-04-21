
import {
  Route,
  Redirect,
  IndexRoute,
} from 'react-router';

import React                        from 'react';
import MainLayout                   from '../layouts/main';
import AuthenticatedContainer       from '../containers/authenticated';
import Boards                from '../views/home';
import SessionsNew                  from '../views/sessions/new';
import BoardsShowView               from '../views/boards/show';
import CardsShowView                from '../views/cards/show';
import Actions                      from '../actions/sessionActions';

import  TasksApp from '../components/tasks/TasksApp';






// Here we define all our material-ui ReactComponents.
import Master from '../components/Master';


export default function configRoutes(store) {
  const _ensureAuthenticated = (nextState, replace, callback) => {
    const { dispatch } = store;
    const { session } = store.getState();
    const { currentUser } = session;

    if (!currentUser && localStorage.getItem('phoenixAuthToken')) {
      dispatch(Actions.currentUser());
    } else if (!localStorage.getItem('phoenixAuthToken')) {
      replace('/sign_in');
    }

    callback();
  };

  return (
    <Route component={MainLayout}>

      <Route path="/sign_in" component={SessionsNew} />


      <Route path="/" component={Master} onEnter={_ensureAuthenticated}>
        <IndexRoute component={TasksApp} />



                 <Route path="/boards/:id" component={BoardsShowView}>
                      <Route path="cards/:id" component={CardsShowView}/>
                </Route>

         <Route name="tasks" path="/tasks" component={TasksApp}/>
         <Route name="/boards" path="/boards" component={Boards}/>





        <Redirect from="/app" to="/" />
    </Route>
        </Route>
  );
}
