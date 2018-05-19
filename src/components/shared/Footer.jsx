import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <div className="navbar-inverse footer">
                <div className="container">
                    <footer>
                        <div className="row margin-top-20">
                            <div className="col-md-4">
                                <p className="text-muted"><strong>KungFu Yoga</strong></p>
                            </div>
                            <div className="col-md-4"/>
                            <div className="col-md-4">
                                <p>Made with <span className="glyphicon glyphicon-heart" style={{ color: 'red' }}></span> by Hardik, Parth and Siddharth</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}

export default Footer