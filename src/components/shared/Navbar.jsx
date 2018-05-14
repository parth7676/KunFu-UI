import React from 'react'
import auth from '../../services/auth'

class Navbar extends React.Component {
    static logout() {
        auth.logout()
    }
    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">KungFu Yoga</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><a href="/faculties">Faculties</a></li>
                            <li><a href="/">Students</a></li>
                            <li><a href="/attendance">Attendance</a></li>
                            <li><a href="/batches">Batches</a></li>
                            <li><a href="sales">Sales</a></li>
                            <li><a href="levels">Levels</a></li>
                            <li><a href="ranks">Ranks</a></li>
                            <li><a href="progresses">Progresses</a></li>

                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                          {
                              auth.isAuthenticated ? <li><a href="/login">Login</a></li> :
                                <li><a onClick={Navbar.logout}><i className="fa fa-sign-out-alt"/> Logout</a></li>
                          }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar