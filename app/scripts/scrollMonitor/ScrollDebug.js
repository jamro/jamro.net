export default class ScrollDebug {
  constructor(document) {
    this.body = document.createElement("div");
    this.body.style.cssText = (`
        position: fixed;
        top: 0px;
        left: 0px;
        z-index: 1000000;
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 5px;
        font-size: 11px;
      `);
    this.positionValue = 0;
    this.render();
  }

  set position(value) {
    this.positionValue = value;
    this.render();
  }

  get position() {
    return this.positionValue;
  }

  render() {
    this.body.innerHTML = 'position: ' + (100*this.positionValue).toFixed(2) + "%";
  }
}
