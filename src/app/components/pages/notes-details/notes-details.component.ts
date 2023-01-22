import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Note} from "../../../shared/note.model";
import {NotesService} from "../../../shared/notes.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as path from "path";

@Component({
  selector: 'app-notes-details',
  templateUrl: './notes-details.component.html',
  styleUrls: ['./notes-details.component.scss']
})
export class NotesDetailsComponent implements OnInit {
  constructor(private noteService: NotesService, private router: Router, private route: ActivatedRoute) {
  }

  @ViewChild('noteForm') formElement: NgForm;
  note: Note;
  noteId: number;
  new: boolean;
  finalNote: Note

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
    this.note = new Note;
      if (params['id']) {
        this.note = this.noteService.get(params['id']);
        this.noteId = params['id'];
        this.new = false;
      } else {
        this.new = true;
      }
    })
  }

  onSubmit() {
    if (this.new) {
      this.finalNote = this.formElement.value;
      this.noteService.add(this.finalNote);
    } else {
      this.noteService.update(this.noteId, this.formElement.value.title, this.formElement.value.body);
    }
      this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }
}
