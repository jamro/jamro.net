import React from 'react';

export default class HistoryEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showDetails: false
    }
  }

  toggleDetails() {
    this.setState((prevState) => {
      return {showDetails: !prevState.showDetails};
    });
  }

  render() {
    var icon = 'star';
    var badgeStyle = {};
    var className = '';
    switch(this.props.type) {
      case 'job':
        icon = 'briefcase';
        badgeStyle = {backgroundColor: '#be3a06'};
        className = '';
        break;
      case 'education':
        icon = 'graduation-cap';
        badgeStyle = {backgroundColor: '#0864cd'};
        className = 'timeline-inverted';
        break;
      case 'business':
        icon = 'lightbulb';
        badgeStyle = {backgroundColor: '#b7c001'};
        className = 'timeline-inverted';
        break;
    }
    var dates = (this.props.from == this.props.to) ? this.props.from : `${this.props.from} - ${this.props.to}`;
    var organization = null;
    if(this.props.organizationUrl && this.props.organizationName) {
      organization = <a href={this.props.organizationUrl} className="organization" target="_blank">{this.props.organizationName}</a>;
    } else if (!this.props.organizationUrl && this.props.organizationName) {
      organization = <span className="organization">{this.props.organizationName}</span>;
    } else {
      organization = null;
    }

    var details = <ul>
      {this.props.details.map((item, index) => <li key={index}>{item}</li>)}
    </ul>;
    if(!this.state.showDetails) {
      details = null;
    }

    return <li className={className}>
      <div className="anchor" id={this.props.id}></div>
      <div className="timeline-badge" style={badgeStyle}><i className={`ico ico-${icon}`} aria-hidden="true"></i></div>
      <div className="timeline-panel">
        <div className="timeline-heading">
          <h4 className="timeline-title">{this.props.title}</h4>
          <p>{organization} <br/>
          <small className="text-muted"><i className="ico ico-clock"></i> {dates}</small></p>
        </div>
        <div className="timeline-body">
          <p>{this.props.description}</p>
          <br/>
          <a href="javascript:void(0)" className="details-link" onClick={() => this.toggleDetails()}>
            {this.props.detailsTitle}
            &nbsp;
            <i className={'ico ico-' + (this.state.showDetails ? 'down-dir' : 'right-dir')} aria-hidden="true"></i>
          </a>
          {details}
        </div>
      </div>
    </li>;
  }
}
