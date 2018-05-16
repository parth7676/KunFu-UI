import React from 'react'
import Navbar from 'src/components/shared/Navbar'
import Footer from 'src/components/shared/Footer'
import * as levels from 'endpoints/levels'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import alertify from 'alertifyjs'

class Levels extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.actionsFormatter = this.actionsFormatter.bind(this)
        this.del = this.del.bind(this)
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
                alertify.error("Error while deleteing level!")
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
                            <BootstrapTable data={this.state.levels} striped hover condensed search>
                                <TableHeaderColumn isKey={true} dataField="id" dataAlign="center" autoValue={true}>ID</TableHeaderColumn>
                                <TableHeaderColumn dataField="type" dataAlign="center">Type</TableHeaderColumn>
                                <TableHeaderColumn dataField="type" dataAlign="center" dataFormat={this.rankFormatter}>Type</TableHeaderColumn>
                                <TableHeaderColumn dataField="created_at" dataAlign="center">Created At</TableHeaderColumn>
                                <TableHeaderColumn dataField="updated_at" dataAlign="center">Updated At</TableHeaderColumn>
                                <TableHeaderColumn dataField="actions" dataAlign="center" dataFormat={this.actionsFormatter}>Actions</TableHeaderColumn>
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