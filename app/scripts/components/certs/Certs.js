import React from 'react';
import certData from '../../../data/certificates.json';
import CertView from './CertView.js';

export default class Certs extends React.Component {

  renderCerts() {
    return certData.map((cert) => (
      <CertView
        id={cert.id}
        key={cert.id}
        name={cert.name}
        date={cert.date}
        description={cert.description}
        source={cert.source}
      />
    ));
  }

  render() {
    return <div className="container">
        <hr/>
        <div className="row">
          <div className="col-md-12">
            <h2>Certificates</h2>
          </div>
        </div>
        <div className="row">
          {this.renderCerts()}
        </div>
      </div>;
  }
}
