import React from 'react';
import StrengthItem from './StrengthItem.js';
import strengthsData from '../../../data/strengths.json';

export default class Strengths extends React.Component {
  renderStrengths() {
    return strengthsData.map((strength, index) => (
      <StrengthItem
        key={index}
        name={strength.name}
        category={strength.category}
        icon={strength.icon}
        description={strength.description}
        source={strength.source}
      />
    ));
  }

  render() {
    return <div className="container">
        <div className="row">
          <div className="col-12">
            <hr />
            <h2>Strengths</h2>
          </div>
        </div>
        <div className="row">
          {this.renderStrengths()}
        </div>
      </div>;
  }
}
