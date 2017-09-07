import React from 'react';
import summaryData from '../../../data/summary.json';
import myPhoto from '../../../images/me.png';

export default class Summary extends React.Component {
  shortenUrl(url) {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }

  insertNonBrakingSpaces(txt) {
    return txt.replace(/( [a-z]) /ig, '$1\u00A0');
  }

  render() {
    return <div className="container summary">
        <div className="row">
          <div className="col-lg-4 col-md-5">
            <div className="me"><img src={myPhoto} alt="Photo of Krzysztof"/></div>
            <blockquote>
              <p>
                <i className="ico ico-location"></i> {summaryData.location}
              </p>
              <p>
                <i className="ico ico-calendar"></i> {summaryData.dateOfBirth}
              </p>
              <p>
                <i className="ico ico-mail"></i> <a href={`mailto:${summaryData.email}`}> {summaryData.email}</a>
              </p>
              <p className="d-print-block">
                <i className="ico ico-twitter-squared"></i> <a href={summaryData.twitter}> {this.shortenUrl(summaryData.twitter)}</a>
              </p>
              <p className="d-print-block">
                <i className="ico ico-linkedin-squared"></i> <a href={summaryData.linkedin}> {this.shortenUrl(summaryData.linkedin)}</a>
              </p>
              <p className="d-print-block">
                <i className="ico ico-github-squared"></i> <a href={summaryData.github}> {this.shortenUrl(summaryData.github)}</a>
              </p>
            </blockquote>
          </div>
            <div className="col-lg-8 col-md-7" style={{paddingTop: '100px'}}>
              <h2>Summary</h2>
              <p><em>{this.insertNonBrakingSpaces(summaryData.bio)}</em></p>
            </div>
        </div>
        <hr/>
      </div>
  }
}
