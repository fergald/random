class AlignElementFix extends HTMLElement {
  selector = null;
  styleSheet = null;

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
          width: var(--customElementWidth);
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

  static get observedAttributes() {
    return ['selector', 'style-sheet'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "selector") {
      this.selector = newValue;
      this.fixStyleSheet();
    } else if (name === "style-sheet") {
      this.styleSheet = newValue;
      this.fixStyleSheet();
    }
  }

  fixStyleSheet() {
    if (this.selector && this.styleSheet) {
      console.log("trying", this.styleSheet, this.selector);
      for (let ss of document.styleSheets) {
        // "css_qwwwd"
        if (ss.ownerNode.id === this.styleSheet) {
          // #comp-l0lp333m
          // console.log(ss.cssRules);
          for (let rule of ss.cssRules) {
            // "#comp-l0lp333m"
            if (rule.selectorText === this.selector) {
              console.log(rule);
              console.log(rule.styleMap.get("width"))
              rule.styleMap.delete("width")
              console.log(rule);
            }
          }
        }
      }
    } else {
      console.log("skipping");
    }
  }
}
window.customElements.define('align-element-fix', AlignElementFix);
