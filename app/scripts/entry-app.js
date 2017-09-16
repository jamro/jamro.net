/* global gtag */
// casperjs need it
import 'babel-polyfill';
import 'bootstrap';
import '../styles/main.scss';
import React from 'react'; // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import App from './components/App';

import ScrollMonitor from './scrollMonitor/ScrollMonitor.js';


var monitor = new ScrollMonitor(window);

for(let i=0; i <= 100; i+=10) {
  let id = i.toString();
  while(id.length < 3) {
    id = "0" + id;
  }
  id = 'progress_' + id;
  monitor.setAchievement(id, i/100, (tag, progress) => {
    gtag('event', 'scroll_' + tag, {
      value: Math.round(progress*100),
      event_category: 'scroll'
    });
  });
}


ReactDOM.render(
  <App />,
  document.getElementById('app-root')
);
