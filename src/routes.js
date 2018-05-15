import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AuthContainer from 'src/components/Auth/AuthContainer'
import auth from './services/auth'
import Login from 'src/components/Login'
import Students from 'src/components/Students'
import StudentDetails from 'src/components/StudentDetails'
import About from 'src/components/About'
import faculties from 'src/components/faculties'

export default (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <AuthContainer canAccess={auth.authenticated} exact path='/' component={Students} />
      <AuthContainer canAccess={auth.authenticated} exact path="/students/:id" component={StudentDetails} />
      <Route exact path="/about" component={About} />
      <Route exact path="/faculties" component={faculties} />
    </Switch>
  </div>
)
