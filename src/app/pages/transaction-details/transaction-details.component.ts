import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TransactionService } from '../../shared/services/transaction.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-details',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './transaction-details.component.html',
  styleUrl: './transaction-details.component.scss',
})
export class TransactionDetailsComponent {
  @Input() transactionDetails: any;
  @Output() updateDetails = new EventEmitter();
  createForm!: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private transactionService: TransactionService
  ) {
    this.createForm = new FormGroup({
      id: new FormControl(''),
      date: new FormControl(''),
      comments: new FormControl('', Validators.required),
    });
  }
  ngOnInit() {
    console.log('fgdg', this.transactionDetails);
    if (this.transactionDetails) {
      this.createForm.patchValue(this.transactionDetails);
    }
  }

  save() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }
    let obj = {
      tranId: this.transactionDetails._id,
      comments: this.createForm.value.comments,
    };
    this.transactionService.updateTransaction(obj).subscribe({
      next: (res: any) => {
        this.updateDetails.emit();
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }
}
