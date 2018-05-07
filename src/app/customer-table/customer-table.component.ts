import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatSort, MatFormField, MatTableDataSource } from '@angular/material';
import { distanceInWordsStrict } from 'date-fns';
import { ICustomerData } from '../../interfaces/CustomerData.interface';

// Extend customer data interface to add the 'Date of Birth Years Ago' value
interface IMyCustomerData extends ICustomerData {
  dobYearsAgo?: string;
}

/**
 * @title Customer data table with sorting and filtering.
 */
@Component({
  selector: 'customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {
  displayedColumns = ['avatar', 'title', 'name', 'gender', 'dob', 'phone', 'country'];
  dataSource: MatTableDataSource<IMyCustomerData>;

  private _customers: IMyCustomerData[];

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

  @Input()
  set customers(customers: ICustomerData[]) {
    this._customers = <IMyCustomerData[]>customers;

    // Calc the 'DoB Years Ago' value for each customer from a date to a 'years ago' string
    for (let customer of this._customers) {
      customer.dobYearsAgo =  this.yearsAgo(customer.dob);
    }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this._customers);
    this.dataSource.sort = this.sort;
  }

  private yearsAgo(dateString: string) {
    return `${distanceInWordsStrict(dateString, new Date(), {unit: 'Y'})} ago`;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}