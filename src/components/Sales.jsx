import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as sales from 'endpoints/sales'
import alertify from 'alertifyjs'
import PropTypes from 'prop-types'
import { isDate } from 'moment';
import { dateConverter } from '../utils/scripts'

class Sales extends React.Component {

    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this)
        this.del = this.del.bind(this)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.dateFormatter = this.dateFormatter.bind(this)
        this.state = {
            sales: []
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
        // return dateConverter(cell)
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
                            <BootstrapTable data={this.state.sales} striped hover condensed search>
                                <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true} dataSort>Sales ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="type" dataAlign="center">Type</TableHeaderColumn>
                                <TableHeaderColumn dataField="message" dataAlign="center">Message</TableHeaderColumn>
                                <TableHeaderColumn dataField="date" dataAlign="center" dataSort >Date</TableHeaderColumn>
                                <TableHeaderColumn dataField="student_id" dataAlign="center" dataSort>Student ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="amount" dataAlign="center">Amount</TableHeaderColumn>
                                <TableHeaderColumn dataField="created_at" dataAlign="center" dataFormat={this.dateFormatter}>Created On</TableHeaderColumn>
                                <TableHeaderColumn dataField="updated_at" dataAlign="center" dataFormat={this.dateFormatter}>Updated On</TableHeaderColumn>
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

export default Sales