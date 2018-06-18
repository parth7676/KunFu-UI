import React from 'react'
import PropTypes from 'prop-types';

class EditModal extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.handleSave = this.handleSave.bind(this)
        props.columns.forEach((column) => {
            this.state = {
                [column.field]: column.value !== undefined ? column.value : ''
            }
        });
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSave() {
        this.props.onSave(this.state);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.id;
        this.setState({
            [name]: value
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.dataID
        })
        nextProps.columns.forEach((column) => {
            this.setState({
                [column.field]: column.value !== undefined ? column.value : ''
            })
        });

    }

    render() {
        return (
            <div id={this.props.modalID} className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">{this.props.title} #{this.props.dataID}</h4>
                        </div>
                        <div className="modal-body">
                            <form id="insertForm" autoComplete="off">
                                {
                                    this.props.columns.map(column => {
                                        return (
                                            <div key={column.name}>
                                                {
                                                    column.type !== 'select' && column.type !== 'textarea' &&
                                                    <div className="form-group">
                                                        <label htmlFor={`inputField${column.name}`}>{column.name}:</label>
                                                        <input
                                                            ref={column.name}
                                                            id={column.field}
                                                            type={column.type}
                                                            placeholder={column.name}
                                                            className="form-control"
                                                            value={this.state[column.field]}
                                                            onChange={this.handleInputChange}
                                                            disabled={column.disabled ? column.disabled : false}
                                                        />
                                                    </div>
                                                }
                                                {
                                                    column.type === 'select' &&
                                                    <div className="form-group">
                                                        <label htmlFor={`selectField${column.name}`}>{column.name}:</label>
                                                        <select
                                                            ref={column.name}
                                                            id={column.field}
                                                            className="form-control"
                                                            onChange={this.handleInputChange}
                                                            disabled={column.disabled ? column.disabled : false}
                                                            value={this.state[column.field]}>
                                                            {
                                                                column.options.map(option =>
                                                                    typeof option === 'object' && <option key={option.value} value={option.value}>{option.label}</option>)
                                                            }
                                                        </select>
                                                    </div>
                                                }
                                                {
                                                    column.type === 'textarea' &&
                                                    <div className="form-group">
                                                        <label htmlFor={`textArea${column.name}`}>{column.name}:</label>
                                                        <textarea
                                                            ref={column.name}
                                                            className="form-control"
                                                            id={column.field}
                                                            rows="3"
                                                            value={this.state[column.field]}
                                                            onChange={this.handleInputChange}
                                                            disabled={column.disabled ? column.disabled : false}
                                                        />
                                                    </div>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => this.handleSave()}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

EditModal.propTypes = {
    modalID: PropTypes.string,
    columns: PropTypes.array,
    title: PropTypes.string,
    onSave: PropTypes.func
}

EditModal.defaultProps = {
    modalID: '',
    title: 'Edit Modal',
    columns: []
}

export default EditModal