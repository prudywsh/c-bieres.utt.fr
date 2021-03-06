import React from 'react'
import { Route } from 'react-router-dom'

import HomeContainer      from '../containers/HomeContainer';
import DashboardContainer from '../containers/DashboardContainer';
import MailListContainer  from '../containers/MailListContainer';
import OldEventsContainer from '../containers/OldEventsContainer'
import OldEventContainer  from '../containers/OldEventContainer'
import ToastsContainer    from '../containers/ToastsContainer';

import '../styles/css/font-awesome.min.css'
import '../styles/css/index.css'
import '../styles/css/loader.css'

const App = () => (
  <div>
    <Route exact path='/' component={HomeContainer}/>
    <Route path='/maillist' component={MailListContainer}/>
    <Route path='/dashboard' component={DashboardContainer}/>
    <Route path='/olds/:id' component={OldEventContainer}/>
    <Route exact path='/olds' component={OldEventsContainer}/>
    <ToastsContainer />
  </div>
)

export default App
