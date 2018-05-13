import React from 'react'
import Navbar from "src/components/shared/Navbar"
import Footer from "src/components/shared/Footer"
import BootstrapTable from 'reactjs-bootstrap-table';
import TableHeaderColumn from 'reactjs-bootstrap-table'

class Students extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          students: []
        }
    }

    componentWillMount() {

    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <div className="container margin-top-75">
                    <div className="row">
                        <div className="col-md-12">
                            <BootstrapTable data={this.state.students} striped hover version="4">
                              <TableHeaderColumn isKey dataField="id">Student ID</TableHeaderColumn>
                              <TableHeaderColumn dataField="name">Student Name</TableHeaderColumn>
                              <TableHeaderColumn dataField="birthday">DOB</TableHeaderColumn>
                              <TableHeaderColumn dataField="date">Enrolled On</TableHeaderColumn>
                              <TableHeaderColumn dataField="mobile_no">Mobile No</TableHeaderColumn>
                              <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
                              <TableHeaderColumn dataField="address">Address</TableHeaderColumn>
                            </BootstrapTable>
                        </div>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Students