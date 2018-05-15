import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import * as batches from 'endpoints/batches'
import alertify from 'alertifyjs'

class Batches extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.renderLevel = this.renderLevel.bind(this)
        this.deleteBatch = this.deleteBatch.bind(this)
        this.state = ({
            batches: []
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
        }).catch(error => {
            if (error) {
                alertify.error("Error while fetching batches!")
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
    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container margin-top-75">
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Batches</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <BootstrapTable data={this.state.batches} striped hover condensed search>
                                <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true}>Batch ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="day" dataAlign="center">Day</TableHeaderColumn>
                                <TableHeaderColumn dataField="time" dataAlign="center">Time</TableHeaderColumn>
                                <TableHeaderColumn dataField="created_at" dataAlign="center">Careted At</TableHeaderColumn>
                                <TableHeaderColumn dataField="updated_at" dataAlign="center">Updated At</TableHeaderColumn>
                                <TableHeaderColumn dataField="level_id" dataAlign="center" dataFormat={this.renderLevel}>Level</TableHeaderColumn>
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
export default Batches