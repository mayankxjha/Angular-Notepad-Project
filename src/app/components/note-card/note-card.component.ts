import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit{
  @Input() title: string;
  @Input() body: string;
  @Input() link: string;
  @Output('delete') delEvent: EventEmitter<void> = new EventEmitter<void>()
  @ViewChild('truncator', {static: true}) divElem: ElementRef<HTMLElement>;
  @ViewChild('bodyText', {static: true}) divElem2: ElementRef<HTMLElement>;
  constructor(private render: Renderer2) {
  }
  ngOnInit() {
    let style = window.getComputedStyle(this.divElem2.nativeElement, null);
    let viewableHeight = parseInt(style.getPropertyValue('height'), 10);
    if(this.divElem2.nativeElement.scrollHeight>viewableHeight) {
      this.render.setStyle(this.divElem.nativeElement, 'display', 'block');
    } else{
      this.render.setStyle(this.divElem.nativeElement, 'display', 'none');
    }
  }
  onXClick(){
    this.delEvent.emit();
  }
}
