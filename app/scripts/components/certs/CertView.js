import React from 'react';

export default class CertView extends React.Component {

  render() {
    return <div className="col-lg-6 col-sm-12 cert-view">
        <div className="anchor" id={this.props.id}></div>
        <div className="cert-icon">
          <div>
            <i className="ico ico-thumbs-up ico-3x" aria-hidden="true"></i>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h3>{this.props.name}</h3>
            <small><i className="ico ico-clock"></i> {this.props.date}</small>
            <div>
              <p>{this.props.description}</p>
              <footer className="blockquote-footer"><cite title={this.props.source}>{this.props.source}</cite></footer>
            </div>
          </div>
        </div>
      </div>;
  }
}
