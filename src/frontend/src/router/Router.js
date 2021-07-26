import React from 'react'
import { Router as ReactRouter, Switch, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import routes from './routes'
import Public from './Public'
import Private from './Private'
import NotFound from '../views/NotFound'

const history = createBrowserHistory()

function Router() {
  return (
    <ReactRouter history={history}>
      <Switch>
        {routes.map((route, i) => {
          if (route.auth) {
            return <Private exact key={i} {...route} />
          }

          return <Public exact key={i} {...route} />
        })}
        <Route component={NotFound} />
      </Switch>
    </ReactRouter>
  )
}

export default Router
