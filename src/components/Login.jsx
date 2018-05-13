import React from 'react'
import Navbar from 'src/components/shared/Navbar'

class Login extends React.Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container">
                    <div className="row margin-top-50">
                        <div className="col-md-4 col-md-offset-4">
                            <form className="form-signin" pb-autologin="true" autoComplete="off">
                                <h2 className="form-signin-heading">Please sign in</h2>
                                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                                <input
                                    type="email"
                                    id="inputEmail"
                                    className="form-control"
                                    placeholder="Email address"
                                    required=""
                                    autoFocus=""
                                    pb-role="username" />
                                <label htmlFor="inputPassword" className="sr-only">Password</label>
                                <input type="password" id="inputPassword" className="form-control margin-top-20" placeholder="Password"
                                    required="" pb-role="password" />
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me" /> Remember me
                                </label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block" type="submit" pb-role="submit">Sign in</button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Login