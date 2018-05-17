import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'
import * as batches from 'endpoints/batches'
import * as levels from 'endpoints/levels'
import alertify from 'alertifyjs'
import InsertModal from 'src/components/shared/InsertModal'

class Batches extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.renderLevel = this.renderLevel.bind(this)
        this.deleteBatch = this.deleteBatch.bind(this)
        this.save = this.save.bind(this)
        this.insertModal = this.insertModal.bind(this)
        this.options = this.options.bind(this)
        this.state = ({
            batches: [],
            days: [
              {value: 'Monday', label: 'Monday'},
              {value: 'Tuesday', label: 'Tuesday'},
              {value: 'Wednesday', label: 'Wednesday'},
              {value: 'Thursday', label: 'Thursday'},
              {value: 'Friday', label: 'Friday'},
              {value: 'Saturday', label: 'Saturday'},
              {value: 'Sunday', label: 'Sunday'},
            ],
            levels: []
        })
    }

    componentWillMount() {
        this.loadBatches()
    }

    actionsFormatter(cell, row) {
        return <div>
            <i className="fa fa-edit text-primary" style={{ marginRight: 10 }} onClick={this.edit} data-id={row.id} />
            <i className="fa fa-trash text-danger" onClick={() => this.deleteBatch(row.id)} />
        </div>
    }

    renderLevel(cell, row) {
        return <span>{row.level.type}</span>
    }

    loadBatches() {
        batches.list().then(response => {
            this.setState({
                batches: response.data.data
            })
            this.loadLevels()
        }).catch(error => {
            if (error) {
                alertify.error("Error while fetching batches!")
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

    deleteBatch(id) {
        batches.del(id).then(response => {
            if (response) {
                this.loadBatches()
            }
        }).catch(error => {
            if (error) {
                alertify.error("Error while deleting batch!")
            }
        })
    }

    save(data, onSave, onModalClose) {
        batches.create(data).then(res => {
            if (res) {
                onModalClose()
                this.loadBatches()
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to save batch!')
            }
        })
    }

    insertModal (onModalClose, onSave, columns, validateState, ignoreEditable) {
        const attr = { onModalClose, onSave, columns, validateState, ignoreEditable };
        return <InsertModal { ...attr } title="New Batch" saveBtnText="Start Batch" handleSave={this.save} bsSize="md" />
    }

    options () {
        return {
          insertModal: this.insertModal,
          insertBtn: () => <InsertButton btnText="New Batch" />
        }
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container margin-top-75 margin-bottom-25">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Batches</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <BootstrapTable data={this.state.batches} options={this.options()} striped hover condensed search insertRow>
                                <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} hiddenOnInsert>Batch ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="day" dataAlign="center" editable={{type: 'select', options: this.state.days}}>Day</TableHeaderColumn>
                                <TableHeaderColumn dataField="time" dataAlign="center" editable={{type: 'time', required: true}}>Time</TableHeaderColumn>
                                <TableHeaderColumn dataField="created_at" dataAlign="center" hiddenOnInsert>Careted At</TableHeaderColumn>
                                <TableHeaderColumn dataField="updated_at" dataAlign="center" hiddenOnInsert>Updated At</TableHeaderColumn>
                                <TableHeaderColumn dataField="level_id" dataAlign="center" dataFormat={this.renderLevel} editable={{type: 'select', options: this.state.levels, required: true}}>Level</TableHeaderColumn>
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
export default Batches