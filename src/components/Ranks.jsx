import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as ranks from 'endpoints/ranks'
import alertify from 'alertifyjs'
import PropTypes from 'prop-types'

class Ranks extends React.Component {

  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this)
    this.del = this.del.bind(this)
    this.actionsFormatter = this.actionsFormatter.bind(this)
    this.beltsFormatter = this.beltsFormatter.bind(this)
    this.levelTypeFormatter = this.levelTypeFormatter.bind(this)
    this.state = {
      ranks: []
    }
  }

  componentWillMount() {
    this.loadRanks()
  }

  loadRanks() {
    ranks.list().then(res => {
      if (res) {
        this.setState({
          ranks: res.data.data
        })
      }
    }).catch(err => {
      if (err) {
        alertify.error('Unable to fetch ranks')
      }
    })
  }

  edit(e) {
    const id = e.target.dataset.id
    this.props.history.push(`/ranks/${id}`)
  }

  del(e) {
    const id = e.target.dataset.id
    ranks.del(id).then(res => {
      if (res) {
        this.loadRanks()
      }
    }).catch(err => {
      if (err) {
        alertify.error('Unable to delete faculties!')
      }
    })
  }

  actionsFormatter(cell, row) {
    return <div>
      <i className="fa fa-edit text-primary" style={{ marginRight: 10 }} onClick={this.edit} data-id={row.id} />
      <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del} />
    </div>
  }

  beltsFormatter(cell, row) {
    let belt = `#FFFFFF`;
    if (cell == "yellow") {
      belt = '#FFFF00'
    } else if (cell == "halfgreen") {
      belt = '#3ADF00'
    } else if (cell == "green") {
      belt = '#298A08'
    } else if (cell == "halfblue") {
      belt = '#0000FF'
    } else if (cell == "blue") {
      belt = '#08088A'
    } else if (cell == "halfred") {
      belt = '#FE2E64'
    } else if (cell == "red") {
      belt = '#DF013A'
    } else if (cell == "halfblack") {
      belt = '#848484'
    } else if (cell == "black") {
      belt = '#000000'
    }
    return <div><span className="glyphicon glyphicon-bookmark" style={{ color: belt, marginRight: 5 }}></span>{cell}</div>
  }

  levelTypeFormatter(cell, row) {
    // console.log(cell)
    // console.log(row)
    return <div>{row.level.type}</div>
  }

  render() {
    // console.log(this.state)
    return (
      <div>
        <Navbar></Navbar>
        <div className="container margin-top-75 margin-bottom-25">
          <div className="row">
            <div className="col-md-3">
              <div className="panel panel-default">
                <div className="panel-body">
                  <h5><b>Total Belts:</b> {this.state.ranks.length}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <h3>Ranks</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <BootstrapTable data={this.state.ranks} striped hover condensed search>
                <TableHeaderColumn isKey={true} dataField="belt_color" dataAlign="center" autoValue={true}
                  dataFormat={this.beltsFormatter}>Belt Colour</TableHeaderColumn>
                <TableHeaderColumn dataField="level" dataAlign="center" dataFormat={this.levelTypeFormatter}>Level</TableHeaderColumn>
                <TableHeaderColumn dataField="created_at" dataAlign="center">Created At</TableHeaderColumn>
                <TableHeaderColumn dataField="updated_at" dataAlign="center">Updated At</TableHeaderColumn>
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
export default Ranks
