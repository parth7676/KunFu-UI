import React from 'react'
import auth from '../services/auth'
import * as authenticate from 'endpoints/authentication'
import alertify from 'alertifyjs';
import Navbar from 'src/components/shared/Navbar'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.update = this.update.bind(this)
        this.submit = this.submit.bind(this)
        this.state = {
            email: '',
            password: ''
        }
    }

    update(el) {
        this.setState({
          [el.target.id]: el.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        if (this.state.email && this.state.password) {
            authenticate.authenticate(this.state).then(res => {
                if (res) {
                    auth.login(res.data.data.accessToken)
                }
            }).catch(err => {
                if (err) {
                    alertify.error('Check your email or password!')
                }
            })
        }
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container margin-top-50">
                    <div className="row margin-top-50">
                        <div className="col-md-4 col-md-offset-4">
                            <form className="form-signin" autoComplete="off">
                                <h2 className="form-signin-heading">Please sign in</h2>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Email address"
                                    required=""
                                    autoFocus=""
                                    onChange={this.update}
                                />
                                <label htmlFor="email" className="sr-only">Password</label>
                                <input type="password" id="password" className="form-control margin-top-20" placeholder="Password"
                                    required="" onChange={this.update}/>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me" /> Remember me
                                </label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block" onClick={this.submit}>Sign in</button>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default Login