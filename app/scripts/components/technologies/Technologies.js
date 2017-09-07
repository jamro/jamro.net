import React from 'react';
import techData from '../../../data/technologies.json';

export default class Technologies extends React.Component {
  renderTech() {
    let techList = techData.sort((a, b) => a.localeCompare(b));
    return techList.map((tech, index) => {
      return <span key={index} className="badge tech-badge badge-primary">{tech}</span>
    });
  }
  render() {
    return <div className="container" style={{marginTop: '30px'}}>
        <div className="row">
          <div className="col-12">
            <h2>Technologies</h2>
            <p>
              Some of tools that I{"'"}ve worked with over last years:
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 tech-container">
            {this.renderTech()}
          </div>
        </div>
      </div>;
  }
}
