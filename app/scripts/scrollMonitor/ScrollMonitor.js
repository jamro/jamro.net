import ScrollDebug from './ScrollDebug.js';
import ScrollAchievement from './ScrollAchievement.js';

export default class ScrollMonitor {

  constructor(window) {
    if(!window || !window.document) {
      return;
    }
    this.window = window;
    this.document = window.document;
    this.debugMode = false;
    this.debugContainer = new ScrollDebug(this.document);
    this.achievements = [];
    setInterval(() => this.update(), 100);
  }

  update() {
    let position = this.calculatePosition();
    this.debugContainer.position = position;
    for(let achievement of this.achievements) {
      achievement.test(position);
    }
  }

  calculatePosition() {
    if(this.document.body.scrollHeight - window.innerHeight <= 0) {
      return 1;
    }
    return this.window.scrollY / (this.document.body.scrollHeight - window.innerHeight)
  }

  set debug(value) {
    this.debugMode = value;
    if(value) {
      document.body.appendChild(this.debugContainer.body);
    } else {
      document.body.removeChild(this.debugContainer.body);
    }
  }

  get debug() {
    return this.debugMode;
  }

  setAchievement(tag, progress, callback) {
    let achievement = new ScrollAchievement(tag, progress)
    this.achievements.push(achievement);
    if(callback) {
      achievement.onOccur(callback);
    }
  }
}
