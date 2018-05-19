import React from 'react'
import Navbar from "src/components/shared/Navbar"
import Footer from "src/components/shared/Footer"
import { BootstrapTable, TableHeaderColumn, InsertModalBody, InsertButton } from 'react-bootstrap-table'
import * as students from 'endpoints/students'
import alertify from 'alertifyjs'
import PropTypes from 'prop-types'
import Select from 'react-select'
import StudentInsertModal from 'src/components/shared/StudentInsertModal'

class Students extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this)
        this.del = this.del.bind(this)
        this.show = this.show.bind(this)
        this.handleFilter = this.handleFilter.bind(this)
        this.insertModal = this.insertModal.bind(this)
        this.save = this.save.bind(this)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.state = {
          students: [],
          filter: null,
          filters: [
            {value: null, label: 'All'},
            {value: 'parents', label: 'Parents Only'},
            {value: 'children', label: 'Children Only'}
          ]
        }
    }

    componentWillMount() {
      this.loadStudents()
    }

    loadStudents() {
      students.list().then(res => {
        if (res) {
          this.setState({
            students: res.data.data,
            filter: null
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

    show(e) {
      const id = e.target.dataset.id
      this.props.history.push(`/students/${id}`);
    }

    actionsFormatter(cell, row) {
      return <div>
        <i className="fa fa-info-circle text-info" style={{marginRight: 10}} onClick={this.show} data-id={row.id}/>
        <i className="fa fa-edit text-primary" style={{marginRight: 10}} onClick={this.edit} data-id={row.id}/>
        <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del}/>
      </div>
    }

    handleFilter(e) {
      let students = {}
      if (e) {
        if (e.value === "parents") {
          students = this.state.students.filter(student => student.children.length !== 0)
        }
        if (e.value === "children") {
          students = this.state.students.filter(student => student.parents.length !== 0)
        }
        if (e.value === null) {
          this.loadStudents()
        } else {
          this.setState({
            filter: e.value,
            students
          })
        }
      }
    }

    save(data, onSave, onModalClose) {
      students.create(data).then(res => {
        if (res) {
          onModalClose();
          this.loadStudents()
        }
      }).catch(err => {
        if (err) {
          alertify.error('Unable to add student!')
        }
      })
    }

    insertModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
      const attr = { onModalClose, onSave, columns, validateState, ignoreEditable };
      return <StudentInsertModal { ...attr } title="New Enrollment" saveBtnText="Enroll Student" handleSave={this.save} bsSize="md" />
    }

    options() {
      return {
        insertModal: this.insertModal,
        insertBtn: () => <InsertButton btnText="New Enrollment" />
      }
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container margin-top-75 margin-bottom-25">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body">
                            <h5><b>Students Enrolled:</b> {this.state.students.length}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body">
                            <h5><b>Parents Enrolled:</b> {this.state.students.filter(student => student.children.length !== 0 && student.enrolled).length}</h5>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="panel panel-default">
                          <div className="panel-body">
                            <h5><b>Total Enrollments: </b>{this.state.students.length}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <h4>Filter</h4>
                        <Select
                          name="form-field-name"
                          value={this.state.filter}
                          onChange={this.handleFilter}
                          options={this.state.filters}
                        />
                      </div>
                    </div>
                    <div className="row margin-top-20">
                        <div className="col-md-12">
                            <BootstrapTable data={this.state.students} options={this.options()} striped hover condensed search insertRow>
                              <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} dataSort>Student ID</TableHeaderColumn>
                              <TableHeaderColumn dataField="name" dataAlign="center" dataSort>Student Name</TableHeaderColumn>
                              <TableHeaderColumn dataField="birthday" dataAlign="center">Birth Date</TableHeaderColumn>
                              <TableHeaderColumn dataField="mobile_no" dataAlign="center">Mobile No</TableHeaderColumn>
                              <TableHeaderColumn dataField="email" dataAlign="center">Email</TableHeaderColumn>
                              <TableHeaderColumn dataField="address" dataAlign="center" hidden>Address</TableHeaderColumn>
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