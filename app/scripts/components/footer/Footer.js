import React from 'react';
import summaryData from '../../../data/summary.json';

export default class Footer extends React.Component {

  render() {
    return <div className="page-footer">
        <p>Find me on:</p>
        <a href={summaryData.linkedin} title="Find me on LinkedIn" target="_blank">
          <i className="ico ico-linkedin-squared ico-5x"></i>
        </a>
        <a href={summaryData.github} title="Find me on GitHub" target="_blank">
          <i className="ico ico-github-squared ico-5x"></i>
        </a>
        <a href={summaryData.twitter} title="Find me on Twitter" target="_blank">
          <i className="ico ico-twitter-squared ico-5x"></i>
        </a>
      </div>;
  }
}
