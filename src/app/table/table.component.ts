import {Component, Input, OnInit} from '@angular/core';
import {Table} from '../models/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() table: Table;

  displayedColumns: string[];
  columnsToDisplay: string[];

  ngOnInit(): void {
    this.displayedColumns = this.table.columns;
    this.columnsToDisplay = this.displayedColumns.slice();
  }

  something() {
  }

}
