import React from 'react';

export default class NaviButton extends React.Component {
  render() {
    return <li className="nav-item">
        <a className="nav-link" href={this.props.link}>
          <span>{this.props.name}</span>
        </a>
      </li>
  }
}
