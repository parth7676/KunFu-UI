import React from 'react'
import auth from '../../services/auth'
import { withRouter } from 'react-router-dom'

class Navbar extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
        const item = this.props.match.url
        this.refs[item].classList.add('active')
    }

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
                            <li ref={"/about"}><a href="/about">About</a></li>
                            {auth.authenticated && <li ref={"/faculties"}><a href="/faculties">Faculties</a></li>}
                            {auth.authenticated && <li ref={"/"}><a href="/">Students</a></li>}
                            {auth.authenticated && <li ref={"/attendance"}><a href="/attendance">Attendance</a></li>}
                            {auth.authenticated && <li ref={"/batches"}><a href="/batches">Batches</a></li>}
                            {auth.authenticated && <li ref={"/sales"}><a href="/sales">Sales</a></li>}
                            {auth.authenticated && <li ref={"/levels"}><a href="/levels">Levels</a></li>}
                            {auth.authenticated && <li ref={"/ranks"}><a href="/ranks">Ranks</a></li>}
                            {auth.authenticated && <li ref={"/progresses"}><a href="/progresses">Progresses</a></li>}
                        </ul>
                        <ul className="nav navbar-nav navbar-right" style={{ cursor: 'pointer' }}>
                            {
                                auth.authenticated === false ? <li><a href="/login">Login</a></li> :
                                    <li><a onClick={Navbar.logout}><i className="fa fa-sign-out-alt" /> Logout</a></li>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)