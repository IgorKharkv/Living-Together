import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../models/table';
import {PassageService} from '../services/passage.service';
import {AuPassage} from '../models/au_passage';
import {Passage} from '../models/passage';
import {MatDialog} from '@angular/material';
import {EditDialogComponent} from '../dialog/edit.dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() table: Table;
  @Input() passages;

  displayedColumns: string[];
  rowsToDisplay: string[];
  passageToDisplay;
  columns = {};

  constructor(private passageService: PassageService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.table.columns.forEach((key, i) => this.columns[key] = this.table.hebrew_columns[i]);
    this.displayedColumns = this.table.columns;
    this.rowsToDisplay = this.displayedColumns.concat('Edit').slice();
    this.passageToDisplay = this.passages;
  }

  fixLivingTogether() {
    if (this.table.name.includes('Au')) {
      this.passageService.insertAllToAuPassageCopy(this.passageToDisplay).subscribe(
        () => this.passageToDisplay = []
      );
    } else {
      this.passageService.insertAllToPassageCopy(this.passageToDisplay).subscribe(
        () => this.passageToDisplay = []
      );
    }
  }

  editRow(passage) {
    let passageToDialog;
    const table = this.columns;
    if (this.table.name.includes('Au')) {
      passageToDialog = passage as AuPassage;
    } else {
      passageToDialog = passage as Passage;
    }
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {passageToDialog, table},
      width: '25%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.passageToDisplay[(this.passageToDisplay.findIndex(() => result))] = result;
      }
    });
  }
}
