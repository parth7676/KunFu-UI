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
                                    <h3 className="panel-title">Student Details</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="display primary-text">#12345</span>
                                            <span className="display secondary-text">Student Id</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="display primary-text">Parth</span>
                                            <span className="display secondary-text">First Name</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="display primary-text">Patel</span>
                                            <span className="display secondary-text">Last Name</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="display primary-text">24/07/1994</span>
                                            <span className="display secondary-text">Birth Date</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="display primary-text">24/07/2000</span>
                                            <span className="display secondary-text">Enrolled Date</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="display primary-text">parth7676@gmail.com</span>
                                            <span className="display secondary-text">Email</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="display primary-text">679 Partington Avenue Windsor Ontario Canada</span>
                                            <span className="display secondary-text">Address</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Panel title</h3>
                        </div>
                        <div className="panel-body">
                            Panel content
                    </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default StudentDetails