import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'
import * as progresses from 'endpoints/progress'
import * as ranks from  'endpoints/ranks'
import alertify from 'alertifyjs'
import InsertModal from 'components/shared/InsertModal'
import { getBeltInfo } from '../utils/scripts'


class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.del = this.del.bind(this)
        this.save = this.save.bind(this)
        this.insertModal = this.insertModal.bind(this)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.dateFormatter = this.dateFormatter.bind(this)
        this.getFromBeltColor = this.getFromBeltColor.bind(this)
        this.getToBeltColor = this.getToBeltColor.bind(this)
        this.studentFormat = this.studentFormat.bind(this)
        this.loadRanks = this.loadRanks.bind(this)
        this.state = {
            progresses: [],
            ranks: []
        }
    }
    componentWillMount() {
        this.loadProgresses()
    }

    loadProgresses() {
        progresses.list().then(res => {
            if (res) {
                this.setState({
                    progresses: res.data.data
                })
                this.loadRanks();
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to fetch progresses')
            }
        })
    }

    loadRanks() {
        ranks.list().then(res => {
            if (res) {
                let ranks = [];
                res.data.data.forEach((rank) => {
                    ranks.push({ value: rank.id, label: rank.belt_color })
                });
                this.setState({
                  ranks
                })
            }
        }).catch(err => {
            if (err) {

            }
        })
    }


    del(e) {
        const id = e.target.dataset.id
        progresses.del(id).then(res => {
            if (res) {
                this.loadProgresses()
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to delete progresses!')
            }
        })
    }

    save(data, onSave, onModalClose) {
        progresses.create(data).then(res => {
            if (res) {
                onModalClose()
                this.loadProgresses()
            }
        }).catch(err => {
            if (err) {
                alertify.error(err.response.data.data.message)
            }
        })
    }

    insertModal(onModalClose, onSave, columns, validateState, ignoreEditable) {
        const attr = { onModalClose, onSave, columns, validateState, ignoreEditable };
        return <InsertModal {...attr} title="New Progress" saveBtnText="Add Progress" handleSave={this.save} bsSize="md" />
    }


    options() {
        return {
            insertModal: this.insertModal,
            insertBtn: () => <InsertButton btnText="New Progress" />
        }
    }

    actionsFormatter(cell, row) {
        return <div>
            <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del} />
        </div>
    }

    getFromBeltColor(cell, row) {
        return getBeltInfo(cell.belt_color)
    }

    getToBeltColor(cell, row) {
        return getBeltInfo(cell.belt_color)
    }

    dateFormatter(cell, row) {
        let event = new Date(cell)
        return <div>
            {event.toDateString().slice(4)}
        </div>
    }

    studentFormat(cell, row) {
      return cell.name
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container margin-top-75 margin-bottom-25">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <h5><b>Total Progress:</b> {this.state.progresses.length}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Progress</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <BootstrapTable data={this.state.progresses} options={this.options()} striped hover condensed search insertRow>
                                    <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} dataSort hiddenOnInsert>Progress ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField="student_id" dataAlign="center" dataSort>Student ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField="student" dataAlign="center" dataFormat={this.studentFormat} hiddenOnInsert>Student Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="date" dataAlign="center" hiddenOnInsert dataSort>Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField="from_rank" dataAlign="center" dataFormat={this.getFromBeltColor} hiddenOnInsert>From Rank</TableHeaderColumn>
                                    <TableHeaderColumn dataField="to_rank" dataAlign="center" dataFormat={this.getToBeltColor} hiddenOnInsert>To Rank</TableHeaderColumn>
                                    <TableHeaderColumn dataField="to_rank_id" hidden editable={{ type: 'select', options: this.state.ranks}}>To Rank</TableHeaderColumn>
                                    <TableHeaderColumn dataField="created_at" dataAlign="center" hiddenOnInsert dataFormat={this.dateFormatter}>Created On</TableHeaderColumn>
                                    <TableHeaderColumn dataField="updated_at" dataAlign="center" hiddenOnInsert dataFormat={this.dateFormatter}>Updated On</TableHeaderColumn>
                                    <TableHeaderColumn dataField="action" dataAlign="center" dataFormat={this.actionsFormatter} hiddenOnInsert>Actions</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
export default Progress