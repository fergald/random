// Copied from https://codepen.io/cfjedimaster/pen/ExqRNjz

class TranslateText extends HTMLElement {

  constructor() {
    super();
  }

  async connectedCallback() {

    console.log(this.innerText);
    //		this.sourceLanguage = 'en';
    //		if(this.hasAttribute('sourcelang')) this.sourceLanguage = this.getAttribute('soucelang');

    /*
    Detection routine for ai translation
    */
    if (!window.translation) {
      console.log('window.translation not supported');
      return;
    }

    // check if can detect
    let canDetect = await window.translation.canDetect();
    if (canDetect !== 'readily') {
      console.log('window.translation.canDetect returned false.');
      return;
    }

    let detector = await window.translation.createDetector();
    console.log(detector);
    console.log('calling detect...');
    let results = await detector.detect(this.innerText);
    console.log('Result from detector', results);

    return;
    //do i support translating to my language?
    this.myLanguage = navigator.language;
    // temp hack so I can test ;)
    this.myLanguage = 'fr';

    if (this.myLanguage === this.sourceLanguage) {
      console.log('No need to translate');
      return;
    }
    console.log(this.myLanguage);

    //can i translate from source to my lange?
    let pair = {
      sourceLanguage: 'en',
      targetLanguage: 'fr'
    }

    let canTranslate = await translation.canTranslate({
      sourceLanguage: this.sourceLanguage,
      targetLanguage: this.myLanguage
    });
    console.log(canTranslate);
  }

}

if (!customElements.get('translate-text')) customElements.define('translate-text', TranslateText);
