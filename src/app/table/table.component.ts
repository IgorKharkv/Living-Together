import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Table} from '../models/table';
import {AuPassage} from '../models/au_passage';
import {Passage} from '../models/passage';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {EditDialogComponent} from '../dialog/edit.dialog.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnChanges {

  @Input() table: Table;
  @Input() passages;
  @Input() fixTableFunction: (passages: AuPassage[] | Passage[]) => Observable<boolean>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[];
  rowsToDisplay: string[];
  passageToDisplay = new MatTableDataSource(this.passages);
  columns = {};

  constructor(public dialog: MatDialog,
              private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.table.columns.forEach((key, i) => this.columns[key] = this.table.hebrew_columns[i]);
    this.displayedColumns = this.table.columns;
    this.rowsToDisplay = this.isLogicTable() ? this.displayedColumns.concat('Edit').slice() : this.displayedColumns.slice();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.passages) {
      this.passageToDisplay = new MatTableDataSource(this.passages);
      this.passageToDisplay.sort = this.sort;
    }
  }

  fixTable() {
    this.fixTableFunction(this.passages).subscribe(
      () => {
        this.passageToDisplay = new MatTableDataSource([]);
        this.snackBar.open('הנתונים הועברו בהצלחה', null, {
          duration: 3000,
        });
      },
      () => this.snackBar.open('הייתה שגיאה בתיקון הטבלה', null, {
        duration: 3000,
      })
    );
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
        this.fixTableFunction(result).subscribe(
          () => {
            this.passageToDisplay = new MatTableDataSource(this.passages.filter(obj => obj !== result));
            this.snackBar.open('המעבר הועבר בהצלחה', null, {
              duration: 3000,
            });
          },
          () => this.snackBar.open('הייתה שגיאה בהעברת המעבר', null, {
            duration: 3000,
          })
        );
      }
    });
  }

  public isLogicTable() {
    return this.table.role.includes('לוגיקה');
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.passageToDisplay.filter = filterValue.trim().toLowerCase();
  }
}
