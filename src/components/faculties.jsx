import React from 'react'
import Navbar from "src/components/shared/Navbar"
import Footer from "src/components/shared/Footer"
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as faculties from 'endpoints/faculties'
import alertify from 'alertifyjs'
import PropTypes from 'prop-types'

class Faculties extends React.Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this)
        this.del = this.del.bind(this)
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
            <div className="container-fluid margin-top-50">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Faculties</h3>
                    </div>
                </div>
                <div className="row">
                        <div className="col-md-12">
                            <BootstrapTable data={this.state.faculties} striped hover condensed search>
                              <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} dataSort>Faculty ID</TableHeaderColumn>
                              <TableHeaderColumn dataField="name" dataAlign="center" dataSort>Faculty Name</TableHeaderColumn>
                              {/* <TableHeaderColumn dataField="birthday" dataAlign="center">Birth Date</TableHeaderColumn> */}
                              {/* <TableHeaderColumn dataField="mobile_no" dataAlign="center">Mobile No</TableHeaderColumn> */}
                              <TableHeaderColumn dataField="email" dataAlign="center">Email</TableHeaderColumn>
                              {/* <TableHeaderColumn dataField="created_at" dataAlign="center" dataSort>Enrolled On</TableHeaderColumn> */}
                              {/* <TableHeaderColumn dataField="action" dataAlign="center" dataFormat={this.actionsFormatter}>Actions</TableHeaderColumn> */}
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