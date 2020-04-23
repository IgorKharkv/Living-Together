import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../models/table';
import {PassageService} from '../services/passage.service';
import {AuPassage} from '../models/au_passage';
import {Passage} from '../models/passage';
import {MatDialog} from '@angular/material';
import {EditDialogComponent} from '../dialogs/edit/edit.dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() table: Table;
  @Input() passages;

  displayedHebrewColumns: string[];
  displayedColumns: string[];
  columnsToDisplay: string[];
  data;
  columns = {};

  constructor(private passageService: PassageService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.table.columns.forEach((key, i) => this.columns[key] = this.table.hebrew_columns[i]);
    this.displayedHebrewColumns = this.table.hebrew_columns;
    this.displayedColumns = this.table.columns;
    this.columnsToDisplay = this.displayedColumns.concat('Edit').slice();
    this.data = this.passages;
  }

  fixLivingTogether() {
    if (this.table.name.includes('Au')) {
      this.passageService.insertAllToAuPassageCopy(this.data).subscribe(
        () => this.data = []
      );
    } else {
      this.passageService.insertAllToPassageCopy(this.data).subscribe(
        () => this.data = []
      );
    }
  }

  editRow(passage) {
    let data;
    const table = this.table;
    const hebrewColumns = this.displayedHebrewColumns;
    if (this.table.name.includes('Au')) {
      data = passage as AuPassage;
    } else {
      data = passage as Passage;
    }
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {data, table},
      width: '25%'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.data[(this.data.findIndex(() => result))] = result;
        debugger;
      }
    });
  }
}
