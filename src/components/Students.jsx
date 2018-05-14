import React from 'react'
import Navbar from "src/components/shared/Navbar"
import Footer from "src/components/shared/Footer"
import { BootstrapTable, TableHeaderColumn, InsertModalHeader, InsertModalFooter, InsertButton } from 'react-bootstrap-table';
import * as students from 'endpoints/students'
import alertify from 'alertifyjs'
import PropTypes from 'prop-types'

class Students extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this)
        this.del = this.del.bind(this)
        this.options = this.options.bind(this)
        this.modalHeader = this.modalHeader.bind(this)
        this.modalFooter = this.modalFooter.bind(this)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.state = {
          students: []
        }
    }

    componentWillMount() {
      this.loadStudents()
    }

    loadStudents() {
      students.list().then(res => {
        if (res) {
          this.setState({
            students: res.data.data
          })
        }
      }).catch(err => {
        if (err) {
          alertify.error('Unable to fetch students')
        }
      })
    }

    edit(e) {
      const id = e.target.dataset.id
      this.props.history.push(`/students/${id}`)
    }
    
    del(e) {
      const id = e.target.dataset.id
      students.del(id).then(res => {
        if (res) {
          this.loadStudents()
        }
      }).catch(err => {
        if (err) {
          alertify.error('Unable to delete student!')
        }
      })
    }

    actionsFormatter(cell, row) {
      return <div>
        <i className="fa fa-edit text-primary" style={{marginRight: 10}} onClick={this.edit} data-id={row.id}/>
        <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del}/>
      </div>
    }

    options () {
      return {
        insertModalHeader: this.modalHeader,
        insertModalFooter: this.modalFooter,
      }
    }

    modalHeader(closeModal, save) {
      return (
        <InsertModalHeader
          title="New Student Form"
        />
      )
    }

    modalFooter(closeModal, save) {
      return (
        <InsertModalFooter
          saveBtnText="Enroll Student"
        />
      )
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container-fluid margin-top-50">
                    <div className="row">
                      <div className="col-md-12">
                        <h3>Students</h3>
                      </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <BootstrapTable data={this.state.students} options={this.options()}  striped hover condensed search>
                              <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} dataSort>Student ID</TableHeaderColumn>
                              <TableHeaderColumn dataField="name" dataAlign="center" dataSort>Student Name</TableHeaderColumn>
                              <TableHeaderColumn dataField="birthday" dataAlign="center">Birth Date</TableHeaderColumn>
                              <TableHeaderColumn dataField="mobile_no" dataAlign="center">Mobile No</TableHeaderColumn>
                              <TableHeaderColumn dataField="email" dataAlign="center">Email</TableHeaderColumn>
                              <TableHeaderColumn dataField="created_at" dataAlign="center" dataSort>Enrolled On</TableHeaderColumn>
                              <TableHeaderColumn dataField="action" dataAlign="center" dataFormat={this.actionsFormatter}>Actions</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

Students.propTypes = {
  history: PropTypes.object
}

export default Students