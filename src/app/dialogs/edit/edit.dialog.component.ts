import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css']
})
export class EditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  result = {};
  passage = {};

  ngOnInit(): void {
    this.passage = Object.assign(this.passage, this.data.data);
    this.data.table.columns.forEach((key, i) => this.result[key] = this.data.table.hebrew_columns[i]);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  savePassage() {
    var x = this.passage;
    this.dialogRef.close(this.passage);
  }

  typeOfPassage(item) {
    var x = (typeof item);
    return (typeof item);
  }
}
