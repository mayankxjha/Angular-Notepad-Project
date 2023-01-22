import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotesListComponent } from './components/pages/notes-list/notes-list.component';
import { MainLayoutComponent } from './components/pages/main-layout/main-layout.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NotesDetailsComponent } from './components/pages/notes-details/notes-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NotesListComponent,
    MainLayoutComponent,
    NoteCardComponent,
    NotesDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
