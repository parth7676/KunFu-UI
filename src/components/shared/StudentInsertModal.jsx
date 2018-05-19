import React from 'react'

class StudentInsertModal extends React.Component {
  constructor (props) {
    super(props)
    this.nextStep = this.nextStep.bind(this)
    this.validate = this.validate.bind(this)
    this.student = this.student.bind(this)
    this.parent = this.parent.bind(this)
    this.state = {
      completeStep: [false, false, false],
      currentStep: 1,
      parents: [],
      student: {},
      tempParent: {},
      parent: {},
      relations: [
        {value: 'Father', label: 'Father'},
        {value: 'Mother', label: 'Mother'}
      ]
    }
  }

  nextStep (e) {
    e.preventDefault()
    let parents = this.state.parents
    if (this.state.currentStep > 1) {
      parents.push(this.state.parent)
    }
    const currentStep = this.state.currentStep + 1
    this.setState({
      currentStep,
      parents,
      parent: {}
    })
  }

  beforeHandleSave (columns, onSave, onModalClose) {
    let data = this.state.student
    let parents = this.state.parents
    if (Object.keys(this.state.parent).length !== 0) {
      parents.push(this.state.parent)
    }
    data = Object.assign(data, {parents})
    this.props.handleSave(data, onSave, onModalClose)
  }

  validate (e) {
    const form = this.refs['form_step_' + this.state.currentStep]
    const target = e.target
    let completeStep = this.state.completeStep
    if (target.checkValidity()) {
      target.classList.remove('msg-error')
      target.classList.add('msg-success')
      completeStep[this.state.currentStep - 1] = true
      this.setState({
        completeStep
      })
    } else {
      target.classList.remove('msg-success')
      target.classList.add('msg-error')
      completeStep[this.state.currentStep - 1] = false
      this.setState({
        completeStep
      })
    }
  }

  student (e) {
    const target = e.target
    let student = this.state.student
    student[target.name] = target.value
    this.setState({student})
  }

  parent (e) {
    const target = e.target
    let parent = this.state.parent
    if (target.name === "enrolled") {
      parent[target.name] = target.value === "true";
    } else {
      parent[target.name] = target.value
    }
    this.setState({parent})
  }

  render () {
    const {
      onModalClose,
      onSave,
      columns,
      validateState,
      ignoreEditable,
      title,
      bsSize
    } = this.props

    return (
      <div className="modal-content margin-top-75">
        <div className="modal-header">
          <h4>Student Enrollment</h4>
        </div>
        <div className="modal-body">
          <form ref={'form_step_1'}>
            {
              this.state.currentStep === 1 && <div ref={'step'} className="step">
                <div className="row">
                  <div className="col-md-12">
                    <label>Student Name</label>
                    <input ref={'name'} name="name" className="form-control" type="text" required={true}
                           onChange={this.student} onBlur={this.validate}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Birthday</label>
                    <input ref={'birthday'} name="birthday" className="form-control" type="date" required={true}
                           onChange={this.student} onBlur={this.validate}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Mobile No</label>
                    <input ref={'mobile_no'} name="mobile_no" className="form-control" maxLength="10" pattern="\d{10}"
                           required={true} onChange={this.student} onBlur={this.validate}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Email</label>
                    <input ref={'email'} name="email" className="form-control" type="email" required={true}
                           onChange={this.student} onBlur={this.validate}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Address</label>
                    <textarea ref={'address'} name="address" rows={3} className="form-control" required={true}
                              onChange={this.student} onBlur={this.validate}/>
                  </div>
                </div>
              </div>
            }
          </form>
          <form ref={'form_step_2'}>
            {
              this.state.currentStep === 2 && <div ref={'step'} className="step">
                <div className="row">
                  <div className="col-md-12">
                    <label>Parent Name</label>
                    <input name="name" className="form-control" type="text" onBlur={this.validate}
                           onChange={this.parent}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Mobile No</label>
                    <input name="mobile_no" className="form-control" type="text" maxLength="10" onBlur={this.validate}
                           pattern="\d{10}" onChange={this.parent}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Email</label>
                    <input name="email" className="form-control" type="email" onBlur={this.validate}
                           onChange={this.parent}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Relation</label>
                    <select name="relation" className="form-control" onBlur={this.validate} onChange={this.parent}>
                      <option value={null}>Select Option</option>
                      {
                        this.state.relations.map((relation, index) => (
                          <option key={'form_2' + index} value={relation.value}>{relation.label}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Enrolled</label>
                    <select name="enrolled" className="form-control" onBlur={this.validate} onChange={this.parent}>
                      <option value={null}>Select Option</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
              </div>
            }
          </form>
          <form ref={'form_step_3'}>
            {
              this.state.currentStep === 3 && <div ref={'step'} className="step">
                <label className="text-info">You can skip this step by clicking Enroll Student</label>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Parent Name</label>
                    <input name="name" className="form-control" type="text" required={true} onChange={this.parent}
                           onBlur={this.validate}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Mobile No</label>
                    <input name="mobile_no" className="form-control" type="text" maxLength={10} pattern="\d{10}"
                           required={true} onChange={this.parent} onBlur={this.validate}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Email</label>
                    <input name="email" className="form-control" type="email" required={true} onChange={this.parent}
                           onBlur={this.validate}/>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Relation</label>
                    <select name="relation" className="form-control" required={true} onChange={this.parent}
                            onBlur={this.validate}>
                      <option value={null}>Select Relation</option>
                      {
                        this.state.relations.map((relation, index) => (
                          <option key={'form_3' + index} value={relation.value}>{relation.label}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className="row margin-top-10">
                  <div className="col-md-12">
                    <label>Enrolled</label>
                    <select name="enrolled" className="form-control" required={true} onChange={this.parent}
                            onBlur={this.validate}>
                      <option value={null}>Select Option</option>
                      <option value={true}>Yes</option>
                      <option value={false}>No</option>
                    </select>
                  </div>
                </div>
              </div>
            }
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-default" onClick={onModalClose}>Cancel</button>
          {this.state.currentStep <= 2 && <button className="btn btn-primary" onClick={this.nextStep}
                                                  disabled={!this.state.completeStep[this.state.currentStep - 1]}>
            Next</button>}
          {this.state.completeStep[0] && this.state.currentStep > 2 &&
          <button className="btn btn-success" onClick={() => this.beforeHandleSave(columns, onSave, onModalClose)}>
            Enroll Student</button>}
        </div>
      </div>
    )
  }
}

export default StudentInsertModal
