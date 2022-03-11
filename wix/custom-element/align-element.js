class AlignElement extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <style>
        .left {
          text-align: left;
        }
        .right {
          text-align: right;
        }
      </style>
      <div style="width: 100%">
        <div class=left>left</div>
        <div class=right>right</div>
      </div>
    `;
    }
  }
}
window.customElements.define('align-element', AlignElement);
