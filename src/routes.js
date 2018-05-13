import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from 'src/components/HomePage'
import Login from 'src/components/Login'
import Students from 'src/components/Students'
import StudentDetails from 'src/components/StudentDetails'

export default (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={HomePage} />

      <Route exact path="/students" component={Students} />
      <Route exact path="/student/:id" component={StudentDetails} />
    </Switch>
  </div>
)
