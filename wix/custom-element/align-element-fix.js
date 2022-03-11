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
        .container {
          width: 100%;
          border: 1px solid;
        }
        </style>
      <div class=container>
        <div class=left>Aligned left.</div>
        <div class=right>Aligned right.</div>
      </div>
    `;
    }
    for (let ss of document.styleSheets) {
      if (ss.ownerNode.id === "css_qwwwd") {
        // #comp-l0lp333m
        // console.log(ss.cssRules);
        for (let rule of ss.cssRules) {
          if (rule.selectorText === "#comp-l0lp333m") {
            console.log(rule);
            console.log(rule.styleMap.get("width"))
            rule.styleMap.delete("width")
            console.log(rule);
          }
        }
      }
    }
  }
}
window.customElements.define('align-element', AlignElement);
