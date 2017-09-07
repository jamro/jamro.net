import React from 'react';
import badgesSheet from '../../../images/badges.png';

export default class Badge extends React.Component {

  componentDidMount() {

  }

  render() {
    let positions = [];
    positions['certified'] = '0px -196px';
    positions['promoted'] = '-98px 98px';
    positions['degreed'] = '-98px 0px';
    positions['connected'] = '-98px -98px';
    positions['recommended'] = '0px -98px';
    positions['supervisor'] = '0px 0px';

    let style = {};
    if(positions[this.props.type]) {
      style.backgroundImage = `url(${badgesSheet})`;
      style.backgroundPosition = positions[this.props.type];
    } else {
      console.warn("Unsupported badge " + this.props.type); // eslint-disable-line no-console
    }
    return <li>
        <a ref={(item) => $(item).tooltip()}
          href="#"
          className="carreer-badge"
          style={style}
          data-toggle="tooltip"
          title={this.props.description}
        >&nbsp;</a>
      </li>;
  }
}
