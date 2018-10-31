import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Demo } from '../demo'
import { Questionsheet, Settlement } from '../files/conveyances';

export default () => (
    <Switch>
      <Route exact path='/' component={Questionsheet}/>
      <Route path='/demo' component={Demo}/>
      <Route path='/questionsheet' component={Questionsheet}/>
      <Route path='/settlement' component={Settlement}/>
    </Switch>
);

