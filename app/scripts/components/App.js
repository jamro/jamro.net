import React from 'react';
import Navi from './navi/Navi.js';
import NaviButton from './navi/NaviButton.js';
import Title from './title/Title.js';
import Summary from './summary/Summary.js';
import Seek from './seek/Seek.js';
import Certs from './certs/Certs.js';
import Timeline from './timeline/Timeline.js';
import Strengths from './strengths/Strengths.js';
import Skills from './skills/Skills.js';
import Technologies from './technologies/Technologies.js';
import Footer from './footer/Footer.js';

export default class App extends React.Component {

  render() {
    return <div>
      <Navi>
        <NaviButton name="Summary" link="#summary-section" />
        <NaviButton name="Certificates" link="#certs-section" />
        <NaviButton name="Career & Education" link="#career-section" />
        <NaviButton name="Skills" link="#skills-section" />
      </Navi>
      <Title />
      <div className="anchor" id="summary-section"></div>
      <Summary />
      <Seek />
      <div className="anchor" id="certs-section"></div>
      <Certs />
      <div className="anchor" id="career-section"></div>
      <Timeline />
      <div className="anchor" id="skills-section"></div>
      <Strengths />
      <Skills />
      <Technologies />
      <Footer />
    </div>;
  }
}
