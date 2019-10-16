import React, { Component } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { adminRoutes } from './routes'
import { Frame } from './components'
class App extends Component {
  render() {
    return (
      <Frame routes={adminRoutes}>
        <Switch>
          {
            adminRoutes.map(route => {
              return (
                <Route
                  key={route.pathName}
                  path={route.pathName}
                  exact={route.exact}
                  render={(routeprops) => {
                    return <route.component {...routeprops} />
                  }} />
              )
            })
          }
          <Redirect to={adminRoutes[0].pathName} from='/admin' exact />
          <Redirect to='/404' />
        </Switch>
      </Frame>
    );
  }
}
export default App;
