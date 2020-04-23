import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: 'edit.dialog.html',
  styleUrls: ['edit.dialog.css']
})
export class EditDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  passage = {};

  ngOnInit(): void {
    this.passage = this.data.passageToDialog;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  savePassage() {
    this.dialogRef.close(this.passage);
  }

  typeOfPassage(item) {
    return (typeof item);
  }
}
