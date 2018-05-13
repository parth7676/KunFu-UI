import React from 'react'
import Navbar from "src/components/shared/Navbar"
import Footer from "src/components/shared/Footer"
import BootstrapTable from 'reactjs-bootstrap-table'

class Students extends React.Component {

    constructor(props) {
        super(props);
        this.actions = this.actions.bind(this)
        this.onSort = this.onSort.bind(this);
    }

    onSort(col, dir) {
        console.log('onSort: ' + col + ' ' + dir);
        this.props.sort(col, dir);
      }

    actions(row) {
        return(
        <div>
            <span style={{fontSize:14}} className="glyphicon glyphicon-edit"></span>
            <span style={{marginLeft:5,fontSize:14}} className="glyphicon glyphicon-trash"></span>
        </div>)
    }
    render() {
        let data = [
            { id: 1, name : 'Parth Patel', rank: 'Black Belt', enrolledDate: '24/07/1994'},
            { id: 2, name : 'Parth Patel', rank: 'Black Belt', enrolledDate: '24/07/1994'},
         ]

         let columns = [
            { name: 'id', display: '#', sort:true },
            { name: 'name', display: 'Name' },
            { name: 'rank', display: 'Rank' },
            { name: 'enrolledDate', display:'Enrolled Date'},
            { name: 'actions', display:'Actions', renderer: this.actions}
          ]

        return (
            <div>
                <Navbar></Navbar>
                <div className="container margin-top-75">
                    <div className="row">
                        <div className="col-md-12">
                            <BootstrapTable 
                                columns={columns} 
                                data={data} 
                                headers={true} 
                                tableClass='table table-bordered table-hover' 
                                onSort={this.onSort}/>
                        </div>
                </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

export default Students