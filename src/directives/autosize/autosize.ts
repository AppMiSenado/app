import {ElementRef, HostListener, Directive, OnInit} from '@angular/core';

@Directive({
  selector: 'ion-textarea[autosize]'
})

export class AutosizeDirective implements OnInit {
  @HostListener('input', ['$event.target'])
  onInput(textArea:HTMLTextAreaElement):void {
    this.adjust();
  }

  @HostListener('change')
  onChange($event) {
    setTimeout(() => this.adjust(), 100);
  }

  constructor(public element:ElementRef) {
  }

  ngOnInit():void {
    setTimeout(() => this.adjust(), 0);
  }

  adjust():void {
    let textArea = this.element.nativeElement.getElementsByTagName('textarea')[0];
    textArea.style.overflow = 'hidden';
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + "px";

    if (textArea.scrollHeight > 36) {
      textArea.style.marginBottom = "16px";
    }else{
      textArea.style.marginBottom = "0px";
    }
  }
}