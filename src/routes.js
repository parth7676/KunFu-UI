import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthContainer from 'src/components/Auth/AuthContainer'
import auth from './services/auth'
import Login from 'src/components/Login'
import Students from 'src/components/Students'
import StudentDetails from 'src/components/StudentDetails'
import About from 'src/components/About'
import Batches from 'src/components/Batches'
import Levels from 'src/components/Levels'
import Faculties from 'src/components/Faculties'
import Ranks from 'src/components/Ranks'
import Sales from 'src/components/Sales'

export default (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/about" component={About} />
      <AuthContainer canAccess={auth.authenticated} exact path='/' component={Students} />
      <AuthContainer canAccess={auth.authenticated} exact path="/students/:id" component={StudentDetails} />
      <AuthContainer canAccess={auth.authenticated} exact path="/batches" component={Batches} />      
      <AuthContainer canAccess={auth.authenticated} exact path="/levels" component={Levels} />      
      <AuthContainer canAccess={auth.authenticated} exact path="/faculties" component={Faculties} />
      <AuthContainer canAccess={auth.authenticated} exact path="/ranks" component={Ranks} />
      <AuthContainer canAccess={auth.authenticated} exact path="/sales" component={Sales} />
    </Switch>
  </div>
)
