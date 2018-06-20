import { Injectable } from '@angular/core';
import { Printd } from 'printd';

@Injectable()
export class SharedService {

  constructor() { }

  printOrder(elementId) {
    let element = document.getElementById(elementId);
    let cssString = [];
    for ( var r = 0; r < document.styleSheets.length; r++ ) {
      var css = <CSSStyleSheet>document.styleSheets[r];
      if ( css && (!css.href || (css.href && (!css.href.includes('https')||!css.href.includes('http')))) ) {
        var rules = css.cssRules ? css.cssRules : css.rules;
        if ( rules ) {
          for ( var i = 0; i < rules.length; i++ ) {
            cssString.push(rules[i].cssText);
          }
        }
      }
    }
    let cssText = cssString.join("\n");
    const d: Printd = new Printd();
    d.print( element, cssText);
  }
}
