import React from 'react';
import TimelineEntry from './TimelineEntry.js';
import CareerGraphContainer from './CareerGraphContainer.js';

import yggdrasil_head_of_delivery_gaming from '../../../data/career/yggdrasil_head_of_delivery_gaming.json';
import novomatic_head_of_technology_department from '../../../data/career/novomatic_head_of_technology_department.json';
import education_mba from '../../../data/career/education_mba.json';
import novomatic_head_of_ppm from '../../../data/career/novomatic_head_of_ppm.json';
import novomatic_head_of_pmo from '../../../data/career/novomatic_head_of_pmo.json';
import education_mooc from '../../../data/career/education_mooc.json';
import novomatic_executive_manager from '../../../data/career/novomatic_executive_manager.json';
import business_eratownik from '../../../data/career/business_eratownik.json';
import novomatic_it_pm from '../../../data/career/novomatic_it_pm.json';
import business_limexgames from '../../../data/career/business_limexgames.json';
import novomatic_web_dev from '../../../data/career/novomatic_web_dev.json';
import education_pm from '../../../data/career/education_pm.json';
import education_se from '../../../data/career/education_se.json';
import freelancer from '../../../data/career/freelancer.json';
import education_aar from '../../../data/career/education_aar.json';

export default class Timeline extends React.Component {

  constructor(props) {
    super(props);
    this.data = [];
    this.data.push(yggdrasil_head_of_delivery_gaming);
    this.data.push(novomatic_head_of_technology_department);
    this.data.push(education_mba);
    this.data.push(novomatic_head_of_ppm);
    this.data.push(novomatic_head_of_pmo);
    this.data.push(education_mooc);
    this.data.push(novomatic_executive_manager);
    this.data.push(business_eratownik);
    this.data.push(novomatic_it_pm);
    this.data.push(business_limexgames);
    this.data.push(novomatic_web_dev);
    this.data.push(education_pm);
    this.data.push(education_se);
    this.data.push(freelancer);
    this.data.push(education_aar);
  }


  renderEntries() {
    return this.data.map((item) => (
      <TimelineEntry
        key={item.id}
        id={item.id}
        title={item.title}
        type={item.type}
        organizationName={item.organization ? item.organization.name : null}
        organizationUrl={item.organization ? item.organization.url : null}
        from={item.from}
        to={item.to}
        description={item.description}
        detailsTitle={item.details.title}
        details={item.details.items}
      />
    ))
  }

  render() {
    return <div className="container" style={{marginTop: '50px'}}>
        <div className="row">
          <div className="col-12">
            <h2>Career &amp; Education Timeline</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <CareerGraphContainer data={this.data} />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ul className="timeline">
              {this.renderEntries()}
            </ul>
          </div>
        </div>
      </div>;
  }
}
