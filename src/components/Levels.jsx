import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import * as levels from 'endpoints/levels'
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'
import alertify from 'alertifyjs'
import InsertModal from 'components/shared/InsertModal'
import EditModal from 'src/components/shared/EditModal'
import * as ranks from 'endpoints/ranks'

class Levels extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.edit = this.edit.bind(this)
        this.del = this.del.bind(this)
        this.save = this.save.bind(this)
        this.createInsertModal = this.createInsertModal.bind(this)
        this.options = this.options.bind(this)
        this.rankFormatter = this.rankFormatter.bind(this)
        this.saveEditedData = this.saveEditedData.bind(this)
        this.state = {
            levels: [],
            ranks: [],
            editData: {}
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
            this.loadRanks()
        }).catch(error => {
            if (error) {
                alertify.error("Error while loading levels!")
            }
        })
    }

    loadRanks() {
        ranks.list().then(res => {
            if (res) {
                let ranks = []
                res.data.data.forEach((rank) => {
                    console.log(rank)
                    ranks.push({ value: rank.belt_color, text: rank.belt_color })
                })
                this.setState({
                    ranks: ranks
                })
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to fetch ranks')
            }
        })
    }

    edit(data) {
        this.setState({
            editData: data
        })
    }

    saveEditedData(data) {
        console.log(data)
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
            <i className="fa fa-edit text-primary" style={{ marginRight: 10 }} data-toggle="modal" data-target="#editModal" onClick={() => this.edit(row)} />
            <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del} />
        </div>
    }

    rankFormatter(cell, row) {
        let ranks = ""
        cell.length !== 0 && cell.forEach(rank => ranks = ranks + " " + `<span class="badge text-capitalize">${rank.belt_color}</span>`)
        cell.length === 0 && (ranks = "No ranks associated")
        return ranks
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
        return <InsertModal {...attr} title="New Level" saveBtnText="Save Level" handleSave={this.save} bsSize="md" />
    }

    options() {
        return {
            insertModal: this.createInsertModal,
            insertBtn: () => <InsertButton btnText="Add Level" />
        }
    }
    render() {
        console.log(this.state)
        let selectedRanks = [];
        this.state.editData.ranks && this.state.editData.ranks.forEach((rank) => { selectedRanks.push(rank.belt_color) })
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
                                <TableHeaderColumn dataField="type" dataAlign="center" editable={{ type: 'text', required: true }}>Type</TableHeaderColumn>
                                <TableHeaderColumn dataField="ranks" dataAlign="center" dataFormat={this.rankFormatter} hiddenOnInsert>Ranks</TableHeaderColumn>
                                <TableHeaderColumn dataField="created_at" dataAlign="center" hiddenOnInsert>Created At</TableHeaderColumn>
                                <TableHeaderColumn dataField="updated_at" dataAlign="center" hiddenOnInsert>Updated At</TableHeaderColumn>
                                <TableHeaderColumn dataField="actions" dataAlign="center" dataFormat={this.actionsFormatter} hiddenOnInsert>Actions</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
                <EditModal
                    modalID="editModal"
                    title="Edit Rank"
                    dataID={this.state.editData.id}
                    onSave={this.saveEditedData}
                    columns={
                        [
                            { type: 'select', field: 'ranks', name: 'Level', selectMultiple: true, options: this.state.ranks, value: selectedRanks },
                        ]} />
            </div>
        )
    }
}

export default Levels