import React from 'react';

export default class StrengthItem extends React.Component {

  render() {
    return <div className="col-lg-2 col-md-4 col-sm-6 strength-item">
        <h3>
          {this.props.name}
          <br/>
          <small>({this.props.category})</small>
        </h3>
        <i className={`ico ico-4x ico-${this.props.icon}`}></i>
        <br/>
        <button type="button" className="btn btn-default" data-toggle="modal" data-target={`#strength-modal-${this.props.name}`}>
          Learn more <i className="ico ico-right-open"></i>
        </button>
        <div id={`strength-modal-${this.props.name}`} className="modal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{this.props.name}</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-2">
                    <i className="ico ico-quote-left ico-3x float-right"></i>
                  </div>
                  <div className="col-10 text-left">
                    <p>{this.props.description}</p>
                    <p><small className="float-right">- {this.props.source}</small></p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  }
}
