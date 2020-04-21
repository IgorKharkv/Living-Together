import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Table} from '../models/table';

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

  ngOnInit(): void {
    this.displayedHebrewColumns = this.table.hebrew_columns;
    this.displayedColumns = this.table.columns;
    this.columnsToDisplay = this.displayedColumns.slice();
    this.data = this.passages;
  }

  addColumn() {
    const randomColumn = Math.floor(Math.random() * this.displayedColumns.length);
    this.columnsToDisplay.push(this.displayedColumns[randomColumn]);
  }

  removeColumn() {
    if (this.columnsToDisplay.length) {
      this.columnsToDisplay.pop();
    }
  }

  shuffle() {
    let currentIndex = this.columnsToDisplay.length;
    while (0 !== currentIndex) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // Swap
      let temp = this.columnsToDisplay[currentIndex];
      this.columnsToDisplay[currentIndex] = this.columnsToDisplay[randomIndex];
      this.columnsToDisplay[randomIndex] = temp;
    }
  }
}
