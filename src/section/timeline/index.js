import CareerGraph from './careerGraph/CareerGraph.js';
import timelineData from '../../../data/timeline.json';

let container = document.getElementById('career-graph');
let careerGraph = new CareerGraph(container);

for(let data of timelineData.timeline) {
  careerGraph.addSeries(data);
}

careerGraph.draw();

window.addEventListener('resize', () => {
  careerGraph.resize(container.clientWidth);
});
window.addEventListener('appReady', () => {
  careerGraph.resize(container.clientWidth);
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
