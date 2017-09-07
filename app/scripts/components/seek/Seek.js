import React from 'react';

export default class Seek extends React.Component {
  render() {
    return <div className="container" style={{marginTop: '60px'}}>
          <div className="row">
            <hr/>
            <div className="col-md-12">
              <h2>Currently seeking</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-sm-12">
                <blockquote style={{minHeight: '150px'}}>
                  <h3>
                      <i className="ico ico-briefcase"></i> &nbsp;
                      New Busines
                  </h3>
                  <p>Please contact me if you are interested in discussing any business opportunities</p>
                </blockquote>
            </div>
            <div className="col-lg-4 col-sm-12">
              <blockquote style={{minHeight: '150px'}}>
                <h3>
                    <i className="ico ico-cogs"></i> &nbsp;
                    Consulting
                </h3>
                <p>Please contact me for consulting opportunities</p>
              </blockquote>
            </div>
            <div className="col-lg-4 col-sm-12">
              <blockquote style={{minHeight: '150px'}}>
                <h3>
                    <i className="ico ico-user"></i> &nbsp;
                    Applications
                </h3>
                <p>Please contact me to apply for employment or internships within my organization</p>
              </blockquote>
            </div>
          </div>
        </div>;
  }
}
