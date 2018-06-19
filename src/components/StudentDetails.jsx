import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import *as students from 'endpoints/students'
import alertify from 'alertifyjs'
import PropTypes from 'prop-types'
import { getBeltInfo } from '../utils/scripts'
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'


class StudentDetails extends React.Component {

    constructor(props, context) {
        super(props, context)
        this.state = {
            studentDetails: {},
            parents: [],
            studentProgress: [],
            sales: [],
        }
    }

    componentWillMount() {
        this.loadStudentDetails(this.props.match.params.id)
    }

    loadStudentDetails(studentId) {
        students.getStudentDetails(studentId).then(response => {
            this.setState({
                studentDetails: response.data.data,
                parents: response.data.data.parents,
                studentProgress: response.data.data.progress,
                sales: response.data.data.sales
            })
        }).catch(error => {
            if (error) {
                alertify.error("Error while loading student details!")
            }
        })
    }

    render() {
        let parentsUI = this.state.parents.map(parent => {
            return (
                <div className="row" key={parent.id}>
                    <div className="col-md-4">
                        <span className="display primary-text">{`#${parent.id}`}</span>
                        <span className="display secondary-text">{parent.enrolled ? `Student ID` : `Parent ID`}</span>
                    </div>
                    <div className="col-md-4">
                        <span className="display primary-text">{parent.name}</span>
                        <span className="display secondary-text">Name {parent.enrolled ? <span className="label label-success">Student</span> : ''}</span>
                    </div>
                    <div className="col-md-4">
                        <span className="display primary-text">{parent.mobile_no}</span>
                        <span className="display secondary-text">Mobile Number</span>
                    </div>
                    <div className="col-md-4">
                        <span className="display primary-text">{parent.birthday}</span>
                        <span className="display secondary-text">Birth Date</span>
                    </div>
                    <div className="col-md-4">
                        <span className="display primary-text">{parent.created_at}</span>
                        <span className="display secondary-text">Enrolled Date</span>
                    </div>
                    <div className="col-md-4">
                        <span className="display primary-text">{parent.relation}</span>
                        <span className="display secondary-text">Relation</span>
                    </div>
                    <div className="col-md-4">
                        <span className="display primary-text">{parent.email}</span>
                        <span className="display secondary-text">Email</span>
                    </div>
                    <div className="col-md-4">
                        <span className="display primary-text">{parent.address}</span>
                        <span className="display secondary-text">Address</span>
                    </div>
                    {this.state.parents.length > 1 &&
                        <div className="col-md-12">
                            <hr />
                        </div>}
                </div>
            )
        })
        console.log(this.state);
        let studentProgress = this.state.studentProgress.map(progress => {
            let beltColor = getBeltInfo(progress.to_rank.belt_color, true)
            return (
                <div className="col-sm-12 col-md-6 col-md-offset-3" key={progress.id} style={{ textAlign: 'center' }}>
                    <span className="primary-text margin-right-10 text-capitalize">{`${progress.from_rank.belt_color} Belt`}</span>
                    <span className="secondary-text fas fa-angle-double-right margin-right-10"></span>
                    <span className="label margin-right-10" style={{ fontSize: '18px', backgroundColor: beltColor }}>{progress.date}</span>
                    <span className="secondary-text fas fa-angle-double-right margin-right-10"></span>
                    <span className="primary-text text-capitalize">{`${progress.to_rank.belt_color} Belt`}</span>
                    <hr />
                </div>
            )
        })
        return (
            <div>
                <Navbar></Navbar>
                <div className="container margin-top-75">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title"><i className="fas fa-user-graduate margin-right-10"></i>Student Details</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="display primary-text">{`#${this.state.studentDetails.id}`}</span>
                                            <span className="display secondary-text">Student Id</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="display primary-text">{this.state.studentDetails.name}</span>
                                            <span className="display secondary-text">Name</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="display primary-text">{this.state.studentDetails.mobile_no}</span>
                                            <span className="display secondary-text">Mobile Number</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="display primary-text">{this.state.studentDetails.birthday}</span>
                                            <span className="display secondary-text">Birth Date</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="display primary-text">{this.state.studentDetails.created_at}</span>
                                            <span className="display secondary-text">Enrolled Date</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="display primary-text">{this.state.studentDetails.email}</span>
                                            <span className="display secondary-text">Email</span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className="display primary-text">{this.state.studentDetails.rank && `${this.state.studentDetails.rank.belt_color} Belt`}</span>
                                            <span className="display secondary-text">Current Rank</span>
                                        </div>
                                        <div className="col-md-4">
                                            <span className="display primary-text">{this.state.studentDetails.address}</span>
                                            <span className="display secondary-text">Address</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title"><i className="fas fa-user-friends margin-right-10"></i>Family Details</h3>
                                </div>
                                <div className="panel-body">
                                    {this.state.parents.length ? parentsUI : <p style={{ textAlign: 'center' }}>No data available</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title"><i className="fas fa-chess-queen margin-right-10"></i>Student Progress</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="row margin-top-10">
                                        {this.state.studentProgress.length ? studentProgress : <p style={{ textAlign: 'center' }}>No data available</p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title"><i className="fas fa-money-bill-alt margin-right-10"></i>Student Sales</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="row margin-top-10">
                                        <div className="col-md-12">
                                            <BootstrapTable data={this.state.sales}>
                                                <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} dataSort hidden>Sales ID</TableHeaderColumn>
                                                <TableHeaderColumn dataField="created_at" dataAlign="center" dataSort>Date</TableHeaderColumn>
                                                <TableHeaderColumn dataField="type" dataAlign="center" dataSort>Type</TableHeaderColumn>
                                                <TableHeaderColumn dataField="message" dataAlign="center">Message</TableHeaderColumn>
                                                <TableHeaderColumn dataField="amount" dataAlign="center" dataSort>Amount($)</TableHeaderColumn>
                                            </BootstrapTable>
                                        </div>
                                    </div>
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