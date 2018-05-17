import React from 'react'

class InsertModal extends React.Component {
  constructor (props) {
    super(props)
    this.validate = this.validate.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.beforeHandleSave = this.beforeHandleSave.bind(this)
    this.state = {
      showSaveOption: false,
      steps: this.props.steps,
      currentStep: 1
    }
  }

  validate(e) {
    const form = document.getElementById('insertForm');
    const target = e.target
    if (target.checkValidity()) {
      target.classList.remove('msg-error')
      target.classList.add('msg-success')
      if (form.checkValidity()) {
        this.setState({
          showSaveOption: true
        })
      }
    } else {
      target.classList.remove('msg-success')
      target.classList.add('msg-error')
    }
  }

  beforeHandleSave(columns, onSave, onModalClose) {
    let data = {}
    columns.forEach((column, i) => {
      if (!column.hiddenOnInsert) {
        data[column.field] = this.refs[column.field].value
      }
    }, data)
    this.props.handleSave(data, onSave, onModalClose)
  }

  nextStep (e) {
    e.preventDefault()
    const currentStep = this.state.currentStep + 1
    this.setState({
      currentStep
    })
  }


  render() {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable,
      title,
      bsSize
    } = this.props;

    return (
      <div className={`modal-dialog margin-top-75 modal-${ bsSize ? bsSize : 'md'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onModalClose}><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">{title ? title : 'New Information'}</h4>
          </div>
          <div className="modal-body">
            <form id="insertForm" autoComplete="off">
              {
                columns.map((column, i) => {
                  const {
                    editable,
                    format,
                    field,
                    name,
                    hiddenOnInsert
                  } = column;

                  if (hiddenOnInsert) {
                    return null
                  }

                  const err = validateState[field] ? (<span className='help-block bg-danger'>{ validateState[field] }</span>) : null
                  return (
                    <div className='form-group' key={ field }>
                      <label>{ name } : </label>
                      {
                        editable.type !== 'select' && editable.type !== 'textarea' &&
                          <input ref={field}
                                 required={!!editable.required}
                                 minLength={editable.minLength ? editable.minLength : null}
                                 maxLength={editable.maxLength ? editable.maxLength : null}
                                 type={editable.type ? editable.type : 'text'}
                                 pattern={editable.pattern ? editable.pattern : null}
                                 className="form-control"
                                 onChange={this.validate}
                          />
                      }
                      {
                        editable.type === 'textarea' &&
                        <textarea required={!!editable.required} rows={3} ref={field} className="form-control" onChange={this.validate}/>
                      }
                      { err }
                    </div>
                  );
                })
              }
            </form>
          </div>
          <div className="modal-footer">
            <button className="btn btn-default" onClick={onModalClose}>Close</button>
            <button className="btn btn-success" disabled={!this.state.showSaveOption} onClick={() => this.beforeHandleSave(columns, onSave, onModalClose)}>{this.props.saveBtnText}</button>
          </div>
        </div>
    </div>
    )
  }
}

export default InsertModal