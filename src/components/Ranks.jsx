import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'
import * as ranks from 'endpoints/ranks'
import alertify from 'alertifyjs'
import PropTypes from 'prop-types'
import InsertModal from 'components/shared/InsertModal'
import * as levels from 'endpoints/levels'

class Ranks extends React.Component {

  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this)
    this.del = this.del.bind(this)
    this.options = this.options.bind(this)
    this.save = this.save.bind(this)
    this.createInsertModal = this.createInsertModal.bind(this)
    this.actionsFormatter = this.actionsFormatter.bind(this)
    this.beltsFormatter = this.beltsFormatter.bind(this)
    this.levelTypeFormatter = this.levelTypeFormatter.bind(this)
    this.state = {
      ranks: [],
      levels: []
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
        this.loadLevels()
      }
    }).catch(err => {
      if (err) {
        alertify.error('Unable to fetch ranks')
      }
    })
  }

  loadLevels() {
    levels.list().then(response => {
      let levels = []
      response.data.data.forEach(level => {
        levels.push({value: level.id, label: level.type})
      })
      this.setState({
        levels
      })
    }).catch(error => {
      if (error) {
        alertify.error("Error while loading levels!")
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

  save(data, onSave, onModalClose) {
    ranks.create(data).then(res => {
      if(res) {
        onModalClose()
        this.loadRanks()
      }
    }).catch(err => {
      if (err) {
        alertify.error('Unable to create new rank!')
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
    let belt
    switch (cell) {
      case "yellow":
        belt = '#FFFF00'
        break
      case "halfgreen":
        belt = '#3ADF00'
        break
      case "green":
        belt = '#298A08'
        break
      case "halfblue":
        belt = '#0000FF'
        break
      case "blue":
        belt = '#08088A'
        break
      case "halfred":
        belt = '#FE2E64'
        break
      case "red":
        belt = '#DF013A'
        break
      case "halfblack":
        belt = '#848484'
        break
      case "black":
        belt = '#000000'
        break
      default:
        belt = "#FFFFFF"
    }
    return <div><span className="glyphicon glyphicon-bookmark" style={{ color: belt, marginRight: 5 }}/>{cell}</div>
  }

  levelTypeFormatter(cell, row) {
    return <div>{row.level.type}</div>
  }

  createInsertModal(onModalClose, onSave, columns, validateState, ignoreEditable) {
    const attr = { onModalClose, onSave, columns, validateState, ignoreEditable };
    return <InsertModal { ...attr } title="New Rank" saveBtnText="Add Rank" handleSave={this.save} bsSize="md" />
  }

  options () {
    return {
      insertBtn: () => <InsertButton btnText="Create Rank" />,
      insertModal: this.createInsertModal
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
              <BootstrapTable data={this.state.ranks} options={this.options()} striped hover condensed search insertRow>
                <TableHeaderColumn isKey={true} dataField="belt_color" dataAlign="center" autoValue={true}
                  dataFormat={this.beltsFormatter} editable={{type: 'text', required: true}}>Belt Colour</TableHeaderColumn>
                <TableHeaderColumn dataField="level_id" dataAlign="center" dataFormat={this.levelTypeFormatter} editable={{type: 'select', options: this.state.levels}}>Level</TableHeaderColumn>
                <TableHeaderColumn dataField="created_at" dataAlign="center" hiddenOnInsert>Created At</TableHeaderColumn>
                <TableHeaderColumn dataField="updated_at" dataAlign="center" hiddenOnInsert>Updated At</TableHeaderColumn>
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
export default Ranks
