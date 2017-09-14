export default class ScrollAchievement {
  constructor(tag, progress) {
    this.tag = tag;
    this.progress = progress;
    this.occurred = false;
    this.listeners = [];
  }

  test(progress) {
    if(!this.occurred && this.progress <= progress) {
      this.occurred = true;
      for(var listener of this.listeners) {
        listener(this.tag, this.progress);
      }
      return true;
    }
    return false;
  }

  onOccur(callback) {
    this.listeners.push(callback);
  }
}
