import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <p className="text-muted"><strong>KungFu Yoga</strong></p>
                        </div>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <p>Made with <span className="glyphicon glyphicon-heart" style={{ color: 'red' }}></span> by Hardik, Parth and Siddarth</p>
                        </div>
                    </div>

                </div>
            </footer>
        )
    }
}

export default Footer