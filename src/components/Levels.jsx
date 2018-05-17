import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import * as levels from 'endpoints/levels'
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'
import alertify from 'alertifyjs'
import InsertModal from 'components/shared/InsertModal'

class Levels extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.del = this.del.bind(this)
        this.save = this.save.bind(this)
        this.createInsertModal = this.createInsertModal.bind(this)
        this.options = this.options.bind(this)
        this.rankFormatter = this.rankFormatter.bind(this)
        this.state = {
            levels: []
        }
    }

    componentWillMount() {
        this.loadLevels()
    }

    loadLevels() {
        levels.list().then(response => {
            this.setState({
                levels: response.data.data
            })
        }).catch(error => {
            if (error) {
                alertify.error("Error while loading levels!")
            }
        })
    }

    del(e) {
        let id = e.target.dataset.id
        levels.del(id).then(response => {
            if (response) {
                this.loadLevels()
            }
        }).catch(error => {
            if (error) {
                alertify.error("Error while deleting level!")
            }
        })
    }

    actionsFormatter(cell, row) {
        return <div style={{ cursor: 'pointer' }}>
            <i className="fa fa-edit text-primary" style={{ marginRight: 10 }} onClick={this.edit} data-id={row.id} />
            <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del} />
        </div>
    }

    rankFormatter(cell, row) {
        return row.ranks.map(rank => <span className="badge" key={rank.id}>{rank.belt_color}</span>)
    }

    save(data, onSave, onModalClose) {
        levels.create(data).then(res => {
            if (res) {
                onModalClose();
                this.loadLevels()
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to save level!')
            }
        })
    }

    createInsertModal(onModalClose, onSave, columns, validateState, ignoreEditable) {
      const attr = { onModalClose, onSave, columns, validateState, ignoreEditable };
      return <InsertModal { ...attr } title="New Level" saveBtnText="Save Level" handleSave={this.save} bsSize="md" />
    }

    options() {
        return {
            insertModal: this.createInsertModal,
            insertBtn: () => <InsertButton btnText="Add Level"/>
        }
    }
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container margin-top-75 margin-bottom-25">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Levels</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <BootstrapTable data={this.state.levels} options={this.options()} striped hover condensed search insertRow>
                                <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} hiddenOnInsert>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="type" dataAlign="center" editable={{type: 'text', required: true}}>Type</TableHeaderColumn>
                                <TableHeaderColumn dataField="type" dataAlign="center" dataFormat={this.rankFormatter} hiddenOnInsert>Type</TableHeaderColumn>
                                <TableHeaderColumn dataField="created_at" dataAlign="center"  hiddenOnInsert>Created At</TableHeaderColumn>
                                <TableHeaderColumn dataField="updated_at" dataAlign="center"  hiddenOnInsert>Updated At</TableHeaderColumn>
                                <TableHeaderColumn dataField="actions" dataAlign="center" dataFormat={this.actionsFormatter}  hiddenOnInsert>Actions</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Levels