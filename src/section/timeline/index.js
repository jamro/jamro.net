import CareerGraph from './careerGraph/CareerGraph.js';
import timelineData from '../../../data/timeline.json';

const MAX_TIMELINE_HEIGHT = 2000;


function docReady(fn) {
  if (document.readyState === "complete" || document.readyState === "interactive") {
      setTimeout(fn, 1);
  } else {
      document.addEventListener("DOMContentLoaded", fn);
  }
} 

function hideMore() {
  const timelineContainer = document.getElementById('timeline');
  timelineContainer.style.height = MAX_TIMELINE_HEIGHT + 'px';
  timelineContainer.style.overflowY = 'hidden';

  const more = document.getElementById('show-more');
  more.style.display = 'block';
}

function showMore() {
  const timelineContainer = document.getElementById('timeline');
  timelineContainer.style.height = 'auto';
  timelineContainer.style.overflowY = 'auto';
  const more = document.getElementById('show-more');
  more.style.display = 'none';
}


let container = document.getElementById('career-graph');
if(!container) {
  throw new Error('HTML element #career-graph not found in the document')
}
let careerGraph = new CareerGraph(container);
careerGraph.onClick = () => showMore()

for(let data of timelineData.timeline) {
  careerGraph.addSeries(data);
}

careerGraph.draw();

window.addEventListener('resize', () => {
  careerGraph.resize(container.clientWidth);
});
window.addEventListener('appReady', () => {
  careerGraph.resize(container.clientWidth);

  const showMoreButton = document.getElementById('show-more-link');
  showMoreButton.addEventListener('click', showMore);
  const timelineContainer = document.getElementById('timeline');
  const height = timelineContainer.clientHeight;
  
  timelineContainer.addEventListener('scroll', () => showMore())

  if(height > MAX_TIMELINE_HEIGHT && timelineContainer.scrollTop === 0) {
    hideMore();
  }
})

let links = document.querySelectorAll('.timeline-body a.details-link');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    let id = e.target.id;
    let icon = document.getElementById(id+"-icon");
    let content = document.getElementById(id+"-content");
    let isVisible = content.style.display != 'none'
    content.style.display = isVisible ? 'none' : 'block';
    icon.className = isVisible ? 'fas fa-caret-right' : 'fas fa-caret-down';
  })
})
