import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../shared/header/header.component';
import { TransactionDetailsComponent } from '../transaction-details/transaction-details.component';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from '../../shared/services/transaction.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    HeaderComponent,
    CommonModule,
    TransactionDetailsComponent,
  ],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns = ['position', 'date', 'comments', 'actions'];
  showDetails: boolean = false;
  transactionDetails: any;
  constructor(
    private matDialog: MatDialog,
    private transactionService: TransactionService
  ) {}
  ngOnInit() {
    this.getData();
  }

  getData() {
    this.transactionService.getTransactionList('').subscribe({
      next: (res: any) => {
        this.dataSource = res.data;
      },
      error: (err: any) => {
        console.log('err', err);
      },
    });
  }

  viewSingle(data: any) {
    this.showDetails = true;
    this.transactionDetails = data;
  }

  updateDetails(e: any) {
    this.showDetails = false;
    this.getData();
  }
}
