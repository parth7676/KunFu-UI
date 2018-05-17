import React from 'react'
import Navbar from "src/components/shared/Navbar"
import Footer from "src/components/shared/Footer"
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'
import * as faculties from 'endpoints/faculties'
import alertify from 'alertifyjs'
import InsertModal from 'src/components/shared/InsertModal'

class Faculties extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this)
        this.del = this.del.bind(this)
        this.save = this.save.bind(this)
        this.insertModal = this.insertModal.bind(this)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.state = {
          faculties: []
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

    edit(e) {
      const id = e.target.dataset.id
      this.props.history.push(`/faculties/${id}`)
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

    insertModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
      const attr = { onModalClose, onSave, columns, validateState, ignoreEditable };
      return <InsertModal { ...attr } title="New Faculty" saveBtnText="Enroll Faculty" handleSave={this.save} bsSize="md" />
    }


  options () {
      return {
        insertModal: this.insertModal,
        insertBtn: () => <InsertButton btnText="New Faculty" />
      }
    }

    actionsFormatter(cell, row) {
        return <div>
          <i className="fa fa-edit text-primary" style={{marginRight: 10}} onClick={this.edit} data-id={row.id}/>
          <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del}/>
        </div>
      }

    render() {
        return (
          <div>
            <Navbar></Navbar>
            <div className="container margin-top-75 margin-bottom-25">
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
          </div>
        )
      }
}

export default Faculties