import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Note} from "../../../shared/note.model";
import {NotesService} from "../../../shared/notes.service";
import {animate, query, stagger, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          width: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),
        animate('50ms', style({
          height: '*',
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingRight: '*',
          paddingLeft: '*',
        })),
        animate(200)
      ]),
      transition('* => void', [
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75,
        })),
        animate('120ms ease-out', style({
          transform: 'scale(0.68)',
          opacity: 0,
        })),
        animate('150ms ease-out', style({
          opacity: 0,
          height: 0,
          width: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
          'margin-bottom': '0',
        }))
      ])
    ]),
    trigger('listAnim', [
      transition('*=>void', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0,

          }),
          stagger(100, [
            animate('0.2s ease-out')
          ])
        ], {optional: true})
      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {
  @ViewChild('filterInput') fInput: ElementRef<HTMLInputElement>;

  constructor(private noteServ: NotesService) {

  }

  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  ngOnInit() {
    this.notes = this.noteServ.getAll();
    // this.filteredNotes = this.noteServ.getAll();
    this.filter('');
  }

  deleteNote(note: Note) {
    let noteId = this.noteServ.getId(note);
    this.noteServ.delete(noteId);
    this.filter(this.fInput.nativeElement.value )
  }

  generateNoteURl(note: Note) {
    let noteID = this.noteServ.getId(note);
    return noteID;
  }

  filter(query: string) {
    let allResults: Note[] = new Array<Note>();
    query = query.toLowerCase().trim()
    let terms: string[] = query.split(' ');
    terms = this.removeDuplicates(terms);
    terms.forEach(el => {
      let results: Note[] = this.relevantNotes(el);
      allResults = [...allResults, ...results];
    });
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
    this.sortByRelevancy(allResults);
  }

  removeDuplicates(arr: Array<any>): Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));
    return Array.from(uniqueResults);
  }

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(el => {
      if (el.title && el.title.toLowerCase().includes(query)) {
        return true;
      }
      if (el.body && el.body.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })
    return relevantNotes;
  }

  sortByRelevancy(searchResults: Note[]) {
    let notesCountObj: Object = {};
    searchResults.forEach(note => {
      let noteId = this.noteServ.getId(note)
      if (notesCountObj[noteId]) {
        notesCountObj[noteId] += 1;
      } else {
        notesCountObj = 1;
      }
    })
    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = this.noteServ.getId(a);
      let bId = this.noteServ.getId(b);
      let aCount = notesCountObj[aId];
      let bCount = notesCountObj[bId];
      return bCount - aCount;
    })
  }
}
