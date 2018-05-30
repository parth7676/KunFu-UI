import React from 'react'
import Navbar from "src/components/shared/Navbar"
import Footer from "src/components/shared/Footer"
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'
import * as faculties from 'endpoints/faculties'
import alertify from 'alertifyjs'
import InsertModal from 'src/components/shared/InsertModal'
import EditModal from 'src/components/shared/EditModal'

class Faculties extends React.Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this)
    this.del = this.del.bind(this)
    this.save = this.save.bind(this)
    this.insertModal = this.insertModal.bind(this)
    this.actionsFormatter = this.actionsFormatter.bind(this)
    this.saveEditedData = this.editData.bind(this)
    this.state = {
      faculties: [],
      editData: {}
    }
  }

  componentWillMount() {
    this.loadFaculties()
  }

  loadFaculties() {
    faculties.list().then(res => {
      if (res) {
        this.setState({
          faculties: res.data.data
        })
      }
    }).catch(err => {
      if (err) {
        alertify.error('Unable to fetch faculties')
      }
    })
  }

  edit(data) {
    this.setState({
      editData: data
    })
  }

  saveEditedData(data) {
    faculties.edit(data).then(res => {
      if (res) {
        this.loadFaculties()
      }
    }).catch(err => {
      if (err) {
        alertify.error('Unable to edit faculty!')
      }
    })
  }

  del(e) {
    const id = e.target.dataset.id
    faculties.del(id).then(res => {
      if (res) {
        this.loadFaculties()
      }
    }).catch(err => {
      if (err) {
        alertify.error('Unable to delete faculties!')
      }
    })
  }

  save(data, onSave, onModalClose) {
    faculties.create(data).then(res => {
      if (res) {
        onModalClose()
        this.loadFaculties()
      }
    }).catch(err => {
      if (err) {
        alertify.error('Unable to add faculty!')
      }
    })
  }

  insertModal(onModalClose, onSave, columns, validateState, ignoreEditable) {
    const attr = { onModalClose, onSave, columns, validateState, ignoreEditable };
    return <InsertModal {...attr} title="New Faculty" saveBtnText="Enroll Faculty" handleSave={this.save} bsSize="md" />
  }

  options() {
    return {
      insertModal: this.insertModal,
      insertBtn: () => <InsertButton btnText="New Faculty" />
    }
  }

  actionsFormatter(cell, row) {
    return <div>
      <i className="fa fa-edit text-primary" style={{ marginRight: 10 }} data-toggle="modal" data-target="#editModal" onClick={() => this.edit(row)} />
      <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del} />
    </div>
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <div className="container margin-top-75">
          <div className="row">
            <div className="col-md-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h5><b>Faculties Enrolled:</b> {this.state.faculties.length}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>Faculties</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <BootstrapTable data={this.state.faculties} options={this.options()} striped hover condensed search insertRow>
                <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} dataSort hiddenOnInsert>Faculty ID</TableHeaderColumn>
                <TableHeaderColumn dataField="name" dataAlign="center" editable={{ type: 'text', required: true }} dataSort>Faculty Name</TableHeaderColumn>
                <TableHeaderColumn dataField="email" dataAlign="center" editable={{ type: 'email', required: true }}>Email</TableHeaderColumn>
                <TableHeaderColumn dataField="password" dataAlign="center" editable={{ type: 'password', required: true }} hidden>Password</TableHeaderColumn>
                <TableHeaderColumn dataField="created_at" dataAlign="center" dataSort hiddenOnInsert>Enrolled On</TableHeaderColumn>
                <TableHeaderColumn dataField="action" dataAlign="center" dataFormat={this.actionsFormatter} hiddenOnInsert>Actions</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </div>
        <Footer></Footer>
        <EditModal
          modalID="editModal"
          title="Edit Faculty"
          dataID={this.state.editData.id}
          onSave={this.saveEditedData}
          columns={
            [
              { type: 'text', field: 'name', name: 'Name', value: this.state.editData.name },
              { type: 'email', field: 'email', name: 'Email', value: this.state.editData.email },
            ]} />
      </div>
    )
  }
}

export default Faculties