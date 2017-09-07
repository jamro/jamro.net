import Badge from './Badge.js';
import React from 'react';
import badgesData from '../../../data/badges.json';

export default class Title extends React.Component {

  renderBadges() {
    return badgesData.map((badge, index) => (
      <Badge key={index} type={badge.name} description={badge.description} />
    ));
  }

  render() {
    return <div className="jumbotron jumbotron-fluid text-center title">
      <div className="container">
        <h1 className="display-3">Krzysztof Jamróz</h1>
        <ul className="badge-list">
          {this.renderBadges()}
        </ul>
      </div>
    </div>
  }
}
