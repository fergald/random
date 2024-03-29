class AlignElement400 extends HTMLElement {
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
        .container {
          width: 400%;
          border: 1px solid;
        }
        </style>
      <div class=container>
        <div class=left>Aligned left.</div>
        <div class=right>Aligned right.</div>
      </div>
    `;
    }
  }
}
window.customElements.define('align-element-400', AlignElement400);
