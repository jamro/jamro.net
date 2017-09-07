import React from 'react';
import skillsData from '../../../data/skills.json';

export default class Skills extends React.Component {
  renderSkills() {
    return skillsData.map((skill) => {
      let today = (new Date()).getFullYear();
      skill.to = skill.to ? skill.to : today;
      skill.duration = skill.to - skill.from;
      skill.maxDuration = today - 2003;
      skill.percentage = Math.round(100*skill.duration/skill.maxDuration);
      return skill;
    })
    .sort((a, b) => b.percentage - a.percentage)
    .map((skill, index) => {
      return <div className="col-12" key={index}>
        <div className="progress">
          <div className={`progress-bar skill-${skill.type}`} role="progressbar" aria-valuenow={skill.percentage} aria-valuemin="0" aria-valuemax="100" style={{width: `${skill.percentage}%`}}>
            <span className="sr-only">60% Complete</span>
          </div>
          <span className="progress-type">{skill.name}</span>
          <span className="progress-completed">{skill.duration} years</span>
        </div>
      </div>
    });
  }
  render() {
    return <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Skills &amp; Experience</h2>
          </div>
        </div>
        <div className="row">
          {this.renderSkills()}
        </div>
      </div>;
  }
}
