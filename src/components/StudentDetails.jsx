import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'

class StudentDetails extends React.Component {
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container margin-top-75">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Panel title</h3>
                                </div>
                                <div className="panel-body">
                                    Panel content
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default StudentDetails