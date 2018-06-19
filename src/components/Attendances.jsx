import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'
import * as attendances from 'endpoints/attendances'
import * as batches from 'endpoints/batches'
import alertify from 'alertifyjs'
import InsertModal from 'components/shared/InsertModal'

class Attendances extends React.Component {
    constructor(props) {
        super(props);
        this.del = this.del.bind(this)
        this.save = this.save.bind(this)
        this.insertModal = this.insertModal.bind(this)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.getStudentName = this.getStudentName.bind(this)
        this.dateFormatter = this.dateFormatter.bind(this)
        this.getBatch = this.getBatch.bind(this)
        this.loadBatches = this.loadBatches.bind(this)
        this.state = {
            attendances: [],
            batches: []
        }
    }

    componentWillMount() {
        this.loadBatches()
    }

    loadAttendances() {
        attendances.list().then(res => {
            if (res) {
                this.setState({
                    attendances: res.data.data
                })
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to fetch attendances')
            }
        })
    }

    loadBatches() {
        batches.list().then(res => {
            if (res) {
                let batches = []
                res.data.data.forEach(batch => {
                    batches.push({ value: batch.id, label: batch.day })
                })
                this.setState({
                  batches
                })
                this.loadAttendances();
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to fetch batches!')
            }
        })
    }

    del(e) {
        const id = e.target.dataset.id
        attendances.del(id).then(res => {
            if (res) {
                this.loadAttendances()
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to delete attendances!')
            }
        })
    }

    save(data, onSave, onModalClose) {
        attendances.create(data).then(res => {
            if (res) {
                onModalClose()
                this.loadAttendances()
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to add attendance!')
            }
        })
    }

    insertModal(onModalClose, onSave, columns, validateState, ignoreEditable) {
        const attr = { onModalClose, onSave, columns, validateState, ignoreEditable };
        return <InsertModal {...attr} title="New Attendance" saveBtnText="Enroll Attendance" handleSave={this.save} bsSize="md" />
    }


    options() {
        return {
            insertModal: this.insertModal,
            insertBtn: () => <InsertButton btnText="New Attendance" />
        }
    }

    actionsFormatter(cell, row) {
        return <div>
            <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del} />
        </div>
    }
    getStudentName(cell, row) {
        return cell.name
    }

    dateFormatter(cell, row) {
        let event = new Date(cell)
        return <div>
            {event.toDateString().slice(4)}
        </div>
    }

    getBatch(cell, row) {
        let batchId = row.batch_id
        let batches = this.state.batches
        let batch = batches.filter(b => b.value === batchId)[0].label
        return batch
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
                                    <h5><b>Total Attendance:</b> {this.state.attendances.length}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <h3>Attendance</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <BootstrapTable data={this.state.attendances} options={this.options()} striped hover condensed search insertRow>
                                    <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} dataSort hiddenOnInsert>Attendance ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField="date" dataAlign="center" editable={{ type: 'date', required: true }} dataSort hiddenOnInsert>Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField="student_id" dataAlign="center" dataSort>Student ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField="student" dataFormat={this.getStudentName} dataAlign="center" hiddenOnInsert>Student Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="batch_id" dataAlign="center" dataFormat={this.getBatch} editable={{ type: 'select', options: this.state.batches }}>Batch</TableHeaderColumn>
                                    <TableHeaderColumn dataField="created_at" dataAlign="center" hiddenOnInsert dataFormat={this.dateFormatter}>Enrolled On</TableHeaderColumn>
                                    <TableHeaderColumn dataField="updated_at" dataAlign="center" hiddenOnInsert dataFormat={this.dateFormatter}>Updated On</TableHeaderColumn>
                                    <TableHeaderColumn dataField="action" dataAlign="center" dataFormat={this.actionsFormatter} hiddenOnInsert>Actions</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}
export default Attendances
