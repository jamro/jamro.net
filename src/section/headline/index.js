import {Tooltip} from "bootstrap";

function fade(element) {
  var op = 0;
  element.style.display = 'block';
  element.style.opacity = 0;
  element.style.filter = 'alpha(opacity=0)';
  var timer = setInterval(function () {
    if (op >= 1.0){
        clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
    op += 0.1;
  }, 20);
}

window.addEventListener('appReady', () => {
  fade(document.getElementById('headline'));
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map((el) => new Tooltip(el))
})