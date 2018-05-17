import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import { BootstrapTable, InsertButton, TableHeaderColumn } from 'react-bootstrap-table'
import * as sales from 'endpoints/sales'
import alertify from 'alertifyjs'
import InsertModal from 'components/shared/InsertModal'

class Sales extends React.Component {

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this)
        this.del = this.del.bind(this)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.dateFormatter = this.dateFormatter.bind(this)
        this.getStudentName = this.getStudentName.bind(this)
        this.options = this.options.bind(this)
        this.save = this.save.bind(this)
        this.createInsertModal = this.createInsertModal.bind(this)
        this.state = {
            sales: [],
            types: [
              {value: 'Membership', label: 'Membership'},
              {value: 'Tests', label: 'Tests'},
              {value: 'Product', label: 'Product'},
              {value: 'Other', label:'Other'}
            ]
        }
    }

    componentWillMount() {
        this.loadSales()
    }

    loadSales() {
        sales.list().then(res => {
            if (res) {
                this.setState({
                    sales: res.data.data
                })
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to fetch sales')
            }
        })
    }

    edit(e) {
        const id = e.target.dataset.id
        this.props.history.push(`/sales/${id}`)
    }

    del(e) {
        const id = e.target.dataset.id
        sales.del(id).then(res => {
            if (res) {
                this.loadSales()
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to delete sales!')
            }
        })
    }

    actionsFormatter(cell, row) {
        return <div>
            <i className="fa fa-edit text-primary" style={{ marginRight: 10 }} onClick={this.edit} data-id={row.id} />
            <i className="fa fa-trash text-danger" data-id={row.id} onClick={this.del} />
        </div>
    }

    dateFormatter(cell, row) {
        let event = new Date(cell)
        return <div>
            {event.toDateString().slice(4)}
        </div>
    }

    getStudentName(cell, row) {
        return cell.name
    }

    save(data, onSave, onModalClose) {
        sales.create(data).then(res => {
            if(res) {
                onModalClose()
                this.loadSales()
            }
        }).catch(err => {
            if (err) {
                alertify.error('Unable to add new sales!')
            }
        })
    }

    createInsertModal(onModalClose, onSave, columns, validateState, ignoreEditable) {
      const attr = { onModalClose, onSave, columns, validateState, ignoreEditable };
      return <InsertModal { ...attr } title="New Sale" saveBtnText="Add Sale" handleSave={this.save} bsSize="md" />
    }

    options() {
        return {
            insertBtn: () => <InsertButton btnText="New Sale" />,
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
                                    <h5><b>Total Sales:</b> {this.state.sales.length}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Sales</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <BootstrapTable data={this.state.sales} options={this.options()} striped hover condensed search insertRow>
                                <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} dataSort hiddenOnInsert>Sales ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="type" dataAlign="center" editable={{type: 'select', options: this.state.types, required: true}}>Type</TableHeaderColumn>
                                <TableHeaderColumn dataField="message" dataAlign="center" editable={{type: 'text'}}>Message</TableHeaderColumn>
                                <TableHeaderColumn dataField="date" dataAlign="center" dataSort editable={{type: 'date', required: false, message: "leave blank for today's date"}}>Date</TableHeaderColumn>
                                <TableHeaderColumn dataField="student_id" dataAlign="center" dataSort hidden>Student ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="student" dataFormat={this.getStudentName} dataAlign="center" dataSort hiddenOnInsert>Student Name</TableHeaderColumn>
                                <TableHeaderColumn dataField="amount" dataAlign="center" editable={{type: 'number', required: true}}>Amount</TableHeaderColumn>
                                <TableHeaderColumn dataField="created_at" dataAlign="center" dataFormat={this.dateFormatter} hiddenOnInsert>Created On</TableHeaderColumn>
                                <TableHeaderColumn dataField="updated_at" dataAlign="center" dataFormat={this.dateFormatter} hiddenOnInsert>Updated On</TableHeaderColumn>
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

export default Sales