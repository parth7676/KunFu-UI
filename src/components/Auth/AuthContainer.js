import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

class AuthContainer extends React.Component
{
  render() {
    return this.props.canAccess ? <Route path={this.props.path} component={this.props.component} /> : <Redirect to="/login"/>;
  }
}

AuthContainer.propTypes = {
  canAccess: PropTypes.bool,
  path: PropTypes.string,
  component: PropTypes.func
}

export default AuthContainer
